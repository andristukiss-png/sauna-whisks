import fs from "node:fs";

const nextConfig = fs.readFileSync("next.config.ts", "utf8");
const redirects = JSON.parse(fs.readFileSync("config/redirects.json", "utf8"));
const errors = [];

const requiredStrategyRedirects = new Map([
  ["/birch-sauna-whisk", "/shop/baltic-birch"],
  ["/oak-sauna-whisk", "/shop/baltic-oak"],
  ["/eucalyptus-sauna-whisk", "/shop/eucalyptus"],
  ["/sauna-whisk-sets", "/shop/discovery-trio"],
  ["/what-is-a-sauna-whisk", "/journal/what-is-a-sauna-whisk"],
  ["/how-to-use-a-sauna-whisk", "/journal/how-to-use-a-sauna-whisk"],
  ["/how-to-soak-a-sauna-whisk", "/journal/how-to-prepare-dried-sauna-whisk"],
  ["/sauna-whisk-vs-sauna-broom", "/journal/sauna-whisk-vs-sauna-broom"],
  ["/venik-guide", "/journal/venik-vihta-vasta"],
  ["/vihta-vs-vasta", "/journal/venik-vihta-vasta"],
  ["/birch-vs-oak-sauna-whisk", "/journal/birch-vs-oak-sauna-whisk"],
]);


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

for (const [source, destination] of requiredStrategyRedirects) {
  const configured = redirects.find((item) => item?.source === source)?.destination;
  if (configured !== destination) {
    errors.push("Missing or incorrect strategy redirect: " + source + " -> " + destination);
  }
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

const productionSmoke = fs.readFileSync("scripts/production-smoke.mjs", "utf8");
for (const [needle, label] of [
  ["checkWwwRedirect", "www path/query redirect helper"],
  ['"/api/health?redirect_probe=1"', "www path/query preservation probe"],
  ['"/api/health", "?redirect_probe=1"', "www expected path/query assertion"],
]) {
  if (!productionSmoke.includes(needle)) {
    errors.push("Production smoke missing " + label + ".");
  }
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
