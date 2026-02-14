#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { applyMachineRowUpdates, parseAssetsSourcesMachineRows } from "./lib/assets-sources-md.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const defaultAssetsPath = path.join(projectRoot, "ASSETS_SOURCES.md");
const defaultOutputDir = path.join(projectRoot, "public", "machines");

function parseArgs(argv) {
  const args = {
    id: null,
    assetsPath: defaultAssetsPath,
    outputDir: defaultOutputDir,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === "--id") {
      args.id = Number.parseInt(argv[i + 1], 10);
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
  }

  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!Number.isInteger(args.id)) {
    throw new Error("Usage: node remove-machine-image.mjs --id <machine-id>");
  }

  const markdown = await fs.readFile(args.assetsPath, "utf8");
  const { rows } = parseAssetsSourcesMachineRows(markdown);
  const row = rows.find((entry) => entry.id === args.id);

  if (!row) {
    throw new Error(`Machine ID ${args.id} not found in ${args.assetsPath}`);
  }

  const baseName = row.fileName.replace(/\.webp$/i, "");
  const allFiles = await fs.readdir(args.outputDir).catch(() => []);
  const matches = allFiles.filter((file) => file === `${baseName}.webp` || file.startsWith(`${baseName}-`));

  for (const file of matches) {
    await fs.unlink(path.join(args.outputDir, file));
    console.log(`Removed ${file}`);
  }

  const updated = applyMachineRowUpdates(markdown, new Map([[args.id, { status: "🛑 Takedown", acquiredAt: "" }]]));
  await fs.writeFile(args.assetsPath, updated, "utf8");

  if (matches.length === 0) {
    console.log(`No files found for ID ${args.id}, but status was updated.`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
