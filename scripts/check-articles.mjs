import fs from "node:fs";

const source = fs.readFileSync("lib/articles.ts", "utf8");
const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const titles = [...source.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
const sourceBlocks = [...source.matchAll(/sources:\s*\[([\s\S]*?)\]/g)].map((m) => m[1]);

const errors = [];

const duplicate = (values) => values.filter((value, index) => values.indexOf(value) !== index);
const duplicateSlugs = [...new Set(duplicate(slugs))];
const duplicateTitles = [...new Set(duplicate(titles))];

if (duplicateSlugs.length) errors.push("Duplicate article slugs: " + duplicateSlugs.join(", "));
if (duplicateTitles.length) errors.push("Duplicate article titles: " + duplicateTitles.join(", "));

for (const [index, block] of sourceBlocks.entries()) {
  if (!/https:\/\//.test(block)) errors.push("Article source block " + (index + 1) + " has no HTTPS source.");
}

if (sourceBlocks.length < slugs.length) {
  errors.push("One or more articles appear to be missing a sources block.");
}

if (errors.length) {
  console.error("Article validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Article validation passed for " + slugs.length + " articles.");
