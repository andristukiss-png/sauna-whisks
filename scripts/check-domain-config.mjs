import fs from "node:fs";

const canonical = "https://saunawhisks.com";

const files = {
  "next.config.ts": fs.readFileSync("next.config.ts", "utf8"),
  "app/layout.tsx": fs.readFileSync("app/layout.tsx", "utf8"),
  "app/robots.ts": fs.readFileSync("app/robots.ts", "utf8"),
  "app/sitemap.ts": fs.readFileSync("app/sitemap.ts", "utf8"),
};

const checks = [
  ["www host redirect is configured", files["next.config.ts"].includes('value: "www.saunawhisks.com"')],
  ["www redirect targets canonical HTTPS host", files["next.config.ts"].includes(`destination: "${canonical}/:path*"`)],
  ["www redirect is permanent", files["next.config.ts"].includes("permanent: true")],
  ["metadataBase uses canonical host", files["app/layout.tsx"].includes(`metadataBase: new URL("${canonical}")`)],
  ["Open Graph URL uses canonical host", files["app/layout.tsx"].includes(`url: "${canonical}"`)],
  ["robots sitemap uses canonical host", files["app/robots.ts"].includes(`sitemap: "${canonical}/sitemap.xml"`)],
  ["robots host uses canonical host", files["app/robots.ts"].includes(`host: "${canonical}"`)],
  ["sitemap base uses canonical host", files["app/sitemap.ts"].includes(`const base = "${canonical}"`)],
];

const failures = checks.filter(([, ok]) => !ok);

if (failures.length) {
  console.error("Domain configuration validation failed:");
  for (const [label] of failures) console.error("- " + label);
  process.exit(1);
}

console.log("Domain configuration validation passed.");
