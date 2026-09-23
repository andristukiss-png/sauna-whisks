import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const ignored = new Set(["node_modules", ".next", ".git", "docs", "scripts"]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (ignored.has(entry.name)) return [];
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const files = walk(root).filter((file) => /\.(ts|tsx|js|jsx)$/.test(file) && !file.endsWith("next.config.ts"));
const source = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");

const forbidden = [
  ["availableForPurchase: true", "A product was marked purchasable before launch."],
  ["Add to cart", "Cart CTA introduced before launch."],
  ["Buy now", "Purchase CTA introduced before launch."],
  ["checkoutUrl", "Checkout URL introduced before launch."],
];

const errors = forbidden
  .filter(([needle]) => source.includes(needle))
  .map(([, message]) => message);

if (source.includes('"offers"') || source.includes("offers: {")) {
  errors.push("Product offer schema introduced before commercial launch.");
}

if (source.includes("Latvian Oak") || source.includes("/shop/latvian-oak")) {
  errors.push("Unverified Latvian Oak naming/URL reintroduced. Use Baltic Oak; old URL exists only as redirect.");
}

const launchChecklist = fs.readFileSync(path.join(root, "docs/LAUNCH_CHECKLIST.md"), "utf8");
if (!launchChecklist.includes("Durable enquiry rate limiting")) {
  errors.push("Launch checklist must require durable enquiry rate limiting before direct email launch.");
}

if (errors.length) {
  console.error("Pre-launch guard failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Pre-launch guard passed.");
