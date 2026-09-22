import fs from "node:fs";

const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
const errors = [];

const requiredStatic = [
  "/shop",
  "/learn",
  "/journal",
  "/contact",
  "/privacy",
  "/terms",
  "/shipping",
  "/markets",
  "/trade",
  "/operations",
  "/sources",
  "/guides",
  "/conditions",
  "/catalog",
  "/claims",
  "/data",
  "/finder",
  "/checklist",
];

for (const route of requiredStatic) {
  if (!sitemap.includes('"' + route + '"')) errors.push("Sitemap missing static route: " + route);
}

const requiredCollections = [
  "saunaWhisks.map",
  "articles.map",
  "markets.map",
  "tradeSegments.map",
  "operationGuides.map",
  "glossaryTerms.map",
  "materialKnowledge.map",
  "traditionDetails.map",
  "buyerGuides.map",
  "comparisons.map",
  "faqTopics.map",
  "articleTopics.map",
  "productConditions.map",
  "useCases.map",
  "techniques.map",
];

for (const collection of requiredCollections) {
  if (!sitemap.includes(collection)) errors.push("Sitemap missing dynamic collection: " + collection);
}

if (errors.length) {
  console.error("Sitemap validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Sitemap validation passed.");
