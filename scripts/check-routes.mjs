import { discoverDynamicPageFiles, discoverStaticPageRoutes } from "./route-utils.mjs";
import { discoverApiRoutes } from "./api-route-utils.mjs";
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

const discoveredApiRoutes = discoverApiRoutes();
if (!discoveredApiRoutes.length) {
  errors.push("No API routes were discovered.");
}

const apiPaths = discoveredApiRoutes.map(({ path }) => path);
const duplicateApiPaths = apiPaths.filter((route, index) => apiPaths.indexOf(route) !== index);
if (duplicateApiPaths.length) {
  errors.push("Duplicate discovered API path(s): " + [...new Set(duplicateApiPaths)].join(", "));
}

for (const { file, path: routePath } of discoveredApiRoutes) {
  if (routePath.includes("[") || routePath.includes("]")) {
    errors.push("Dynamic API routes are not part of the current public-data contract: " + file);
  }
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
