#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { applyMachineRowUpdates, parseAssetsSourcesMachineRows } from "./lib/assets-sources-md.mjs";
import {
  extractImageUrlsFromHtml,
  extractImageUrlsWithPlaywright,
  renderPdfPagesToImages,
} from "./lib/extractors.mjs";
import { RequestPolicyClient, isHostAllowed, normalizeAllowedDomains } from "./lib/policy-client.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const defaultPlanPath = path.join(__dirname, "source-plan.json");
const defaultAssetsPath = path.join(projectRoot, "ASSETS_SOURCES.md");
const defaultOutputDir = path.join(projectRoot, "public", "machines");

function parseArgs(argv) {
  const args = {
    planPath: defaultPlanPath,
    assetsPath: defaultAssetsPath,
    outputDir: defaultOutputDir,
    dryRun: false,
    ids: null,
    strictRobots: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--plan") {
      args.planPath = path.resolve(projectRoot, argv[i + 1]);
      i += 1;
      continue;
    }

    if (token === "--assets") {
      args.assetsPath = path.resolve(projectRoot, argv[i + 1]);
      i += 1;
      continue;
    }

    if (token === "--out") {
      args.outputDir = path.resolve(projectRoot, argv[i + 1]);
      i += 1;
      continue;
    }

    if (token === "--ids") {
      const values = (argv[i + 1] ?? "")
        .split(",")
        .map((entry) => Number.parseInt(entry.trim(), 10))
        .filter(Number.isInteger);
      args.ids = new Set(values);
      i += 1;
      continue;
    }

    if (token === "--dry-run") {
      args.dryRun = true;
      continue;
    }

    if (token === "--strict-robots") {
      args.strictRobots = true;
      continue;
    }
  }

  return args;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function buildFileName(id, slug, index) {
  if (index === 0) {
    return `${id}-${slug}.webp`;
  }

  return `${id}-${slug}-${index + 1}.webp`;
}

function normalizeSourceList(source) {
  if (!source) {
    return [];
  }

  if (typeof source.url === "string" && source.url.trim()) {
    return [source.url.trim()];
  }

  if (Array.isArray(source.urls)) {
    return source.urls.map((url) => `${url}`.trim()).filter(Boolean);
  }

  return [];
}

function mergeAllowedDomains(plan, task, source, brand) {
  const planDomains = Array.isArray(plan.official_domains?.[brand]) ? plan.official_domains[brand] : [];
  const taskDomains = Array.isArray(task.allowed_asset_domains) ? task.allowed_asset_domains : [];
  const sourceDomains = Array.isArray(source.allowed_domains) ? source.allowed_domains : [];

  return normalizeAllowedDomains([...planDomains, ...taskDomains, ...sourceDomains]);
}

function ensureOfficialDomain(url, allowedDomains) {
  const target = new URL(url);
  if (!isHostAllowed(target.hostname, allowedDomains)) {
    throw new Error(`Blocked domain: ${target.hostname}. Allowed: ${allowedDomains.join(", ")}`);
  }
}

async function writeWebp({ inputBuffer, outputPath, maxWidth, quality }) {
  const image = sharp(inputBuffer, { failOn: "none" }).rotate();
  const metadata = await image.metadata();

  let pipeline = image;
  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
  }

  await pipeline.webp({ quality }).toFile(outputPath);
}

async function downloadAndWriteImage({
  imageUrl,
  id,
  slug,
  startIndex,
  remaining,
  outputDir,
  allowedDomains,
  policyClient,
  policy,
  strictRobots,
}) {
  const outputs = [];

  if (remaining <= 0) {
    return outputs;
  }

  ensureOfficialDomain(imageUrl, allowedDomains);

  const response = await policyClient.fetchResponse(imageUrl, {
    allowedDomains,
    strictRobots,
    accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
  });

  const contentType = (response.headers.get("content-type") ?? "").toLowerCase();
  const isImageType = contentType.includes("image/");
  if (!isImageType) {
    const isUnknownType = !contentType || contentType.includes("application/octet-stream");
    const looksLikeImageByExt = /\.(avif|jpe?g|png|webp)(\?.*)?$/i.test(imageUrl);
    if (!isUnknownType || !looksLikeImageByExt) {
      throw new Error(`Expected image content-type but received "${contentType || "(none)"}" from ${imageUrl}`);
    }
  }

  const inputBuffer = Buffer.from(await response.arrayBuffer());
  const fileName = buildFileName(id, slug, startIndex);
  const outputPath = path.join(outputDir, fileName);

  await writeWebp({
    inputBuffer,
    outputPath,
    maxWidth: policy.max_width_px,
    quality: policy.webp_quality,
  });

  outputs.push({
    fileName,
    sourceUrl: imageUrl,
  });

  return outputs;
}

async function collectFromPdfSource({
  source,
  id,
  slug,
  remaining,
  outputDir,
  allowedDomains,
  policyClient,
  policy,
  strictRobots,
  startIndex,
}) {
  if (!source.url || remaining <= 0) {
    return [];
  }

  ensureOfficialDomain(source.url, allowedDomains);

  const pdfBuffer = await policyClient.fetchBuffer(source.url, {
    allowedDomains,
    strictRobots,
    accept: "application/pdf,*/*;q=0.8",
  });

  const renderedPages = await renderPdfPagesToImages(pdfBuffer, source.pages, {
    dpi: source.dpi ?? 170,
  });

  const outputs = [];
  for (const pageImage of renderedPages.slice(0, remaining)) {
    const fileName = buildFileName(id, slug, startIndex + outputs.length);
    const outputPath = path.join(outputDir, fileName);

    await writeWebp({
      inputBuffer: pageImage.buffer,
      outputPath,
      maxWidth: policy.max_width_px,
      quality: policy.webp_quality,
    });

    outputs.push({
      fileName,
      sourceUrl: `${source.url}#page=${pageImage.pageNumber}`,
    });
  }

  return outputs;
}

async function collectFromHtmlSource({
  source,
  task,
  id,
  slug,
  remaining,
  outputDir,
  allowedDomains,
  policyClient,
  policy,
  strictRobots,
  startIndex,
}) {
  if (!source.url || remaining <= 0) {
    return [];
  }

  ensureOfficialDomain(source.url, allowedDomains);
  let html = "";
  try {
    html = await policyClient.fetchText(source.url, {
      allowedDomains,
      strictRobots,
      accept: "text/html,*/*;q=0.8",
    });
  } catch (error) {
    if (!source.allow_browser) {
      throw error;
    }

    console.warn(`  - HTML fetch failed, trying browser fallback: ${source.url}`);
    console.warn(`    Reason: ${error.message}`);
  }

  let candidateUrls = html ? extractImageUrlsFromHtml(html, source.url, task.model) : [];
  if (candidateUrls.length === 0 && source.allow_browser) {
    candidateUrls = await extractImageUrlsWithPlaywright(source.url, task.model);
  }

  const outputs = [];
  const seen = new Set();

  for (const candidate of candidateUrls) {
    if (outputs.length >= remaining) {
      break;
    }

    if (seen.has(candidate)) {
      continue;
    }
    seen.add(candidate);

    try {
      ensureOfficialDomain(candidate, allowedDomains);
      const downloaded = await downloadAndWriteImage({
        imageUrl: candidate,
        id,
        slug,
        startIndex: startIndex + outputs.length,
        remaining: 1,
        outputDir,
        allowedDomains,
        policyClient,
        policy,
        strictRobots,
      });

      outputs.push(...downloaded);
    } catch (error) {
      console.warn(`  - Skipped candidate image: ${candidate}`);
      console.warn(`    Reason: ${error.message}`);
    }
  }

  return outputs;
}

async function collectFromMediaSource({
  source,
  id,
  slug,
  remaining,
  outputDir,
  allowedDomains,
  policyClient,
  policy,
  strictRobots,
  startIndex,
}) {
  const sourceUrls = normalizeSourceList(source);
  if (sourceUrls.length === 0 || remaining <= 0) {
    return [];
  }

  const outputs = [];
  for (const candidate of sourceUrls) {
    if (outputs.length >= remaining) {
      break;
    }

    try {
      ensureOfficialDomain(candidate, allowedDomains);
      const downloaded = await downloadAndWriteImage({
        imageUrl: candidate,
        id,
        slug,
        startIndex: startIndex + outputs.length,
        remaining: 1,
        outputDir,
        allowedDomains,
        policyClient,
        policy,
        strictRobots,
      });
      outputs.push(...downloaded);
    } catch (error) {
      console.warn(`  - Skipped media asset: ${candidate}`);
      console.warn(`    Reason: ${error.message}`);
    }
  }

  return outputs;
}

async function collectMachineAssetsForTask({
  task,
  row,
  plan,
  outputDir,
  policyClient,
  policy,
  strictRobots,
  targetImageCount,
  dryRun,
}) {
  const slug = task.slug ?? row.fileName.replace(/^\d+-/, "").replace(/\.webp$/i, "");
  const sources = Array.isArray(task.sources) ? task.sources : [];
  const outputs = [];

  for (const source of sources) {
    if (outputs.length >= targetImageCount) {
      break;
    }

    const type = `${source.type ?? ""}`.toLowerCase();
    const remaining = targetImageCount - outputs.length;
    if (remaining <= 0) {
      break;
    }

    const allowedDomains = mergeAllowedDomains(plan, task, source, task.brand);
    if (allowedDomains.length === 0) {
      throw new Error(`No official domains configured for "${task.brand}" (machine ${task.id}).`);
    }

    if (dryRun) {
      const sourceUrls = normalizeSourceList(source);
      const previewUrl = sourceUrls[0] ?? source.url ?? "(no url)";
      console.log(`  - [dry-run] source: ${type || "unknown"} ${previewUrl}`);

      if (previewUrl !== "(no url)") {
        outputs.push({
          fileName: buildFileName(task.id, slug, outputs.length),
          sourceUrl: previewUrl,
        });
      }

      continue;
    }

    let extracted = [];
    if (type === "pdf") {
      extracted = await collectFromPdfSource({
        source,
        task,
        id: task.id,
        slug,
        remaining,
        outputDir,
        allowedDomains,
        policyClient,
        policy,
        strictRobots,
        startIndex: outputs.length,
      });
    } else if (type === "html") {
      extracted = await collectFromHtmlSource({
        source,
        task,
        id: task.id,
        slug,
        remaining,
        outputDir,
        allowedDomains,
        policyClient,
        policy,
        strictRobots,
        startIndex: outputs.length,
      });
    } else if (type === "media") {
      extracted = await collectFromMediaSource({
        source,
        id: task.id,
        slug,
        remaining,
        outputDir,
        allowedDomains,
        policyClient,
        policy,
        strictRobots,
        startIndex: outputs.length,
      });
    }

    outputs.push(...extracted);
  }

  return outputs;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const planRaw = await fs.readFile(args.planPath, "utf8");
  const plan = JSON.parse(planRaw);
  const assetsMarkdown = await fs.readFile(args.assetsPath, "utf8");
  const { rows } = parseAssetsSourcesMachineRows(assetsMarkdown);

  const rowById = new Map(rows.map((row) => [row.id, row]));
  const tasks = Array.isArray(plan.tasks) ? plan.tasks : [];

  const policy = {
    min_delay_ms: Number.parseInt(plan.policy?.request_delay_ms?.min, 10) || 1500,
    max_delay_ms: Number.parseInt(plan.policy?.request_delay_ms?.max, 10) || 3000,
    max_images_per_machine: clamp(Number.parseInt(plan.policy?.max_images_per_machine, 10) || 1, 1, 2),
    max_images_per_brand: Math.max(1, Number.parseInt(plan.policy?.max_images_per_brand, 10) || 30),
    max_width_px: Math.max(400, Number.parseInt(plan.policy?.max_width_px, 10) || 1600),
    webp_quality: clamp(Number.parseInt(plan.policy?.webp_quality, 10) || 80, 75, 85),
  };

  const policyClient = new RequestPolicyClient({
    userAgent: plan.policy?.user_agent ?? "JecheongymAssetBot/1.0",
    minDelayMs: policy.min_delay_ms,
    maxDelayMs: policy.max_delay_ms,
  });

  if (!args.dryRun) {
    await fs.mkdir(args.outputDir, { recursive: true });
  }

  const updatesById = new Map();
  const brandUsage = new Map();

  let processed = 0;
  let collected = 0;
  let skipped = 0;
  let failed = 0;

  for (const task of tasks) {
    if (args.ids && !args.ids.has(task.id)) {
      continue;
    }

    processed += 1;
    const row = rowById.get(task.id);
    if (!row) {
      skipped += 1;
      console.warn(`Skipping ID ${task.id}: missing row in ASSETS_SOURCES.md`);
      continue;
    }

    const brand = task.brand ?? row.brand;
    const perMachine = clamp(
      Number.parseInt(task.max_images, 10) || policy.max_images_per_machine,
      1,
      policy.max_images_per_machine,
    );
    const brandUsed = brandUsage.get(brand) ?? 0;
    const brandRemaining = Math.max(0, policy.max_images_per_brand - brandUsed);
    const targetImageCount = Math.min(perMachine, brandRemaining);

    if (targetImageCount <= 0) {
      skipped += 1;
      console.warn(`Skipping ID ${task.id}: brand limit reached (${brand})`);
      continue;
    }

    console.log(`Processing ${task.id} - ${task.model} (${brand})`);

    try {
      const outputs = await collectMachineAssetsForTask({
        task: { ...task, brand },
        row,
        plan,
        outputDir: args.outputDir,
        policyClient,
        policy,
        strictRobots: args.strictRobots,
        targetImageCount,
        dryRun: args.dryRun,
      });

      if (outputs.length === 0) {
        skipped += 1;
        console.warn(`  - No assets collected for ID ${task.id}`);
        continue;
      }

      brandUsage.set(brand, brandUsed + outputs.length);
      collected += outputs.length;

      if (!args.dryRun) {
        const sourceUrl = outputs.map((entry) => entry.sourceUrl).join("<br>");
        updatesById.set(task.id, {
          sourceUrl,
          acquiredAt: todayIso(),
          status: "✅ Collected",
        });
      }

      for (const output of outputs) {
        console.log(`  - Saved ${output.fileName}`);
      }
    } catch (error) {
      failed += 1;
      console.error(`  - Failed ID ${task.id}: ${error.message}`);
    }
  }

  if (!args.dryRun && updatesById.size > 0) {
    const updatedMarkdown = applyMachineRowUpdates(assetsMarkdown, updatesById);
    await fs.writeFile(args.assetsPath, updatedMarkdown, "utf8");
    console.log(`Updated source log: ${path.relative(projectRoot, args.assetsPath)}`);
  }

  console.log("");
  console.log("Summary");
  console.log(`- Tasks processed: ${processed}`);
  console.log(`- Images collected: ${collected}`);
  console.log(`- Skipped: ${skipped}`);
  console.log(`- Failed: ${failed}`);
  console.log(`- Mode: ${args.dryRun ? "dry-run" : "write"}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
