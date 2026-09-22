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
  const isDynamic = file.includes("[");
  const isHome = file === path.join("app", "page.tsx");

  if (isHome) continue;

  const hasStaticMetadata = text.includes("export const metadata");
  const hasDynamicMetadata = text.includes("generateMetadata");

  if (!hasStaticMetadata && !hasDynamicMetadata) {
    errors.push("Missing metadata export: " + file);
  }

  if (!isDynamic && hasStaticMetadata && !text.includes("alternates:")) {
    errors.push("Static page missing canonical metadata: " + file);
  }
}

if (errors.length) {
  console.error("Metadata validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Metadata validation passed for " + pages.length + " pages.");
