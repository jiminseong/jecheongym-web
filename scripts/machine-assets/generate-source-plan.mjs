#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fileNameToSlug, parseAssetsSourcesMachineRows } from "./lib/assets-sources-md.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const defaultAssetsPath = path.join(projectRoot, "ASSETS_SOURCES.md");
const defaultOutputPath = path.join(__dirname, "source-plan.template.json");

function parseArgs(argv) {
  const args = {
    assetsPath: defaultAssetsPath,
    outPath: defaultOutputPath,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];

    if (value === "--assets") {
      args.assetsPath = path.resolve(projectRoot, argv[i + 1]);
      i += 1;
      continue;
    }

    if (value === "--out") {
      args.outPath = path.resolve(projectRoot, argv[i + 1]);
      i += 1;
      continue;
    }
  }

  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const markdown = await fs.readFile(args.assetsPath, "utf8");
  const { rows } = parseAssetsSourcesMachineRows(markdown);

  if (rows.length === 0) {
    throw new Error(`No machine rows found in ${args.assetsPath}`);
  }

  const template = {
    policy: {
      user_agent: "JecheongymAssetBot/1.0",
      request_delay_ms: {
        min: 1500,
        max: 3000,
      },
      max_images_per_machine: 1,
      max_images_per_brand: 30,
      max_width_px: 1600,
      webp_quality: 80,
    },
    official_domains: {
      "Hammer Strength": ["lifefitness.com"],
      "Life Fitness": ["lifefitness.com"],
      "Arsenal Strength": ["arsenalstrength.com"],
      Panatta: ["panattasport.com"],
      Nautilus: [],
      Cybex: [],
      Icarian: [],
      "Body Masters": [],
      Others: [],
    },
    source_examples: {
      pdf: {
        type: "pdf",
        url: "https://brand.com/catalogs/official-brochure.pdf",
        pages: [12],
        dpi: 170,
      },
      html: {
        type: "html",
        url: "https://brand.com/products/official-model-page",
        allow_browser: false,
      },
      media: {
        type: "media",
        url: "https://brand.com/media/official-model-image.jpg",
      },
    },
    tasks: rows
      .sort((a, b) => a.id - b.id)
      .map((row) => ({
        id: row.id,
        brand: row.brand,
        model: row.model,
        slug: fileNameToSlug(row.fileName),
        max_images: 1,
        allowed_asset_domains: [],
        sources: [],
      })),
  };

  await fs.mkdir(path.dirname(args.outPath), { recursive: true });
  await fs.writeFile(args.outPath, `${JSON.stringify(template, null, 2)}\n`, "utf8");

  console.log(`Generated source plan template: ${path.relative(projectRoot, args.outPath)}`);
  console.log(`Machine tasks: ${template.tasks.length}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
