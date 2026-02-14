#!/usr/bin/env node

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..", "..");
const planPath = path.join(__dirname, "source-plan.json");

const SOURCES_BY_ID = new Map(
  Object.entries({
    101: "https://www.panattasport.com/en/free-weight-special/super-high-row/",
    102: "https://www.panattasport.com/en/free-weight-special/super-rowing-machine-circular/",
    103: "https://www.panattasport.com/en/free-weight-special/super-low-row/",
    104: "https://www.panattasport.com/en/free-weight-special/super-rowing/",
    105: "https://www.panattasport.com/en/free-weight-special/super-lat-machine-convert/",
    106: "https://www.panattasport.com/en/free-weight-special/incline-split-45-degree-leg-press/",
    107: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-plate-loaded-smith-press",
    108: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-plate-loaded-squat-press",
    109: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-plate-loaded-hack-squat",
    110: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-plate-loaded-leg-press",
    111: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-bravo-advanced",
    112: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-ion-series-seated-row",
    113: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-prestige-strength-vrs-lateral-raise",
    114: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-eagle-nx-leg-press",
    115: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-eagle-nx-arm-curl",
    116: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-ion-series-shoulder-press",
    117: "https://shop.corehandf.com/products/nautilus-impact-dip-machine",
    118: "https://shop.corehandf.com/products/nautilus-impact-lat-pull-down",
    119: "https://shop.corehandf.com/products/nautilus-impact-incline-press",
    120: "https://shop.corehandf.com/products/nautilus-instinct-dual-multi-press",
    121: "https://shop.corehandf.com/products/nautilus-instinct-dual-biceps-curl-triceps-extension",
    122: "https://shop.corehandf.com/products/nautilus-inspiration-pull-over",
    123: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-iso-lateral-shoulder-press",
    124: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-iso-lateral-bench-press",
    125: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/iso-lateral-decline-chest-press",
    126: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-iso-lateral-incline-press",
    127: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-iso-lateral-super-incline-press",
    128: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-iso-lateral-low-row",
    129: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-iso-lateral-row",
    130: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-seated-biceps",
    131: "https://www.lifefitness.com/en-us/catalog/strength-training/selectorized/mts-iso-lateral-triceps-extension",
    132: "https://www.lifefitness.com/en-us/catalog/strength-training/selectorized/hammer-strength-select-hip-abduction",
    133: "https://www.lifefitness.com/en-us/catalog/strength-training/selectorized/hammer-strength-select-leg-extension",
    134: "https://www.lifefitness.com/en-us/catalog/strength-training/selectorized/hammer-strength-select-leg-curl",
    135: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-iso-lateral-wide-pulldown",
    136: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-iso-lateral-front-lat-pulldown",
    137: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-iso-lateral-d-y-row",
    138: "https://www.lifefitness.com/en-us/catalog/strength-training/selectorized/hammer-strength-mts-iso-lateral-high-row",
    139: "https://www.lifefitness.com/en-us/catalog/strength-training/selectorized/hammer-strength-mts-iso-lateral-incline-press",
    140: "https://www.lifefitness.com/en-us/catalog/strength-training/selectorized/hammer-strength-mts-iso-lateral-decline-press",
    141: "https://www.lifefitness.com/en-us/catalog/strength-training/selectorized/mts-iso-lateral-shoulder-press",
    142: "https://www.lifefitness.com/en-us/catalog/strength-training/selectorized/hammer-strength-select-fixed-pulldown",
    143: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-seated-leg-curl",
    144: "https://www.myarsenalstrength.com/strength-equipment/reloaded/upper-body-reloaded/reloaded-multi-row",
    145: "https://www.lifefitness.com/en-us/catalog/strength-training/plate-loaded/plate-loaded-v-squat",
    146: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-eagle-nx-lat-pulldown",
    147: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-eagle-nx-row",
    148: "https://www.lifefitness.com/en-us/catalog/cybex/cybex-products/cybex-ion-series-pectoral-fly-rear-deltoid",
    152: "https://gymleco.com/products/334-standing-side-lateral",
    153: "https://newtechworldwide.com/products/adjustable-low-pulley",
    154: "https://newtechworldwide.com/products/power-rack",
    155: "https://newtechworldwide.com/products/olympic-bench",
    156: "https://newtechworldwide.com/products/dumbbell-rack-small-type",
    157: "https://newtechworldwide.com/products/dumbbell-rack-low-type",
  }).map(([id, url]) => [Number.parseInt(id, 10), url]),
);

const BRAND_EXTRA_DOMAINS = {
  Panatta: ["panattasport.com", "www.panattasport.com"],
  "Hammer Strength": ["lifefitness.com"],
  "Life Fitness": ["lifefitness.com"],
  Cybex: ["lifefitness.com"],
  Icarian: ["lifefitness.com"],
  Nautilus: ["shop.corehandf.com", "cdn.shopify.com"],
  "Arsenal Strength": ["myarsenalstrength.com", "resources.myarsenalstrength.com"],
  Gymleco: ["gymleco.com"],
  Newtech: ["newtechworldwide.com", "www.newtechworldwide.com"],
  Others: ["newtechworldwide.com", "www.newtechworldwide.com"],
};

function uniq(values) {
  return [...new Set(values.filter(Boolean))];
}

async function main() {
  const raw = await fs.readFile(planPath, "utf8");
  const plan = JSON.parse(raw);

  plan.official_domains = {
    ...plan.official_domains,
    "Arsenal Strength": ["myarsenalstrength.com"],
    Nautilus: ["shop.corehandf.com"],
    Gymleco: ["gymleco.com"],
    Newtech: ["newtechworldwide.com"],
    Others: ["newtechworldwide.com"],
  };

  let mapped = 0;
  for (const task of plan.tasks ?? []) {
    const sourceUrl = SOURCES_BY_ID.get(task.id);
    const brandDomains = BRAND_EXTRA_DOMAINS[task.brand] ?? [];
    task.allowed_asset_domains = uniq([...(task.allowed_asset_domains ?? []), ...brandDomains]);

    if (!sourceUrl) {
      continue;
    }

    task.sources = [
      {
        type: "html",
        url: sourceUrl,
        allow_browser: task.brand === "Panatta",
      },
    ];
    mapped += 1;
  }

  await fs.writeFile(planPath, `${JSON.stringify(plan, null, 2)}\n`, "utf8");
  console.log(`Updated ${path.relative(projectRoot, planPath)} with ${mapped} source mappings.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
