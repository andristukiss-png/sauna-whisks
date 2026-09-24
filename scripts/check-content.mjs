import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const site = JSON.parse(fs.readFileSync(path.join(root, "config/site.json"), "utf8"));

const requiredFiles = [
  "config/site.json",
  "app/page.tsx",
  "app/shop/page.tsx",
  "app/journal/page.tsx",
  "app/contact/page.tsx",
  "app/privacy/page.tsx",
  "app/terms/page.tsx",
  "app/sitemap.ts",
  "app/robots.ts",
  "lib/products.ts",
  "lib/articles.ts",
];

const errors = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) {
    errors.push(`Missing required file: ${file}`);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

// Only scan user-facing/application source. Do not scan validators themselves,
// because the forbidden strings necessarily appear inside their own rules.
const publicRoots = ["app", "components", "lib"];
const sourceFiles = publicRoots
  .flatMap((dir) => walk(path.join(root, dir)))
  .filter((file) => /\.(ts|tsx|md)$/.test(file));

const joined = sourceFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
const lowered = joined.toLowerCase();

for (const obsolete of ["hello@saunawhisks.com", "trade@saunawhisks.com"]) {
  if (lowered.includes(obsolete)) {
    errors.push(`Obsolete public email found: ${obsolete}`);
  }
}

if (!joined.includes(site.publicEmail)) {
  errors.push("Primary contact email is missing from public application content.");
}


const claimChecks = [
  ["app/page.tsx", "clear origins", "Homepage must not imply launch-SKU origins are already verified."],
  ["app/shop/page.tsx", "built around material, origin and ritual character", "Shop must not imply launch-SKU origins are already verified."],
  ["app/usa/page.tsx", "Baltic sauna whisks for the US.", "US page must not imply Baltic product origin before SKU verification."],
  ["app/usa/page.tsx", "preparing a US launch for Baltic sauna whisks", "US metadata must not imply Baltic product origin before SKU verification."],
  ["lib/markets.ts", "Baltic sauna whisks for the US market.", "US market data must not imply Baltic product origin before SKU verification."],
];

for (const [file, forbidden, message] of claimChecks) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  if (source.includes(forbidden)) errors.push(message);
}

const readmePath = path.join(root, "README.md");
const readme = fs.existsSync(readmePath) ? fs.readFileSync(readmePath, "utf8") : "";
if (!readme.includes("Commercial launch gates")) {
  errors.push("README launch-gate documentation is missing.");
}

if (errors.length) {
  console.error("\nContent validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Content validation passed.");
