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
