import fs from "node:fs";

const required = [
  "README.md",
  "SECURITY.md",
  "CONTRIBUTING.md",
  "CHANGELOG.md",
  "docs/LAUNCH_CHECKLIST.md",
  "docs/SUPPLIER_SCORECARD.md",
  "docs/PRODUCT_DATA.md",
  "docs/BRAND_VOICE.md",
  "docs/STRATEGY.md",
  "docs/US_MARKET_RESEARCH.md",
  "docs/SEO_MAP.md",
  "docs/EMAIL_SETUP.md",
  "docs/DEPLOYMENT.md",
  "docs/PRODUCTION_DIAGNOSTICS.md",
  "docs/ANALYTICS_PLAN.md",
  "docs/CONTENT_GUIDE.md",
  "docs/CLAIMS_POLICY.md",
  "docs/RELEASE_PROCESS.md",
  "docs/RECOVERY.md",
  "docs/INCIDENT_RESPONSE.md",
  "docs/SUPPLIER_ONBOARDING.md",
  "docs/TRADE_TRIAL.md",
  "docs/PRICING_MODEL.md",
  "docs/PACKAGING_BRIEF.md",
  "docs/IMPORT_CHECKLIST.md",
  "docs/QA_CHECKLIST.md",
  "docs/CONTENT_RELEASE_CHECKLIST.md",
  "docs/SITE_ARCHITECTURE.md"
];

const missing = required.filter((file) => !fs.existsSync(file));
if (missing.length) {
  console.error("Documentation validation failed:");
  missing.forEach((file) => console.error("- Missing: " + file));
  process.exit(1);
}
console.log("Documentation validation passed.");
