import { discoverDynamicPageFiles, discoverStaticPageRoutes } from "./route-utils.mjs";
import fs from "node:fs";

const dataFiles = [
  ["lib/articles.ts", /slug:\s*"([^"]+)"/g],
  ["lib/products.ts", /slug:\s*"([^"]+)"/g],
  ["lib/markets.ts", /slug:\s*"([^"]+)"/g],
  ["lib/tradeSegments.ts", /slug:\s*"([^"]+)"/g],
  ["lib/operations.ts", /slug:\s*"([^"]+)"/g],
  ["lib/glossaryTerms.ts", /slug:\s*"([^"]+)"/g],
  ["lib/materialKnowledge.ts", /slug:\s*"([^"]+)"/g],
  ["lib/traditionDetails.ts", /slug:\s*"([^"]+)"/g],
  ["lib/buyerGuides.ts", /slug:\s*"([^"]+)"/g],
  ["lib/comparisons.ts", /slug:\s*"([^"]+)"/g],
  ["lib/faqTopics.ts", /slug:\s*"([^"]+)"/g],
  ["lib/articleTopics.ts", /slug:\s*"([^"]+)"/g],
  ["lib/productConditions.ts", /slug:\s*"([^"]+)"/g],
  ["lib/useCases.ts", /slug:\s*"([^"]+)"/g],
  ["lib/techniques.ts", /slug:\s*"([^"]+)"/g],
];

const errors = [];

for (const [file, regex] of dataFiles) {
  if (!fs.existsSync(file)) {
    errors.push(`Missing data file: ${file}`);
    continue;
  }
  const source = fs.readFileSync(file, "utf8");
  const slugs = [...source.matchAll(regex)].map((match) => match[1]);
  const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
  if (duplicates.length) errors.push(`Duplicate slug(s) in ${file}: ${[...new Set(duplicates)].join(", ")}`);
}

const expectedApiRoutes = [
  "app/api/health/route.ts",
  "app/api/status/route.ts",
  "app/api/catalog/route.ts",
  "app/api/catalog.csv/route.ts",
  "app/api/articles/route.ts",
  "app/api/search/route.ts",
  "app/api/markets/route.ts",
  "app/api/trade/route.ts",
  "app/api/materials/route.ts",
  "app/api/conditions/route.ts",
  "app/api/glossary/route.ts",
  "app/api/guides/route.ts",
  "app/api/operations/route.ts",
  "app/api/sources/route.ts",
  "app/api/sources.csv/route.ts",
  "app/api/product-data-template.csv/route.ts",
  "app/api/supplier-sample-template.csv/route.ts",
  "app/api/trade-trial-template.csv/route.ts",
  "app/api/company/route.ts",
  "app/api/use-cases/route.ts",
  "app/api/techniques/route.ts",
  "app/api/faq/route.ts",
  "app/api/traditions/route.ts",
  "app/api/comparisons/route.ts",
  "app/api/editorial/route.ts",
  "app/api/tools/route.ts",
];

for (const route of expectedApiRoutes) {
  if (!fs.existsSync(route)) errors.push(`Missing API route: ${route}`);
}

const discoveredStaticRoutes = new Set(discoverStaticPageRoutes());
for (const route of [
  "/",
  "/shop",
  "/journal",
  "/contact",
  "/status",
  "/tools",
  "/tools/supplier-scorecard",
  "/tools/landed-cost",
  "/tools/trade-demand",
  "/tools/launch-readiness",
]) {
  if (!discoveredStaticRoutes.has(route)) {
    errors.push(`Missing critical static page route: ${route}`);
  }
}

const discoveredDynamicRoutes = discoverDynamicPageFiles();
if (!discoveredDynamicRoutes.length) {
  errors.push("No dynamic page routes were discovered.");
}

for (const route of discoveredDynamicRoutes) {
  const source = fs.readFileSync(route, "utf8");
  if (!source.includes("generateStaticParams")) {
    errors.push(`Dynamic route missing generateStaticParams: ${route}`);
  }
  if (!source.includes("export const dynamicParams = false;")) {
    errors.push(`Finite dynamic route must disable runtime params: ${route}`);
  }
  if (source.includes(String.raw`dynamicParams = false;\\n`)) {
    errors.push(`Dynamic route contains escaped newline corruption: ${route}`);
  }
}

if (errors.length) {
  console.error("Route/data validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Route/data validation passed.");
