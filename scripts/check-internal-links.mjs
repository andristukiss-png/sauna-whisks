import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const sourceFiles = ["app", "components", "lib"]
  .flatMap((dir) => walk(dir))
  .filter((file) => /\.(ts|tsx)$/.test(file));

const staticRoutes = new Set([
  "/", "/shop", "/shop/discovery-trio", "/traditions", "/journal", "/journal/topics",
  "/glossary", "/standards", "/faq", "/about", "/wholesale", "/contact", "/usa",
  "/compare", "/privacy", "/shipping", "/terms", "/returns", "/cookies", "/accessibility",
  "/suppliers", "/partners", "/learn", "/beginners", "/materials", "/care", "/markets",
  "/trade", "/search", "/operations", "/sources", "/guides", "/status", "/site-map",
  "/legal", "/conditions", "/catalog", "/claims", "/data", "/finder", "/checklist",
  "/quality", "/resources", "/help", "/templates", "/tools", "/tools/supplier-scorecard",
  "/tools/landed-cost", "/tools/trade-demand", "/tools/launch-readiness", "/use-cases",
  "/techniques", "/company", "/press", "/editorial-policy", "/corrections",
  "/suppliers/requirements", "/suppliers/sample-evaluation", "/trade/trial"
]);

const dynamicPrefixes = [
  "/shop/", "/journal/", "/markets/", "/trade/", "/operations/", "/glossary/",
  "/materials/", "/traditions/", "/guides/", "/compare/", "/faq/topic/",
  "/journal/topic/", "/conditions/", "/use-cases/", "/techniques/"
];

const allowedTechnical = [
  "/api/", "/feed.xml", "/feed.json", "/llms.txt", "/humans.txt", "/sitemap.xml", "/robots.txt"
];

const errors = [];

for (const file of sourceFiles) {
  const text = fs.readFileSync(file, "utf8");
  const matches = [
    ...text.matchAll(/href=["'](\/[^"'#?]*)/g),
    ...text.matchAll(/href:\s*["'](\/[^"'#?]*)/g),
  ];

  for (const match of matches) {
    const route = match[1].replace(/\/$/, "") || "/";
    if (route.includes("$" + "{") || route.includes("+")) continue;
    if (staticRoutes.has(route)) continue;
    if (dynamicPrefixes.some((prefix) => route.startsWith(prefix))) continue;
    if (allowedTechnical.some((prefix) => route.startsWith(prefix))) continue;
    errors.push(file + " -> unknown internal route: " + route);
  }
}

const unique = [...new Set(errors)];
if (unique.length) {
  console.error("Internal-link validation failed:");
  unique.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Internal-link validation passed.");
