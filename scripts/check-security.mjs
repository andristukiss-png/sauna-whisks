import fs from "node:fs";

const next = fs.readFileSync("next.config.ts", "utf8");
const security = fs.readFileSync("app/.well-known/security.txt/route.ts", "utf8");

const headers = [
  "Content-Security-Policy",
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


const cspDirectives = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "connect-src 'self'",
  "upgrade-insecure-requests",
];

for (const directive of cspDirectives) {
  if (!next.includes(directive)) errors.push("Content Security Policy missing directive: " + directive);
}
if (!next.includes("script-src 'self' 'unsafe-inline'")) {
  errors.push("CSP must explicitly allow the Next.js inline bootstrap scripts.");
}

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

const publicApi = fs.readFileSync("lib/publicApi.ts", "utf8");
if (!security.includes("publicText")) {
  errors.push("security.txt must use the shared public text response helper.");
}
if (!publicApi.includes('contentType = "text/plain; charset=utf-8"')) {
  errors.push("Shared public text helper must default to text/plain UTF-8.");
}


function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = dir + "/" + entry.name;
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const renderFiles = ["app", "components"]
  .flatMap((dir) => walk(dir))
  .filter((file) => /\.(ts|tsx)$/.test(file));

for (const file of renderFiles) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes("dangerouslySetInnerHTML")) continue;

  if (!text.includes('type="application/ld+json"')) {
    errors.push("dangerouslySetInnerHTML used outside JSON-LD: " + file);
  }
  if (!text.includes("JSON.stringify(")) {
    errors.push("JSON-LD must serialize structured data with JSON.stringify: " + file);
  }
  if (!text.includes('.replace(/</g')) {
    errors.push("JSON-LD must escape < characters before injection: " + file);
  }
}

if (errors.length) {
  console.error("Security validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}
console.log("Security validation passed.");
