import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const pages = walk("app").filter((file) => file.endsWith("page.tsx"));
const errors = [];

for (const file of pages) {
  const text = fs.readFileSync(file, "utf8");
  const isHome = file === path.join("app", "page.tsx");

  if (isHome) continue;

  const hasStaticMetadata = text.includes("export const metadata");
  const hasDynamicMetadata = text.includes("generateMetadata");

  if (!hasStaticMetadata && !hasDynamicMetadata) {
    errors.push("Missing metadata export: " + file);
    continue;
  }

  if (!text.includes("alternates:")) {
    errors.push("Page missing canonical metadata: " + file);
  }
}

const searchPage = fs.readFileSync("app/search/page.tsx", "utf8");
if (!/robots\s*:\s*\{\s*index\s*:\s*false\s*,\s*follow\s*:\s*true\s*\}/s.test(searchPage)) {
  errors.push("Search page must remain noindex, follow.");
}

if (errors.length) {
  console.error("Metadata validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Metadata validation passed for " + pages.length + " pages.");
