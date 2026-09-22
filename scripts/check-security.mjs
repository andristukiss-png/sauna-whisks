import fs from "node:fs";

const next = fs.readFileSync("next.config.ts", "utf8");
const security = fs.readFileSync("app/.well-known/security.txt/route.ts", "utf8");

const headers = [
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Permissions-Policy",
  "Cross-Origin-Opener-Policy",
  "Strict-Transport-Security",
  "Cross-Origin-Resource-Policy",
  "X-Permitted-Cross-Domain-Policies",
  "X-Robots-Tag"
];

const errors = [];
headers.forEach((header) => {
  if (!next.includes(header)) errors.push("Missing security header: " + header);
});

const requiredSecurityTxt = [
  "Contact: mailto:info@SaunaWhisks.com",
  "Canonical: https://saunawhisks.com/.well-known/security.txt",
  "Preferred-Languages: en",
  "Expires:"
];
for (const value of requiredSecurityTxt) {
  if (!security.includes(value)) errors.push("security.txt missing: " + value);
}

const expires = security.match(/Expires:\s*([^"\\n]+)/)?.[1]?.trim();
if (!expires || Number.isNaN(Date.parse(expires))) {
  errors.push("security.txt has no valid Expires timestamp.");
} else if (Date.parse(expires) < Date.now() + 30 * 24 * 60 * 60 * 1000) {
  errors.push("security.txt Expires timestamp is less than 30 days away.");
}

if (!security.includes('"Content-Type": "text/plain; charset=utf-8"')) {
  errors.push("security.txt must be served as text/plain UTF-8.");
}

if (errors.length) {
  console.error("Security validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}
console.log("Security validation passed.");
