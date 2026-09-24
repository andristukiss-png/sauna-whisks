import fs from "node:fs";
import path from "node:path";

const site = JSON.parse(fs.readFileSync("config/site.json", "utf8"));

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
  } else if (hasStaticMetadata && !text.includes("pageMetadata(")) {
    errors.push("Static page must use shared pageMetadata helper: " + file);
  }
}

for (const file of pages) {
  const text = fs.readFileSync(file, "utf8");
  if (text.includes("<StructuredData") && text.includes(site.origin)) {
    errors.push("JSON-LD page hard-codes canonical origin instead of site config: " + file);
  }
}

const homePageSource = fs.readFileSync("app/page.tsx", "utf8");
if (!homePageSource.includes('import site from "@/config/site.json"')) {
  errors.push("Homepage metadata must import site config.");
}
if (!homePageSource.includes("url: site.origin") || !homePageSource.includes("siteName: site.name")) {
  errors.push("Homepage social metadata must use configured site identity.");
}

const metadataHelper = fs.readFileSync("lib/metadata.ts", "utf8");
for (const field of ["alternates:", "openGraph:", "twitter:"]) {
  if (!metadataHelper.includes(field)) errors.push("Shared pageMetadata helper missing " + field);
}
if (!metadataHelper.includes('import site from "@/config/site.json"')) {
  errors.push("Shared pageMetadata helper must import site config.");
}
if (!metadataHelper.includes("siteName: site.name")) {
  errors.push("Shared pageMetadata helper must use configured site name.");
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
const rootDefaultTitle = layout.match(/default:\s*"([^"]+)"/)?.[1];
const homeOpenGraphTitle = homePage.match(/openGraph:\s*\{[\s\S]*?title:\s*"([^"]+)"/)?.[1];
const homeTwitterTitle = homePage.match(/twitter:\s*\{[\s\S]*?title:\s*"([^"]+)"/)?.[1];
if (!rootDefaultTitle || rootDefaultTitle !== homeOpenGraphTitle || rootDefaultTitle !== homeTwitterTitle) {
  errors.push("Homepage HTML, Open Graph and Twitter titles must stay aligned.");
}

const socialImages = [
  "app/opengraph-image.tsx",
  "app/twitter-image.tsx",
];

const expectedSocialAlt = "Sauna Whisks — Sauna ritual knowledge from Latvia";

for (const file of socialImages) {
  if (!fs.existsSync(file)) {
    errors.push("Missing social image route: " + file);
    continue;
  }
  const source = fs.readFileSync(file, "utf8");
  if (!source.includes("export const alt =")) errors.push("Social image missing alt text: " + file);
  if (!source.includes(`export const alt = "${expectedSocialAlt}"`)) {
    errors.push("Social image alt must match homepage positioning: " + file);
  }
  if (!source.includes("width: 1200") || !source.includes("height: 630")) {
    errors.push("Social image must remain 1200x630: " + file);
  }
  if (!source.includes('export const contentType = "image/png"')) {
    errors.push("Social image must declare PNG content type: " + file);
  }
  if (!source.includes("new ImageResponse(")) {
    errors.push("Social image must use ImageResponse: " + file);
  }
}

const localSmoke = fs.readFileSync("scripts/local-smoke.mjs", "utf8");
for (const [needle, label] of [
  ["structuredUrlKeys", "structured-data URL-key registry"],
  ["validateStructuredUrl", "structured-data URL validator"],
  ["url.origin !== site.origin", "canonical structured-data origin check"],
  ["walkStructuredData", "recursive structured-data traversal"],
]) {
  if (!localSmoke.includes(needle)) {
    errors.push("Local smoke missing " + label + ".");
  }
}

const nextConfigSource = fs.readFileSync("next.config.ts", "utf8");
const robotsSource = fs.readFileSync("app/robots.ts", "utf8");
for (const [needle, label] of [
  ['const isPreviewDeployment = process.env.VERCEL_ENV === "preview";', "preview deployment detector"],
  ['value: "noindex, nofollow, noarchive"', "preview X-Robots-Tag"],
]) {
  if (!nextConfigSource.includes(needle)) errors.push("Next config missing " + label + ".");
}
if (!robotsSource.includes('process.env.VERCEL_ENV === "preview"')) {
  errors.push("robots.ts must detect preview deployments.");
}
if (!robotsSource.includes('disallow: "/"')) {
  errors.push("Preview robots policy must disallow all crawling.");
}

for (const [needle, label] of [
  ["must render exactly one H1", "runtime H1 count check"],
  ["must render exactly one main landmark", "runtime main-landmark count check"],
  ['propertyMetaContent(html, "og:url")', "runtime Open Graph URL check"],
  ['metaContent(html, "twitter:title")', "runtime Twitter title check"],
  ['metaContent(html, "twitter:description")', "runtime Twitter description check"],
]) {
  if (!localSmoke.includes(needle)) errors.push("Local smoke missing " + label + ".");
}

const productionSmoke = fs.readFileSync("scripts/production-smoke.mjs", "utf8");
for (const [needle, label] of [
  ["async function checkHomepageDocument", "live homepage document verifier"],
  ['htmlLinkHref(html, "canonical")', "live canonical-link check"],
  ['htmlPropertyContent(html, "og:url")', "live Open Graph URL check"],
  ["production HTML unexpectedly has robots noindex", "live HTML noindex guard"],
  ["production response unexpectedly has X-Robots-Tag noindex", "live header noindex guard"],
]) {
  if (!productionSmoke.includes(needle)) {
    errors.push("Production smoke missing " + label + ".");
  }
}

const robotsPolicy = fs.readFileSync("app/robots.ts", "utf8");
if (!robotsPolicy.includes('disallow: ["/api"]')) {
  errors.push("Production robots policy must disallow the API prefix.");
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
