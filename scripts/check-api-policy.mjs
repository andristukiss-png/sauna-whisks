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

const errors = [];

for (const file of cached) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes("publicJson")) errors.push("Public API missing cache helper: " + file);
}

for (const file of noStore) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes("noStoreJson")) errors.push("Dynamic API missing no-store helper: " + file);
}


const cachedCsv = [
  "app/api/catalog.csv/route.ts",
  "app/api/sources.csv/route.ts",
  "app/api/product-data-template.csv/route.ts",
  "app/api/supplier-sample-template.csv/route.ts",
  "app/api/trade-trial-template.csv/route.ts"
];

for (const file of cachedCsv) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes('"Cache-Control"')) errors.push("Public CSV missing cache policy: " + file);
  if (!text.includes('"Content-Type"')) errors.push("Public CSV missing content type: " + file);
}

const searchApi = fs.readFileSync("app/api/search/route.ts", "utf8");
if (!searchApi.includes("MAX_QUERY_LENGTH")) errors.push("Search API query length is not bounded.");
if (!searchApi.includes('type = allowedTypes.has(requestedType) ? requestedType : "All"')) {
  errors.push("Search API does not normalize invalid type filters.");
}

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

if (errors.length) {
  console.error("API policy validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}
console.log("API cache/security policy validation passed.");
