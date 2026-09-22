import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredFiles = [
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

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name === ".git") return [];
    if (entry.isDirectory()) return walk(absolute);
    return [absolute];
  });

const sourceFiles = walk(root).filter((file) => /\.(ts|tsx|md|mjs)$/.test(file));
const joined = sourceFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");

for (const obsolete of ["hello@saunawhisks.com", "trade@saunawhisks.com"]) {
  if (joined.toLowerCase().includes(obsolete)) {
    errors.push(`Obsolete public email found: ${obsolete}`);
  }
}

if (!joined.includes("info@SaunaWhisks.com")) {
  errors.push("Primary contact email is missing.");
}

if (!joined.includes("Commercial launch gates")) {
  errors.push("README launch-gate documentation is missing.");
}

if (errors.length) {
  console.error("\nContent validation failed:\n");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Content validation passed.");
