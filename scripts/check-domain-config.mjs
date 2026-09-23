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


const monitorFile = ".github/workflows/production-monitor.yml";
if (!fs.existsSync(monitorFile)) {
  console.error("Domain configuration validation failed:");
  console.error("- production monitor workflow is missing");
  process.exit(1);
}

const monitor = fs.readFileSync(monitorFile, "utf8");
const monitorChecks = [
  ["monitor runs production smoke script", monitor.includes("node scripts/production-smoke.mjs")],
  ["monitor has scheduled cadence", monitor.includes('cron: "17 */6 * * *"')],
  ["monitor supports manual dispatch", monitor.includes("workflow_dispatch:")],
  ["monitor has a five-minute timeout", monitor.includes("timeout-minutes: 5")],
  ["monitor disables persisted checkout credentials", monitor.includes("persist-credentials: false")],
];

const monitorFailures = monitorChecks.filter(([, ok]) => !ok);
if (monitorFailures.length) {
  console.error("Domain configuration validation failed:");
  for (const [label] of monitorFailures) console.error("- " + label);
  process.exit(1);
}

console.log("Domain configuration validation passed.");
