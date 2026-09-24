import fs from "node:fs";
import { discoverApiRoutes } from "./api-route-utils.mjs";
import { discoverMachineRoutes } from "./machine-route-utils.mjs";

const errors = [];

const privateApiPaths = new Set(["/api/enquiry"]);
const noStoreApiPaths = new Set(["/api/search", "/api/status", "/api/health"]);

for (const { file, path } of discoverApiRoutes()) {
  const text = fs.readFileSync(file, "utf8");

  if (privateApiPaths.has(path)) {
    if (!/export\s+async\s+function\s+POST\b|export\s+function\s+POST\b/.test(text)) {
      errors.push("Private enquiry API must export POST: " + file);
    }
    if (/export\s+(?:async\s+)?function\s+GET\b/.test(text)) {
      errors.push("Private enquiry API must not export GET: " + file);
    }
    continue;
  }

  if (!/export\s+(?:async\s+)?function\s+GET\b/.test(text)) {
    errors.push("Public API route must export GET: " + file);
  }

  if (path.endsWith(".csv")) {
    if (!text.includes("publicCsv")) errors.push("Public CSV missing shared response helper: " + file);
    if (!text.includes("encodeCsv")) errors.push("Public CSV missing shared encoder: " + file);
  } else if (noStoreApiPaths.has(path)) {
    if (!text.includes("noStoreJson")) errors.push("Dynamic API missing no-store helper: " + file);
  } else if (!text.includes("publicJson")) {
    errors.push("Public API missing cache helper: " + file);
  }
}

for (const { file, path } of discoverMachineRoutes()) {
  const text = fs.readFileSync(file, "utf8");
  if (!/export\s+(?:async\s+)?function\s+GET\b/.test(text)) {
    errors.push("Machine route must export GET: " + file);
  }

  if (path.endsWith(".json")) {
    if (!text.includes("publicJson")) {
      errors.push("JSON machine route missing shared public JSON response helper: " + file);
    }
  } else if (!text.includes("publicText")) {
    errors.push("Public text/feed route missing shared response helper: " + file);
  }
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
  ["node: process.version", "health Node runtime metadata"],
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
  ["bounded streaming body reader", "readTextBodyWithLimit(request, MAX_BODY_BYTES)"],
  ["stream reader", "request.body.getReader()"],
  ["stream byte accounting", "totalBytes += value.byteLength"],
  ["oversize stream error", "RequestTooLargeError"],
  ["same-origin page context filter", 'submittedPageUrl.startsWith(requestUrl.origin + "/")'],
  ["honeypot guard", "if (website)"],
  ["fast-submit bot guard", "Number.isFinite(elapsedMs) && elapsedMs > 0 && elapsedMs < 1800"],
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
if (enquiry.includes("await request.text()")) {
  errors.push("Enquiry request bodies must be size-limited while streaming, not buffered with request.text().");
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
  ["/api/enquiry chunked oversized body", "chunked oversized-body test"],
  ['duplex: "half"', "streaming request transport test"],
  ["/api/enquiry honeypot", "honeypot test"],
  ["/api/enquiry fast submit", "fast-submit test"],
  ["/api/enquiry provider fallback", "provider-fallback test"],
  ["/api/enquiry negative elapsed duration", "negative elapsed-duration regression test"],
]) {
  if (!localSmoke.includes(needle)) errors.push("Local smoke missing " + label + ".");
}

if (errors.length) {
  console.error("API policy validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("API cache/security/interoperability validation passed.");
