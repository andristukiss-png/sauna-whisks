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

if (!apiIndex.includes("publicDataEndpoints.map")) {
  errors.push("/api index is not rendered from the shared endpoint registry.");
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
