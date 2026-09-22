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
  const isDynamic = file.includes("[");

  if (isHome) continue;

  const hasStaticMetadata = text.includes("export const metadata");
  const hasDynamicMetadata = text.includes("generateMetadata");

  if (!hasStaticMetadata && !hasDynamicMetadata) {
    errors.push("Missing metadata export: " + file);
    continue;
  }

  if (isDynamic) {
    if (!hasDynamicMetadata) {
      errors.push("Dynamic page missing generateMetadata: " + file);
    }
    if (!text.includes("pageMetadata(")) {
      errors.push("Dynamic page must use shared pageMetadata helper: " + file);
    }
  } else if (hasStaticMetadata) {
    const usesSharedMetadata = text.includes("pageMetadata(");
    const hasInlineCanonical = text.includes("alternates:");
    if (!usesSharedMetadata && !hasInlineCanonical) {
      errors.push("Static page missing canonical metadata: " + file);
    }
  }
}

const metadataHelper = fs.readFileSync("lib/metadata.ts", "utf8");
for (const field of ["alternates:", "openGraph:", "twitter:"]) {
  if (!metadataHelper.includes(field)) errors.push("Shared pageMetadata helper missing " + field);
}
if (!metadataHelper.includes("siteName: \"Sauna Whisks\"")) {
  errors.push("Shared pageMetadata helper missing site name.");
}

const layout = fs.readFileSync("app/layout.tsx", "utf8");
if (/openGraph:\s*\{\s*title:/s.test(layout)) {
  errors.push("Root layout must not leak a page-specific Open Graph title into child routes.");
}
if (/twitter:\s*\{[\s\S]*?title:/s.test(layout)) {
  errors.push("Root layout must not leak a page-specific Twitter title into child routes.");
}

const homePage = fs.readFileSync("app/page.tsx", "utf8");
if (!homePage.includes("openGraph:")) errors.push("Homepage-specific Open Graph metadata missing.");
if (!homePage.includes("twitter:")) errors.push("Homepage-specific Twitter metadata missing.");

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
