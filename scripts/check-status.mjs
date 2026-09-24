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
  "app/api/markets/route.ts",
  "app/api/trade/route.ts",
  "components/Header.tsx",
  "app/press/page.tsx",
  "lib/faqTopics.ts",
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

const header = fs.readFileSync("components/Header.tsx", "utf8");
for (const field of ["launchStatus.status", "launchStatus.enquiriesOpen", "launchStatus.checkoutEnabled"]) {
  if (!header.includes(field)) errors.push("Header must render shared " + field + ".");
}
const press = fs.readFileSync("app/press/page.tsx", "utf8");
if (!press.includes("launchStatus.checkoutEnabled")) {
  errors.push("Press facts must render checkout state from shared launch status.");
}
const faqTopics = fs.readFileSync("lib/faqTopics.ts", "utf8");
if (!faqTopics.includes("launchStatus.checkoutEnabled")) {
  errors.push("FAQ order availability must derive from shared launch status.");
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
