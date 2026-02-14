import robotsParser from "robots-parser";
import { execFile } from "node:child_process";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function readEnv(name) {
  const value = process.env[name];
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function isPanattaHost(hostname) {
  const lower = `${hostname ?? ""}`.toLowerCase();
  return lower === "panattasport.com" || lower.endsWith(".panattasport.com");
}

function getPanattaCloudflareBypassHeaders(hostname) {
  if (!isPanattaHost(hostname)) {
    return null;
  }

  const userAgent = readEnv("PANATTA_UA") ?? readEnv("PANATTA_USER_AGENT");
  const cookie =
    readEnv("PANATTA_COOKIE") ??
    (readEnv("PANATTA_CF_CLEARANCE") ? `cf_clearance=${readEnv("PANATTA_CF_CLEARANCE")}` : null);

  if (!userAgent || !cookie) {
    return null;
  }

  return {
    "user-agent": userAgent,
    cookie,
  };
}

function shouldUseCurl(url, extraHeaders) {
  if (!isPanattaHost(url.hostname)) {
    return false;
  }

  // Panatta is protected by Cloudflare: Node fetch can get 403 even with cf_clearance.
  return Boolean(extraHeaders?.cookie && extraHeaders?.["user-agent"]);
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function normalizeDomain(domain) {
  return domain.trim().toLowerCase().replace(/^\./, "");
}

export function isHostAllowed(hostname, allowedDomains) {
  const lowerHost = hostname.toLowerCase();

  return allowedDomains.some((domain) => {
    const normalized = normalizeDomain(domain);
    return lowerHost === normalized || lowerHost.endsWith(`.${normalized}`);
  });
}

export function normalizeAllowedDomains(domains) {
  return [...new Set((domains ?? []).map(normalizeDomain).filter(Boolean))];
}

export class RequestPolicyClient {
  constructor({
    userAgent = "JecheongymAssetBot/1.0",
    minDelayMs = 1500,
    maxDelayMs = 3000,
    defaultTimeoutMs = 30000,
  } = {}) {
    this.userAgent = userAgent;
    this.minDelayMs = minDelayMs;
    this.maxDelayMs = maxDelayMs;
    this.defaultTimeoutMs = defaultTimeoutMs;

    this.nextRequestAt = 0;
    this.robotsCache = new Map();
  }

  resolveExtraHeaders(url) {
    const panattaHeaders = getPanattaCloudflareBypassHeaders(url.hostname);
    if (panattaHeaders) {
      return panattaHeaders;
    }

    return {};
  }

  async fetchResponseWithCurl(url, requestHeaders) {
    const requestUrl = new URL(url);
    const tmpBase = path.join(os.tmpdir(), `assetbot-${randomUUID()}`);
    const headersPath = `${tmpBase}.headers`;
    const bodyPath = `${tmpBase}.body`;

    const headerArgs = [];
    let userAgent = requestHeaders?.["user-agent"] ?? this.userAgent;

    for (const [key, value] of Object.entries(requestHeaders ?? {})) {
      if (value == null) {
        continue;
      }

      if (key.toLowerCase() === "user-agent") {
        userAgent = `${value}`;
        continue;
      }

      headerArgs.push("-H", `${key}: ${value}`);
    }

    const timeoutSeconds = Math.max(5, Math.ceil(this.defaultTimeoutMs / 1000));
    const args = [
      "--silent",
      "--show-error",
      "--location",
      "--compressed",
      "--max-time",
      `${timeoutSeconds}`,
      "-A",
      userAgent,
      ...headerArgs,
      "--output",
      bodyPath,
      "--dump-header",
      headersPath,
      "--write-out",
      "%{http_code}",
      requestUrl.href,
    ];

    try {
      const { stdout } = await execFileAsync("curl", args, {
        timeout: this.defaultTimeoutMs + 1000,
      });

      const status = Number.parseInt(`${stdout}`.trim(), 10);
      if (!Number.isFinite(status)) {
        throw new Error(`Unable to read HTTP status from curl for ${requestUrl.href}`);
      }

      const headerText = await fs.readFile(headersPath, "utf8").catch(() => "");
      const buffer = await fs.readFile(bodyPath);

      // curl dumps headers for every redirect; take the last response headers.
      const blocks = headerText.split(/\r?\n\r?\n/).filter((block) => block.trim().startsWith("HTTP/"));
      const lastBlock = blocks.length > 0 ? blocks[blocks.length - 1] : headerText;
      const headers = new Headers();

      for (const line of lastBlock.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.toUpperCase().startsWith("HTTP/")) {
          continue;
        }

        const index = trimmed.indexOf(":");
        if (index <= 0) {
          continue;
        }

        const name = trimmed.slice(0, index).trim();
        const value = trimmed.slice(index + 1).trim();
        if (name) {
          headers.append(name, value);
        }
      }

      return new Response(buffer, { status, headers });
    } finally {
      await fs.unlink(headersPath).catch(() => {});
      await fs.unlink(bodyPath).catch(() => {});
    }
  }

  async fetchText(url, policy) {
    const response = await this.fetchResponse(url, policy);
    return response.text();
  }

  async fetchBuffer(url, policy) {
    const response = await this.fetchResponse(url, policy);
    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  async fetchResponse(url, policy = {}) {
    const requestUrl = new URL(url);
    const allowedDomains = normalizeAllowedDomains(policy.allowedDomains ?? []);
    if (allowedDomains.length === 0) {
      throw new Error(`No allowed domains configured for ${requestUrl.hostname}.`);
    }

    if (!isHostAllowed(requestUrl.hostname, allowedDomains)) {
      throw new Error(
        `Blocked by domain policy: ${requestUrl.hostname} is not in allowed domains (${allowedDomains.join(", ")}).`,
      );
    }

    const extraHeaders = this.resolveExtraHeaders(requestUrl);
    const requestHeaders = {
      "user-agent": this.userAgent,
      accept: policy.accept ?? "*/*",
      ...extraHeaders,
    };
    const effectiveUserAgent = requestHeaders["user-agent"] ?? this.userAgent;

    await this.assertRobotsAllowed(requestUrl, policy, {
      userAgent: effectiveUserAgent,
      extraHeaders,
    });
    await this.waitForTurn();

    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), this.defaultTimeoutMs);

    try {
      if (shouldUseCurl(requestUrl, extraHeaders)) {
        const response = await this.fetchResponseWithCurl(requestUrl.href, requestHeaders);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} ${response.statusText}`.trim());
        }
        return response;
      }

      const response = await fetch(requestUrl, {
        method: "GET",
        redirect: "follow",
        headers: {
          ...requestHeaders,
        },
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      return response;
    } finally {
      clearTimeout(timeout);
    }
  }

  async assertRobotsAllowed(url, policy = {}, options = {}) {
    const userAgent = options.userAgent ?? this.userAgent;
    const robots = await this.getRobots(url, { userAgent, extraHeaders: options.extraHeaders });
    const checkResult = robots.isAllowed(url.href, userAgent);

    if (checkResult === false) {
      throw new Error(`Blocked by robots.txt policy for ${url.href}`);
    }

    if (policy.strictRobots && checkResult == null) {
      throw new Error(`robots.txt check returned unknown for ${url.href}`);
    }
  }

  async getRobots(url, options = {}) {
    const origin = url.origin;
    const cached = this.robotsCache.get(origin);
    if (cached) {
      return cached;
    }

    const robotsUrl = `${origin}/robots.txt`;
    await this.waitForTurn();

    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), this.defaultTimeoutMs);

    try {
      const userAgent = options.userAgent ?? this.userAgent;
      const extraHeaders = options.extraHeaders ?? {};
      const robotsRequestHeaders = {
        "user-agent": userAgent,
        accept: "text/plain,*/*;q=0.8",
        ...extraHeaders,
      };

      const response = shouldUseCurl(new URL(robotsUrl), extraHeaders)
        ? await this.fetchResponseWithCurl(robotsUrl, robotsRequestHeaders)
        : await fetch(robotsUrl, {
            method: "GET",
            redirect: "follow",
            headers: robotsRequestHeaders,
            signal: abortController.signal,
          });

      if (response.status === 404) {
        const parser = robotsParser(robotsUrl, "");
        this.robotsCache.set(origin, parser);
        return parser;
      }

      if (!response.ok) {
        throw new Error(`Unable to read robots.txt (${response.status} ${response.statusText})`);
      }

      const body = await response.text();
      const parser = robotsParser(robotsUrl, body);
      this.robotsCache.set(origin, parser);
      return parser;
    } finally {
      clearTimeout(timeout);
    }
  }

  async waitForTurn() {
    const now = Date.now();
    if (this.nextRequestAt > now) {
      await sleep(this.nextRequestAt - now);
    }

    const delay = randomBetween(this.minDelayMs, this.maxDelayMs);
    this.nextRequestAt = Date.now() + delay;
  }
}
