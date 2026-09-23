import fs from "node:fs";

const statusData = fs.readFileSync("lib/status.ts", "utf8");
if (!statusData.includes('import site from "@/config/site.json"')) {
  console.error("Launch status validation failed:\n- Shared launch status must import site config.");
  process.exit(1);
}
const page = fs.readFileSync("app/status/page.tsx", "utf8");
const api = fs.readFileSync("app/api/status/route.ts", "utf8");
const prelaunch = fs.readFileSync("scripts/check-prelaunch.mjs", "utf8");

const errors = [];

const required = [
  'status: "pre-launch"',
  "checkoutEnabled: false",
  "enquiriesOpen: true",
  "contact: site.publicEmail",
  'area: "Payments"',
  'status: "Disabled"',
];

for (const needle of required) {
  if (!statusData.includes(needle)) errors.push("Shared launch status missing: " + needle);
}

if (!page.includes("launchStatus.items.map")) {
  errors.push("Status page is not rendered from shared launch status data.");
}

for (const file of [
  "app/api/health/route.ts",
  "app/api/catalog/route.ts",
  "app/api/route.ts",
  "app/api/company/route.ts",
]) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes('import { launchStatus } from "@/lib/status"')) {
    errors.push(file + " must import shared launch status.");
  }
  if (!text.includes("launchStatus.status")) {
    errors.push(file + " must use shared launch status value.");
  }
}

if (!api.includes("noStoreJson(launchStatus)")) {
  errors.push("Status API is not served from shared launch status data.");
}

if (!prelaunch.includes("availableForPurchase: true")) {
  errors.push("Pre-launch guard no longer protects purchasability.");
}

if (errors.length) {
  console.error("Launch status validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Launch status validation passed.");
