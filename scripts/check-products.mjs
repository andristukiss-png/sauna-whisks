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
}

if (!source.includes('slug: "baltic-oak"')) errors.push("Baltic Oak product is missing.");
if (source.includes("Latvian Oak")) errors.push("Unverified Latvian Oak naming reintroduced.");

if (errors.length) {
  console.error("Product validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Product validation passed.");
