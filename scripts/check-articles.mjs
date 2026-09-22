import fs from "node:fs";

const source = fs.readFileSync("lib/articles.ts", "utf8");
const slugs = [...source.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const titles = [...source.matchAll(/title:\s*"([^"]+)"/g)].map((m) => m[1]);
const readTimes = [...source.matchAll(/readTime:\s*"([^"]+)"/g)].map((m) => m[1]);
const sourceBlocks = [...source.matchAll(/sources:\s*\[([\s\S]*?)\]/g)].map((m) => m[1]);

const errors = [];

const duplicate = (values) => values.filter((value, index) => values.indexOf(value) !== index);
const duplicateSlugs = [...new Set(duplicate(slugs))];
const duplicateTitles = [...new Set(duplicate(titles))];

if (duplicateSlugs.length) errors.push("Duplicate article slugs: " + duplicateSlugs.join(", "));
if (duplicateTitles.length) errors.push("Duplicate article titles: " + duplicateTitles.join(", "));

if (readTimes.length !== slugs.length) {
  errors.push("One or more articles are missing readTime.");
}
for (const [index, readTime] of readTimes.entries()) {
  if (!/^\d+ min$/.test(readTime)) {
    errors.push("Article " + (index + 1) + " has invalid readTime: " + readTime);
  }
}

for (const [index, block] of sourceBlocks.entries()) {
  const urls = [...block.matchAll(/url:\s*"([^"]+)"/g)].map((m) => m[1]);
  const labels = [...block.matchAll(/label:\s*"([^"]+)"/g)].map((m) => m[1]);

  if (!urls.length) errors.push("Article source block " + (index + 1) + " has no source URLs.");
  if (labels.length !== urls.length) {
    errors.push("Article source block " + (index + 1) + " has mismatched labels and URLs.");
  }

  const duplicates = urls.filter((url, urlIndex) => urls.indexOf(url) !== urlIndex);
  if (duplicates.length) {
    errors.push("Article source block " + (index + 1) + " repeats source URL(s): " + [...new Set(duplicates)].join(", "));
  }

  for (const url of urls) {
    if (!url.startsWith("https://")) {
      errors.push("Article source must use HTTPS: " + url);
      continue;
    }
    try {
      const parsed = new URL(url);
      if (!parsed.hostname.includes(".")) errors.push("Article source hostname looks invalid: " + url);
    } catch {
      errors.push("Article source URL is invalid: " + url);
    }
  }

  for (const label of labels) {
    if (!label.trim()) errors.push("Article source block " + (index + 1) + " contains an empty label.");
  }
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
