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
  "app/api/use-cases/route.ts",
  "app/api/techniques/route.ts",
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

if (errors.length) {
  console.error("API policy validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}
console.log("API cache-policy validation passed.");
