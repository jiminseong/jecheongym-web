import { createCanvas } from "@napi-rs/canvas";
import * as cheerio from "cheerio";

function resolveAbsoluteUrl(rawUrl, baseUrl) {
  if (!rawUrl) {
    return null;
  }

  const cleaned = rawUrl.trim();
  if (!cleaned || cleaned.startsWith("data:")) {
    return null;
  }

  try {
    return new URL(cleaned, baseUrl).href;
  } catch {
    return null;
  }
}

function flattenImageField(value, collector) {
  if (!value) {
    return;
  }

  if (typeof value === "string") {
    collector.push(value);
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((entry) => flattenImageField(entry, collector));
    return;
  }

  if (typeof value === "object") {
    if (typeof value.url === "string") {
      collector.push(value.url);
    }

    if (value.image) {
      flattenImageField(value.image, collector);
    }
  }
}

function parseJsonLd(raw) {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function modelToTokens(model) {
  return (model ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(" ")
    .map((token) => token.trim())
    .filter((token) => token.length >= 3);
}

function scoreImageUrl(url, modelTokens) {
  const lower = url.toLowerCase();
  let score = 0;

  for (const token of modelTokens) {
    if (lower.includes(token)) {
      score += 5;
    }
  }

  if (/(product|hero|equipment|machine|gallery|detail|isolateral|iso-lateral)/.test(lower)) {
    score += 4;
  }

  if (/(thumb|thumbnail|icon|sprite|logo|banner|watermark)/.test(lower)) {
    score -= 7;
  }

  return score;
}

function toRankedImageUrls(urls, model) {
  const modelTokens = modelToTokens(model);

  return [...new Set(urls)]
    .filter((url) => /\.(avif|jpe?g|png|webp)(\?.*)?$/i.test(url))
    .map((url) => ({
      url,
      score: scoreImageUrl(url, modelTokens),
    }))
    .sort((a, b) => b.score - a.score || a.url.localeCompare(b.url))
    .map((entry) => entry.url);
}

export function extractImageUrlsFromHtml(html, pageUrl, model) {
  const $ = cheerio.load(html);
  const candidates = [];

  $(
    [
      "meta[property='og:image']",
      "meta[name='og:image']",
      "meta[property='twitter:image']",
      "meta[name='twitter:image']",
    ].join(","),
  ).each((_, element) => {
    const content = $(element).attr("content");
    const absolute = resolveAbsoluteUrl(content, pageUrl);
    if (absolute) {
      candidates.push(absolute);
    }
  });

  $("script[type='application/ld+json']").each((_, element) => {
    const parsed = parseJsonLd($(element).text());
    if (!parsed) {
      return;
    }

    const images = [];
    flattenImageField(parsed, images);
    images.forEach((rawUrl) => {
      const absolute = resolveAbsoluteUrl(rawUrl, pageUrl);
      if (absolute) {
        candidates.push(absolute);
      }
    });
  });

  $("img").each((_, element) => {
    const src =
      $(element).attr("src") ??
      $(element).attr("data-src") ??
      $(element).attr("data-original") ??
      $(element).attr("data-lazy-src");

    const className = ($(element).attr("class") ?? "").toLowerCase();
    const id = ($(element).attr("id") ?? "").toLowerCase();
    const alt = ($(element).attr("alt") ?? "").toLowerCase();
    const hint = `${className} ${id} ${alt}`;

    if (!/(product|hero|equipment|machine|detail|gallery|press|media)/.test(hint)) {
      return;
    }

    const absolute = resolveAbsoluteUrl(src, pageUrl);
    if (absolute) {
      candidates.push(absolute);
    }
  });

  $("[data-image-url],[data-image],[data-src]").each((_, element) => {
    const rawValue =
      $(element).attr("data-image-url") ?? $(element).attr("data-image") ?? $(element).attr("data-src");
    const absolute = resolveAbsoluteUrl(rawValue, pageUrl);
    if (absolute) {
      candidates.push(absolute);
    }
  });

  const textMatches = html.match(/https?:\/\/[^"'\\\s>]+?\.(?:avif|jpe?g|png|webp)(?:\?[^"'\\\s>]*)?/gi) ?? [];
  for (const rawUrl of textMatches) {
    const absolute = resolveAbsoluteUrl(rawUrl, pageUrl);
    if (absolute) {
      candidates.push(absolute);
    }
  }

  return toRankedImageUrls(candidates, model);
}

export async function extractImageUrlsWithPlaywright(pageUrl, model) {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    throw new Error("Playwright is not installed. Run `npm i -D playwright` and `npx playwright install chromium`.");
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(pageUrl, { waitUntil: "domcontentloaded", timeout: 90000 });
    await page.waitForTimeout(5000);
    const rawUrls = await page.evaluate(() => {
      const values = [];

      const pushIfText = (input) => {
        if (typeof input === "string" && input.trim()) {
          values.push(input.trim());
        }
      };

      for (const node of document.querySelectorAll(
        "meta[property='og:image'],meta[name='og:image'],meta[property='twitter:image'],meta[name='twitter:image']",
      )) {
        pushIfText(node.getAttribute("content"));
      }

      for (const node of document.querySelectorAll("img")) {
        const src =
          node.getAttribute("src") ??
          node.getAttribute("data-src") ??
          node.getAttribute("data-original") ??
          node.getAttribute("data-lazy-src");

        if (!src) {
          continue;
        }

        const hint = `${node.className} ${node.id} ${node.getAttribute("alt") ?? ""}`.toLowerCase();
        if (/(product|hero|equipment|machine|detail|gallery|press|media)/.test(hint)) {
          pushIfText(src);
        }
      }

      return values;
    });

    const absoluteUrls = rawUrls
      .map((rawUrl) => resolveAbsoluteUrl(rawUrl, pageUrl))
      .filter((url) => Boolean(url));

    return toRankedImageUrls(absoluteUrls, model);
  } finally {
    await page.close();
    await browser.close();
  }
}

export async function renderPdfPagesToImages(pdfBuffer, pages, options = {}) {
  const uniquePages = [...new Set((pages ?? []).map((page) => Number.parseInt(page, 10)).filter(Number.isFinite))];
  if (uniquePages.length === 0) {
    throw new Error("PDF source requires at least one page number in `pages`.");
  }

  const dpi = options.dpi ?? 170;
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const loadingTask = getDocument({
    data: new Uint8Array(pdfBuffer),
    disableWorker: true,
    useWorkerFetch: false,
    isEvalSupported: false,
  });

  const document = await loadingTask.promise;
  const outputs = [];

  for (const pageNumber of uniquePages) {
    if (pageNumber < 1 || pageNumber > document.numPages) {
      throw new Error(`PDF page ${pageNumber} is out of range (1-${document.numPages}).`);
    }

    const page = await document.getPage(pageNumber);
    const viewport = page.getViewport({ scale: dpi / 72 });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    const context = canvas.getContext("2d");

    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    outputs.push({
      pageNumber,
      buffer: canvas.toBuffer("image/png"),
    });
  }

  await loadingTask.destroy();
  return outputs;
}
