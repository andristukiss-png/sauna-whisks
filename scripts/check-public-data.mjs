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
