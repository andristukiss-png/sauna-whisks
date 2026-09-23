import fs from "node:fs";

const registryFile = "lib/publicData.ts";
const docsFile = "docs/PUBLIC_DATA.md";
const dataPageFile = "app/data/page.tsx";
const apiIndexFile = "app/api/route.ts";

const registry = fs.readFileSync(registryFile, "utf8");
const docs = fs.readFileSync(docsFile, "utf8");
const dataPage = fs.readFileSync(dataPageFile, "utf8");
const apiIndex = fs.readFileSync(apiIndexFile, "utf8");

const paths = [...registry.matchAll(/path:\s*"([^"]+)"/g)].map((match) => match[1]);
const errors = [];

if (!paths.length) errors.push("Public data registry contains no endpoints.");

const duplicates = paths.filter((path, index) => paths.indexOf(path) !== index);
if (duplicates.length) {
  errors.push("Duplicate public data endpoint(s): " + [...new Set(duplicates)].join(", "));
}

for (const endpoint of paths) {
  if (!docs.includes(endpoint)) {
    errors.push("Public data docs missing endpoint: " + endpoint);
  }
}

if (!dataPage.includes("publicDataEndpoints.map")) {
  errors.push("/data page is not rendered from the shared endpoint registry.");
}

const publicApiHelper = fs.readFileSync("lib/publicApi.ts", "utf8");
if (!publicApiHelper.includes('export const PUBLIC_DATA_VERSION = "1"')) {
  errors.push("Public data version constant missing.");
}
if (!docs.includes("X-SaunaWhisks-Data-Version")) {
  errors.push("Public data docs missing compatibility-version header.");
}

const localSmoke = fs.readFileSync("scripts/local-smoke.mjs", "utf8");
for (const [needle, label] of [
  ["validatePublicEndpointBody", "runtime public response body validation"],
  ["validatePublicJsonUrls", "runtime public JSON URL validation"],
  ['body.includes("<rss")', "runtime RSS structure validation"],
  ['body.includes(",")', "runtime CSV delimiter validation"],
  ['body.version !== "https://jsonfeed.org/version/1.1"', "runtime JSON Feed version validation"],
]) {
  if (!localSmoke.includes(needle)) {
    errors.push("Public data smoke coverage missing " + label + ".");
  }
}

const productionSmoke = fs.readFileSync("scripts/production-smoke.mjs", "utf8");
for (const [needle, label] of [
  ['"x-saunawhisks-data-version", "1"', "live data-version header verification"],
  ["unexpectedly exposes X-Powered-By", "live powered-by suppression check"],
]) {
  if (!productionSmoke.includes(needle)) {
    errors.push("Production smoke missing " + label + ".");
  }
}

const robotsCheckStart = productionSmoke.indexOf("async function checkProductionRobots()");
const securityCheckStart = productionSmoke.indexOf("async function checkSecurityTxt()");
const redirectCheckStart = productionSmoke.indexOf("async function checkRegisteredRedirects()");
if (robotsCheckStart < 0 || securityCheckStart < 0 || redirectCheckStart < 0) {
  errors.push("Production smoke public machine-route check boundaries are missing.");
} else {
  const robotsCheck = productionSmoke.slice(robotsCheckStart, securityCheckStart);
  const securityCheck = productionSmoke.slice(securityCheckStart, redirectCheckStart);

  if (robotsCheck.includes("x-saunawhisks-data-version")) {
    errors.push("robots.txt must stay outside the public-data compatibility header contract.");
  }
  if (!securityCheck.includes("x-saunawhisks-data-version")) {
    errors.push("security.txt live check must verify the public-data compatibility header.");
  }
  if (!securityCheck.includes("access-control-allow-origin")) {
    errors.push("security.txt live check must verify public CORS.");
  }
}

if (!apiIndex.includes("publicDataEndpoints.map")) {
  errors.push("/api index is not rendered from the shared endpoint registry.");
}

const sourceRegistry = "lib/sources.ts";
if (!fs.existsSync(sourceRegistry)) {
  errors.push("Missing shared article source registry.");
} else {
  const sourceRegistryText = fs.readFileSync(sourceRegistry, "utf8");
  for (const [needle, label] of [
    ['from "@/lib/articles"', "articles import"],
    [".flatMap((article) => article.sources)", "article citation flattening"],
    [".map((source) => [source.url, source])", "URL-keyed source mapping"],
    ["new Map(", "URL deduplication"],
  ]) {
    if (!sourceRegistryText.includes(needle)) {
      errors.push("Article source registry missing " + label + ".");
    }
  }
}

for (const file of [
  "app/sources/page.tsx",
  "app/api/sources/route.ts",
  "app/api/sources.csv/route.ts",
]) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes('from "@/lib/sources"')) {
    errors.push("Source surface is not using the shared article source registry: " + file);
  }
}

const required = [
  "/api",
  "/api/health",
  "/api/status",
  "/api/catalog",
  "/api/search?q=birch",
  "/feed.xml",
  "/feed.json",
  "/llms.txt",
  "/humans.txt",
  "/.well-known/security.txt",
  "/sitemap.xml",
  "/robots.txt",
];

for (const endpoint of required) {
  if (!paths.includes(endpoint)) errors.push("Public data registry missing required endpoint: " + endpoint);
}

function sourceFor(endpoint) {
  const path = endpoint.split("?")[0];
  if (path === "/sitemap.xml") return "app/sitemap.ts";
  if (path === "/robots.txt") return "app/robots.ts";
  if (path.startsWith("/api")) return "app" + path + "/route.ts";
  return "app" + path + "/route.ts";
}

for (const endpoint of paths) {
  const source = sourceFor(endpoint);
  if (!fs.existsSync(source)) {
    errors.push("Public data endpoint has no route source: " + endpoint + " -> " + source);
  }
}

if (errors.length) {
  console.error("Public data validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Public data validation passed for " + paths.length + " endpoints.");
