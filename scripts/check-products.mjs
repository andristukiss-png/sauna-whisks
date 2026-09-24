import fs from "node:fs";

const source = fs.readFileSync("lib/products.ts", "utf8");
const errors = [];

const requiredFields = [
  "slug",
  "name",
  "latin",
  "material",
  "origin",
  "character",
  "description",
  "plannedPrice",
  "status",
  "plannedCondition",
  "verification",
  "availableForPurchase",
];

const blocks = source.split(/\n\s*\{\n/).slice(1);

for (const [index, block] of blocks.entries()) {
  if (!block.includes("plannedPrice:")) continue;
  for (const field of requiredFields) {
    if (!block.includes(field + ":")) {
      errors.push("Product block " + (index + 1) + " missing field: " + field);
    }
  }
  if (!block.includes('status: "Pre-launch"')) {
    errors.push("Product block " + (index + 1) + " must remain Pre-launch.");
  }
  if (!block.includes("availableForPurchase: false")) {
    errors.push("Product block " + (index + 1) + " must remain unavailable before launch.");
  }
  const name = block.match(/name:\s*"([^"]+)"/)?.[1] || "";
  const origin = block.match(/origin:\s*"([^"]+)"/)?.[1] || "";
  const verification = block.match(/verification:\s*"([^"]+)"/)?.[1] || "";
  if (/origin pending/i.test(verification) && origin !== "Origin to be verified") {
    errors.push(
      "Product block " + (index + 1) +
      " must keep the public origin neutral until origin verification is complete."
    );
  }
  if (!name.endsWith("Sauna Whisk")) {
    errors.push("Product block " + (index + 1) + " must use Sauna Whisk in the customer-facing product name.");
  }
  if (/\b(?:Latvian|Baltic)\b/.test(name) && /(origin pending|origin to be confirmed)/i.test(block)) {
    errors.push("Product block " + (index + 1) + " must not put an unverified geographic origin in the product name.");
  }
}

const bundle = fs.readFileSync("lib/bundles.ts", "utf8");
for (const [needle, label] of [
  ['slug: "discovery-trio"', "Discovery Trio slug"],
  ['plannedPrice: "US$69"', "Discovery Trio planned price"],
  ['status: "Pre-launch"', "Discovery Trio pre-launch status"],
  ["availableForPurchase: false", "Discovery Trio purchase gate"],
  ['"baltic-birch"', "Discovery Trio birch reference"],
  ['"baltic-oak"', "Discovery Trio oak reference"],
  ['"eucalyptus"', "Discovery Trio eucalyptus reference"],
]) {
  if (!bundle.includes(needle)) errors.push("Bundle catalog missing " + label + ".");
}

for (const file of [
  "app/page.tsx",
  "app/shop/page.tsx",
  "app/shop/discovery-trio/page.tsx",
  "app/api/catalog/route.ts",
]) {
  const text = fs.readFileSync(file, "utf8");
  if (!text.includes("@/lib/bundles")) {
    errors.push(file + " must use shared Discovery Trio data.");
  }
}
if (fs.readFileSync("app/api/catalog/route.ts", "utf8").includes('plannedPrice: "$69"')) {
  errors.push("Catalog API reintroduced a conflicting Discovery Trio price.");
}

if (!source.includes('slug: "baltic-oak"')) errors.push("Stable oak product slug is missing.");
if (source.includes("Latvian Oak")) errors.push("Unverified Latvian Oak naming reintroduced.");

if (errors.length) {
  console.error("Product validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Product validation passed.");
