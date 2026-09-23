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

const nextConfig = fs.readFileSync("next.config.ts", "utf8");
if (!nextConfig.includes('import { publicCrossOriginPaths } from "./lib/publicData"')) {
  errors.push("Next config must derive public cross-origin routes from the shared endpoint registry.");
}
if (!nextConfig.includes('value: "cross-origin"')) {
  errors.push("Next config missing cross-origin resource-policy override for public data.");
}
const publicData = fs.readFileSync("lib/publicData.ts", "utf8");
if (!publicData.includes("export const publicCrossOriginPaths")) {
  errors.push("Public data registry must export derived cross-origin paths.");
}
if (publicData.includes('"/api/enquiry"')) {
  errors.push("Enquiry endpoint must not be part of the public data registry.");
}

const helper = fs.readFileSync("lib/publicApi.ts", "utf8");
const helperRequirements = [
  ['"Access-Control-Allow-Origin": "*"', "read-only CORS header"],
  ['export const PUBLIC_DATA_VERSION = "1"', "public data version constant"],
  ['"X-SaunaWhisks-Data-Version": PUBLIC_DATA_VERSION', "public data version header"],
  ['"Access-Control-Expose-Headers": "X-SaunaWhisks-Data-Version"', "public data version CORS exposure"],
  ['"Cross-Origin-Resource-Policy": "cross-origin"', "public-data cross-origin resource policy"],
  ["max-age=0, s-maxage=", "CDN cache policy for public JSON"],
  ["publicCacheControl(maxAge)", "shared CDN cache policy for public text"],
  ['"Cache-Control": "no-store, max-age=0"', "no-store cache policy"],
  ['contentType = "text/plain; charset=utf-8"', "default text content type"],
  ['contentType: "text/csv; charset=utf-8"', "CSV content type"],
];

for (const [needle, label] of helperRequirements) {
  if (!helper.includes(needle)) errors.push("Public response helper missing " + label + ".");
}

const csvHelper = fs.readFileSync("lib/csv.ts", "utf8");
for (const [needle, label] of [
  ["spreadsheetFormulaPrefix", "spreadsheet formula prefix detector"],
  ["[=+\\-@]", "spreadsheet formula trigger characters"],
  ["? \"'\" + value : value", "spreadsheet formula neutralization"],
  ["safeValue.replace", "CSV quote escaping"],
]) {
  if (!csvHelper.includes(needle)) errors.push("CSV encoder missing " + label + ".");
}

const searchApi = fs.readFileSync("app/api/search/route.ts", "utf8");
if (!searchApi.includes("MAX_SEARCH_QUERY_LENGTH")) errors.push("Search API query length is not bounded.");
if (!searchApi.includes("isSiteSearchFilter")) errors.push("Search API does not use shared filter validation.");
if (!searchApi.includes("filterSiteSearchItems")) errors.push("Search API does not use shared search filtering.");
if (!searchApi.includes("normalizeSearchQuery")) errors.push("Search API does not use shared query normalization.");

const healthApi = fs.readFileSync("app/api/health/route.ts", "utf8");
for (const [needle, label] of [
  ["process.env.VERCEL_ENV", "Vercel environment metadata"],
  ["process.env.VERCEL_GIT_COMMIT_SHA", "Vercel commit metadata"],
  ["commit.slice(0, 12)", "bounded commit identifier"],
  ["deployment: deploymentInfo()", "health deployment object"],
]) {
  if (!healthApi.includes(needle)) errors.push("Health API missing " + label + ".");
}

const enquiry = fs.readFileSync("app/api/enquiry/route.ts", "utf8");
const enquiryGuards = [
  ["same-origin guard", 'headers.get("origin")'],
  ["fetch metadata guard", 'headers.get("sec-fetch-site")'],
  ["cross-site request rejection", 'fetchSite === "cross-site"'],
  ["JSON content-type guard", 'headers.get("content-type")'],
  ["exact JSON media-type parsing", 'contentType.split(";")[0]?.trim().toLowerCase()'],
  ["exact JSON media-type rejection", 'mediaType !== "application/json"'],
  ["runtime string field registry", "STRING_FIELDS"],
  ["runtime field-type rejection", "hasInvalidFieldTypes(body)"],
  ["field-type error response", 'error: "Invalid field type."'],
  ["declared body-size guard", 'headers.get("content-length")'],
  ["actual body-size guard", "TextEncoder"],
  ["same-origin page context filter", 'submittedPageUrl.startsWith(requestUrl.origin + "/")'],
  ["honeypot guard", "if (website)"],
  ["fast-submit bot guard", "Date.now() - startedAt < 1800"],
  ["outbound timeout", "AbortSignal.timeout(10_000)"],
  ["validated sender configuration", "configuredEmail(process.env.ENQUIRY_FROM_EMAIL)"],
  ["validated recipient configuration", "configuredEmail(process.env.ENQUIRY_TO_EMAIL)"],
  ["complete mail configuration guard", "if (!apiKey || !from || !to)"],
  ["request ID response header", '"X-Request-ID"'],
  ["no-store response header", '"Cache-Control": "no-store, max-age=0"'],
];

for (const [label, needle] of enquiryGuards) {
  if (!enquiry.includes(needle)) errors.push("Enquiry API missing " + label + ".");
}

if (enquiry.includes("Access-Control-Allow-Origin") || enquiry.includes("publicJson") || enquiry.includes("noStoreJson")) {
  errors.push("Enquiry POST must not inherit wildcard public-data CORS.");
}
if (enquiry.includes("const details = await response.text()")) {
  errors.push("Enquiry provider failures must not log provider response bodies.");
}

const localSmoke = fs.readFileSync("scripts/local-smoke.mjs", "utf8");
for (const [needle, label] of [
  ["verifyEnquiryResponse", "shared enquiry response assertions"],
  ["/api/enquiry GET", "GET method rejection test"],
  ["/api/enquiry non-object JSON", "non-object JSON test"],
  ["/api/enquiry invalid name", "invalid-name test"],
  ["/api/enquiry invalid email", "invalid-email test"],
  ["/api/enquiry short message", "short-message test"],
  ["/api/enquiry long message", "long-message test"],
  ["/api/enquiry oversized body", "oversized-body test"],
  ["/api/enquiry honeypot", "honeypot test"],
  ["/api/enquiry fast submit", "fast-submit test"],
  ["/api/enquiry provider fallback", "provider-fallback test"],
]) {
  if (!localSmoke.includes(needle)) errors.push("Local smoke missing " + label + ".");
}

if (errors.length) {
  console.error("API policy validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("API cache/security/interoperability validation passed.");
