import fs from "node:fs";

const nextConfig = fs.readFileSync("next.config.ts", "utf8");
const redirects = JSON.parse(fs.readFileSync("config/redirects.json", "utf8"));
const errors = [];

if (!Array.isArray(redirects) || redirects.length === 0) {
  errors.push("Redirect registry must be a non-empty array.");
}

const seen = new Set();
for (const item of redirects) {
  const source = item?.source;
  const destination = item?.destination;

  if (
    typeof source !== "string" ||
    !source.startsWith("/") ||
    source.startsWith("//")
  ) {
    errors.push("Redirect source must be a local absolute path: " + String(source));
    continue;
  }
  if (
    typeof destination !== "string" ||
    !destination.startsWith("/") ||
    destination.startsWith("//")
  ) {
    errors.push("Redirect destination must be a local absolute path: " + String(destination));
  }
  if (source === destination) {
    errors.push("Redirect must not point to itself: " + source);
  }
  if (seen.has(source)) {
    errors.push("Duplicate redirect source: " + source);
  }
  seen.add(source);
}

const destinations = new Map(
  redirects
    .filter((item) => typeof item?.source === "string" && typeof item?.destination === "string")
    .map((item) => [item.source, item.destination])
);

for (const [source, destination] of destinations) {
  if (destinations.has(destination)) {
    errors.push(
      "Redirect chains are not allowed: " +
        source +
        " -> " +
        destination +
        " -> " +
        destinations.get(destination)
    );
  }
}

if (!nextConfig.includes('import legacyRedirects from "./config/redirects.json"')) {
  errors.push("Next config must import the shared redirect registry.");
}
if (!nextConfig.includes("...legacyRedirects.map(({ source, destination })")) {
  errors.push("Next config must generate permanent redirects from the shared registry.");
}

for (const smokeFile of ["scripts/local-smoke.mjs", "scripts/production-smoke.mjs"]) {
  const smoke = fs.readFileSync(smokeFile, "utf8");
  if (!smoke.includes('config/redirects.json')) {
    errors.push(smokeFile + " must load the shared redirect registry.");
  }
  if (!smoke.includes("for (const { source, destination } of redirects)")) {
    errors.push(smokeFile + " must execute every registered redirect.");
  }
}

if (errors.length) {
  console.error("Redirect validation failed:");
  errors.forEach((item) => console.error("- " + item));
  process.exit(1);
}

console.log("Redirect validation passed for " + redirects.length + " redirects.");
