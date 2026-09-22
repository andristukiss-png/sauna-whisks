import fs from "node:fs";

const next = fs.readFileSync("next.config.ts", "utf8");
const security = fs.readFileSync("app/.well-known/security.txt/route.ts", "utf8");

const headers = [
  "X-Content-Type-Options",
  "X-Frame-Options",
  "Referrer-Policy",
  "Permissions-Policy",
  "Strict-Transport-Security",
  "Cross-Origin-Resource-Policy",
  "X-Permitted-Cross-Domain-Policies",
  "X-Robots-Tag"
];

const errors = [];
headers.forEach((header) => {
  if (!next.includes(header)) errors.push("Missing security header: " + header);
});

if (!security.includes("info@SaunaWhisks.com")) {
  errors.push("security.txt missing primary contact.");
}

if (errors.length) {
  console.error("Security validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}
console.log("Security validation passed.");
