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

for (const alias of ["sauna broom", "venik", "vihta", "vasta"]) {
  if (!text.includes('"' + alias + '"')) errors.push("Missing sauna-whisk search alias: " + alias);
}
if (!text.includes("...saunaWhiskAliases")) {
  errors.push("Search index does not reuse the sauna-whisk alias set.");
}


const searchHelper = fs.readFileSync("lib/search.ts", "utf8");
const searchApi = fs.readFileSync("app/api/search/route.ts", "utf8");
const searchUi = fs.readFileSync("components/SiteSearch.tsx", "utf8");

const sharedRequirements = [
  "siteSearchFilters",
  "MAX_SEARCH_QUERY_LENGTH",
  "normalizeSearchQuery",
  "filterSiteSearchItems",
  "searchScore",
  "isSiteSearchFilter"
];

for (const requirement of sharedRequirements) {
  if (!searchHelper.includes(requirement)) errors.push("Search helper missing: " + requirement);
}
if (!searchApi.includes("filterSiteSearchItems")) errors.push("Search API bypasses shared search helper.");
if (!searchUi.includes("filterSiteSearchItems")) errors.push("Search UI bypasses shared search helper.");
if (!siteSearch.includes("...article.sections.map((section) => section.heading)")) errors.push("Article section headings are missing from site-search keywords.");
if (!searchUi.includes("maxLength={MAX_SEARCH_QUERY_LENGTH}")) errors.push("Search UI input is not bounded to shared query length.");
const localSmoke = fs.readFileSync("scripts/local-smoke.mjs", "utf8");
if (!localSmoke.includes('/api/search?q=venik') || !localSmoke.includes('/glossary/venik')) {
  errors.push("Local smoke must verify exact-term search relevance.");
}
const searchPage = fs.readFileSync("app/search/page.tsx", "utf8");
if (!searchPage.includes("isSiteSearchFilter")) errors.push("Search page bypasses shared filter validation.");
for (const [needle, label] of [
  ["string | string[] | undefined", "repeated query-parameter type"],
  ["function firstSearchParam", "repeated query-parameter normalizer"],
  [".slice(0, MAX_SEARCH_QUERY_LENGTH)", "server-side initial query length bound"],
]) {
  if (!searchPage.includes(needle)) errors.push("Search page missing " + label + ".");
}
if (!localSmoke.includes("/search?q=birch&q=oak&type=Guide&type=Product")) {
  errors.push("Local smoke must verify repeated search query parameters.");
}

if (errors.length) {
  console.error("Search-index validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}
console.log("Search-index validation passed.");
