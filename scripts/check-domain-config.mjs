import fs from "node:fs";

const site = JSON.parse(fs.readFileSync("config/site.json", "utf8"));
const canonical = site.origin;

const files = {
  "next.config.ts": fs.readFileSync("next.config.ts", "utf8"),
  "app/layout.tsx": fs.readFileSync("app/layout.tsx", "utf8"),
  "app/robots.ts": fs.readFileSync("app/robots.ts", "utf8"),
  "app/sitemap.ts": fs.readFileSync("app/sitemap.ts", "utf8"),
  "lib/metadata.ts": fs.readFileSync("lib/metadata.ts", "utf8"),
};

const checks = [
  ["site origin is HTTPS", canonical.startsWith("https://")],
  ["site host matches origin", new URL(canonical).hostname === site.host],
  ["www host is distinct", site.wwwHost === "www." + site.host],
  ["public email belongs to site domain", site.publicEmail.toLowerCase().endsWith("@" + site.host)],
  ["next config imports site config", files["next.config.ts"].includes('import site from "./config/site.json"')],
  ["next config uses configured www host", files["next.config.ts"].includes("value: site.wwwHost")],
  ["www redirect targets configured canonical origin", files["next.config.ts"].includes("destination: `${site.origin}/:path*`")],
  ["www redirect is permanent", files["next.config.ts"].includes("permanent: true")],
  ["layout imports site config", files["app/layout.tsx"].includes('import site from "@/config/site.json"')],
  ["metadataBase uses configured origin", files["app/layout.tsx"].includes("metadataBase: new URL(site.origin)")],
  ["robots uses configured origin", files["app/robots.ts"].includes("sitemap: `${site.origin}/sitemap.xml`") && files["app/robots.ts"].includes("host: site.origin")],
  ["sitemap uses configured origin", files["app/sitemap.ts"].includes("const base = site.origin")],
  ["shared metadata uses configured site name", files["lib/metadata.ts"].includes("siteName: site.name")],
];

const machineFiles = [
  "next.config.ts",
  "app/layout.tsx",
  "app/robots.ts",
  "app/sitemap.ts",
  "app/feed.xml/route.ts",
  "app/feed.json/route.ts",
  "app/llms.txt/route.ts",
  "app/humans.txt/route.ts",
  "app/.well-known/security.txt/route.ts",
  "components/Breadcrumbs.tsx",
  "lib/metadata.ts",
  "lib/status.ts",
  "app/api/health/route.ts",
  "app/api/company/route.ts",
  "app/api/articles/route.ts",
  "app/api/catalog/route.ts",
  "app/api/comparisons/route.ts",
  "app/api/conditions/route.ts",
  "app/api/editorial/route.ts",
  "app/api/faq/route.ts",
  "app/api/glossary/route.ts",
  "app/api/guides/route.ts",
  "app/api/markets/route.ts",
  "app/api/materials/route.ts",
  "app/api/operations/route.ts",
  "app/api/techniques/route.ts",
  "app/api/tools/route.ts",
  "app/api/trade/route.ts",
  "app/api/traditions/route.ts",
  "app/api/use-cases/route.ts",
];

for (const file of machineFiles) {
  const text = fs.readFileSync(file, "utf8");
  if (file !== "config/site.json" && text.includes(site.origin)) {
    checks.push(["machine file hard-codes canonical origin: " + file, false]);
  }
  if (
    file !== "config/site.json" &&
    !file.endsWith("check-domain-config.mjs") &&
    text.includes(site.publicEmail)
  ) {
    checks.push(["machine file hard-codes public email: " + file, false]);
  }
}

const failures = checks.filter(([, ok]) => !ok);

if (failures.length) {
  console.error("Domain configuration validation failed:");
  for (const [label] of failures) console.error("- " + label);
  process.exit(1);
}

console.log("Domain configuration validation passed.");
