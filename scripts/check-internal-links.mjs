import fs from "node:fs";
import path from "node:path";
import { discoverDynamicRoutePrefixes, discoverStaticPageRoutes } from "./route-utils.mjs";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const sourceFiles = ["app", "components", "lib"]
  .flatMap((dir) => walk(dir))
  .filter((file) => /\.(ts|tsx)$/.test(file));

const staticRoutes = new Set(discoverStaticPageRoutes());
const dynamicPrefixes = discoverDynamicRoutePrefixes();

const publicDataSource = fs.readFileSync("lib/publicData.ts", "utf8");
const allowedTechnical = new Set(
  [...publicDataSource.matchAll(/path:\s*"([^"]+)"/g)].map((match) =>
    (match[1].split("?")[0].replace(/\/$/, "") || "/")
  )
);
allowedTechnical.add("/manifest.webmanifest");
allowedTechnical.add("/api/enquiry");

const errors = [];
const localSmoke = fs.readFileSync("scripts/local-smoke.mjs", "utf8");
for (const [needle, label] of [
  ["collectInternalLinks", "rendered internal-link collection"],
  ["verifyRenderedInternalLinks", "rendered internal-link verification"],
  ["internal link must resolve directly with 2xx", "direct-success link policy"],
]) {
  if (!localSmoke.includes(needle)) {
    errors.push("Local smoke missing " + label + ".");
  }
}


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
    if (allowedTechnical.has(route)) continue;
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
