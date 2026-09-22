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
  "/quality",
  "/resources",
  "/help",
  "/templates",
  "/tools",
  "/use-cases",
  "/techniques",
  "/company",
  "/press",
  "/editorial-policy",
  "/corrections",
  "/suppliers/requirements",
  "/suppliers/sample-evaluation",
  "/trade/trial",
];

for (const route of requiredStatic) {
  if (!sitemap.includes('"' + route + '"')) errors.push("Sitemap missing static route: " + route);
}

const excludedStatic = ["/search"];
for (const route of excludedStatic) {
  if (sitemap.includes('"' + route + '"')) errors.push("Noindex route must not appear in sitemap: " + route);
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

if (sitemap.includes("lastModified: new Date()")) {
  errors.push("Sitemap must not invent current timestamps for unchanged content.");
}

if (errors.length) {
  console.error("Sitemap validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Sitemap validation passed.");
