import fs from "node:fs";

const site = JSON.parse(fs.readFileSync("config/site.json", "utf8"));

const file = ".env.example";
if (!fs.existsSync(file)) {
  console.error("Environment validation failed: .env.example missing.");
  process.exit(1);
}

const text = fs.readFileSync(file, "utf8");
const required = ["RESEND_API_KEY=", "ENQUIRY_TO_EMAIL=", "ENQUIRY_FROM_EMAIL="];
const missing = required.filter((key) => !text.includes(key));

if (missing.length) {
  console.error("Environment validation failed:");
  missing.forEach((key) => console.error("- Missing key: " + key));
  process.exit(1);
}

const toLine = text.match(/^ENQUIRY_TO_EMAIL=(.*)$/m)?.[1]?.trim() || "";
if (toLine !== site.publicEmail) {
  console.error("Environment validation failed: ENQUIRY_TO_EMAIL must match config/site.json.");
  process.exit(1);
}

if (text.includes("onboarding@resend.dev")) {
  console.error("Environment validation failed: onboarding sender must not be the documented production default.");
  process.exit(1);
}

const fromLine = text.match(/^ENQUIRY_FROM_EMAIL=(.*)$/m)?.[1]?.trim() || "";
if (fromLine) {
  console.error("Environment validation failed: ENQUIRY_FROM_EMAIL should stay blank in the template until the sending domain is verified.");
  process.exit(1);
}

console.log("Environment template validation passed.");
