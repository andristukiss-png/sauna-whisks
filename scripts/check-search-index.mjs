import fs from "node:fs";

const text = fs.readFileSync("lib/siteSearch.ts", "utf8");
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
  "techniques.map"
];
const requiredPages = ["/quality", "/resources", "/templates", "/catalog", "/claims", "/status", "/help", "/tools"];

const errors = [];
requiredCollections.forEach((item) => {
  if (!text.includes(item)) errors.push("Missing collection: " + item);
});
requiredPages.forEach((route) => {
  if (!text.includes('href: "' + route + '"')) errors.push("Missing page: " + route);
});

if (errors.length) {
  console.error("Search-index validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}
console.log("Search-index validation passed.");
