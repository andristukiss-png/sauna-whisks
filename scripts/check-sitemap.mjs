import { discoverStaticPageRoutes } from "./route-utils.mjs";
import fs from "node:fs";

const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");
const errors = [];
const staticPagesBlock = sitemap.match(/const staticPages = \[([\s\S]*?)\];/)?.[1] || "";
const listedStaticRoutes = [...staticPagesBlock.matchAll(/"([^"]*)"/g)]
  .map((match) => match[1] || "/")
  .map((route) => route.replace(/\/$/, "") || "/");
const listedStaticSet = new Set(listedStaticRoutes);
const discoveredStaticRoutes = discoverStaticPageRoutes();
const sitemapExcludedStatic = new Set(["/search"]);

if (!staticPagesBlock) {
  errors.push("Could not parse sitemap staticPages registry.");
}
if (listedStaticSet.size !== listedStaticRoutes.length) {
  errors.push("Sitemap staticPages contains duplicate routes.");
}

for (const route of discoveredStaticRoutes) {
  if (sitemapExcludedStatic.has(route)) {
    if (listedStaticSet.has(route)) {
      errors.push("Noindex static page must not appear in sitemap: " + route);
    }
    continue;
  }
  if (!listedStaticSet.has(route)) {
    errors.push("Discovered static page is missing from sitemap: " + route);
  }
}

for (const route of listedStaticSet) {
  if (!discoveredStaticRoutes.includes(route)) {
    errors.push("Sitemap static route has no page source: " + route);
  }
}


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

const excludedStatic = ["/search", "/markets/united-states"];
for (const route of excludedStatic) {
  if (sitemap.includes('"' + route + '"')) errors.push("Noindex route must not appear in sitemap: " + route);
}

const requiredCollections = [
  "saunaWhisks.map",
  "articles.map",
  "markets.filter",
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
