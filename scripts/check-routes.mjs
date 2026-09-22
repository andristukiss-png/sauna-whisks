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
];

for (const route of expectedApiRoutes) {
  if (!fs.existsSync(route)) errors.push(`Missing API route: ${route}`);
}

const expectedDynamicRoutes = [
  "app/journal/[slug]/page.tsx",
  "app/shop/[slug]/page.tsx",
  "app/markets/[slug]/page.tsx",
  "app/trade/[slug]/page.tsx",
  "app/operations/[slug]/page.tsx",
  "app/glossary/[slug]/page.tsx",
  "app/materials/[slug]/page.tsx",
  "app/traditions/[slug]/page.tsx",
  "app/guides/[slug]/page.tsx",
  "app/compare/[slug]/page.tsx",
  "app/faq/topic/[slug]/page.tsx",
  "app/journal/topic/[slug]/page.tsx",
  "app/conditions/[slug]/page.tsx",
];

for (const route of expectedDynamicRoutes) {
  if (!fs.existsSync(route)) errors.push(`Missing dynamic route: ${route}`);
}

if (errors.length) {
  console.error("Route/data validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Route/data validation passed.");
