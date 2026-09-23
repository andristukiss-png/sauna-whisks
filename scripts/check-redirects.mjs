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

  if (typeof source !== "string" || !source.startsWith("/")) {
    errors.push("Redirect source must be a local absolute path: " + String(source));
    continue;
  }
  if (typeof destination !== "string" || !destination.startsWith("/")) {
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

if (!nextConfig.includes('import legacyRedirects from "./config/redirects.json"')) {
  errors.push("Next config must import the shared redirect registry.");
}
if (!nextConfig.includes("...legacyRedirects.map(({ source, destination })")) {
  errors.push("Next config must generate permanent redirects from the shared registry.");
}

if (errors.length) {
  console.error("Redirect validation failed:");
  errors.forEach((item) => console.error("- " + item));
  process.exit(1);
}

console.log("Redirect validation passed for " + redirects.length + " redirects.");
