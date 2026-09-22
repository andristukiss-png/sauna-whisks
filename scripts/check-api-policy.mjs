import fs from "node:fs";

const cached = [
  "app/api/catalog/route.ts",
  "app/api/articles/route.ts",
  "app/api/markets/route.ts",
  "app/api/trade/route.ts",
  "app/api/materials/route.ts",
  "app/api/conditions/route.ts",
  "app/api/glossary/route.ts",
  "app/api/guides/route.ts",
  "app/api/operations/route.ts",
  "app/api/sources/route.ts",
  "app/api/company/route.ts",
  "app/api/use-cases/route.ts",
  "app/api/techniques/route.ts",
  "app/api/faq/route.ts",
  "app/api/traditions/route.ts",
  "app/api/comparisons/route.ts",
  "app/api/editorial/route.ts",
  "app/api/tools/route.ts",
  "app/api/route.ts",
  "app/feed.json/route.ts"
];

const noStore = [
  "app/api/search/route.ts",
  "app/api/status/route.ts",
  "app/api/health/route.ts"
];

const cachedCsv = [
  "app/api/catalog.csv/route.ts",
  "app/api/sources.csv/route.ts",
  "app/api/product-data-template.csv/route.ts",
  "app/api/supplier-sample-template.csv/route.ts",
  "app/api/trade-trial-template.csv/route.ts"
];

const publicTextRoutes = [
  "app/feed.xml/route.ts",
  "app/llms.txt/route.ts",
  "app/humans.txt/route.ts",
  "app/.well-known/security.txt/route.ts"
];

const errors = [];

for (const file of cached) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes("publicJson")) errors.push("Public API missing cache helper: " + file);
}

for (const file of noStore) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes("noStoreJson")) errors.push("Dynamic API missing no-store helper: " + file);
}

for (const file of cachedCsv) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes("publicCsv")) errors.push("Public CSV missing shared response helper: " + file);
  if (!text.includes("encodeCsv")) errors.push("Public CSV missing shared encoder: " + file);
}

for (const file of publicTextRoutes) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes("publicText")) errors.push("Public text/feed route missing shared response helper: " + file);
}

const helper = fs.readFileSync("lib/publicApi.ts", "utf8");
const helperRequirements = [
  ['"Access-Control-Allow-Origin": "*"', "read-only CORS header"],
  ["max-age=0, s-maxage=", "CDN cache policy for public JSON"],
  ["publicCacheControl(maxAge)", "shared CDN cache policy for public text"],
  ['"Cache-Control": "no-store, max-age=0"', "no-store cache policy"],
  ['contentType = "text/plain; charset=utf-8"', "default text content type"],
  ['contentType: "text/csv; charset=utf-8"', "CSV content type"],
];

for (const [needle, label] of helperRequirements) {
  if (!helper.includes(needle)) errors.push("Public response helper missing " + label + ".");
}

const searchApi = fs.readFileSync("app/api/search/route.ts", "utf8");
if (!searchApi.includes("MAX_SEARCH_QUERY_LENGTH")) errors.push("Search API query length is not bounded.");
if (!searchApi.includes("isSiteSearchFilter")) errors.push("Search API does not use shared filter validation.");
if (!searchApi.includes("filterSiteSearchItems")) errors.push("Search API does not use shared search filtering.");
if (!searchApi.includes("normalizeSearchQuery")) errors.push("Search API does not use shared query normalization.");

const enquiry = fs.readFileSync("app/api/enquiry/route.ts", "utf8");
const enquiryGuards = [
  ["same-origin guard", 'headers.get("origin")'],
  ["JSON content-type guard", 'headers.get("content-type")'],
  ["declared body-size guard", 'headers.get("content-length")'],
  ["actual body-size guard", "TextEncoder"],
  ["honeypot guard", "if (website)"],
  ["fast-submit bot guard", "Date.now() - startedAt < 1800"],
  ["outbound timeout", "AbortSignal.timeout(10_000)"],
  ["request ID response header", '"X-Request-ID"'],
  ["no-store response header", '"Cache-Control": "no-store, max-age=0"'],
];

for (const [label, needle] of enquiryGuards) {
  if (!enquiry.includes(needle)) errors.push("Enquiry API missing " + label + ".");
}

if (enquiry.includes("Access-Control-Allow-Origin") || enquiry.includes("publicJson") || enquiry.includes("noStoreJson")) {
  errors.push("Enquiry POST must not inherit wildcard public-data CORS.");
}

if (errors.length) {
  console.error("API policy validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("API cache/security/interoperability validation passed.");
