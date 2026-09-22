import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const files = ["app", "components"]
  .flatMap((dir) => walk(dir))
  .filter((file) => /\.(ts|tsx)$/.test(file));

const errors = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");

  if (/href=["']#["']/.test(text)) {
    errors.push("Placeholder href found: " + file);
  }

  const buttons = [...text.matchAll(/<button\b([^>]*)>/g)];
  for (const button of buttons) {
    if (!/\btype=/.test(button[1])) {
      errors.push("Button missing explicit type: " + file);
    }
  }

  const externalTargets = [...text.matchAll(/<a\b([^>]*target=["']_blank["'][^>]*)>/g)];
  for (const link of externalTargets) {
    if (!/\brel=["'][^"']*(noreferrer|noopener)/.test(link[1])) {
      errors.push("target=_blank link missing safe rel: " + file);
    }
  }

  const images = [...text.matchAll(/<img\b([^>]*)>/g)];
  for (const image of images) {
    if (!/\balt=/.test(image[1])) {
      errors.push("img missing alt attribute: " + file);
    }
  }

  const rawInternalAnchors = [...text.matchAll(/<a\b[^>]*href=["'](\/[^"'#?]*)["'][^>]*>/g)];
  const technicalPrefixes = [
    "/api/",
    "/feed.",
    "/sitemap.xml",
    "/robots.txt",
    "/llms.txt",
    "/humans.txt",
    "/.well-known/",
  ];
  for (const link of rawInternalAnchors) {
    const href = link[1];
    if (!technicalPrefixes.some((prefix) => href.startsWith(prefix))) {
      errors.push("Internal page navigation should use Next Link: " + file + " -> " + href);
    }
  }
}

const header = fs.readFileSync("components/Header.tsx", "utf8");
if (!header.includes('href="#main-content"')) errors.push("Skip link missing main-content target.");
if (!header.includes('id="main-content"')) errors.push("Post-header skip target missing.");
if (!header.includes("tabIndex={-1}")) errors.push("Skip target is not programmatically focusable.");
if (header.includes('id="main-content"') && header.includes('aria-hidden="true"')) {
  errors.push("Focusable skip target must not be hidden from assistive technology.");
}
if (!header.includes('aria-label="Mobile navigation"')) errors.push("Mobile navigation landmark label missing.");

const layout = fs.readFileSync("app/layout.tsx", "utf8");
if (layout.includes('id="main-content"')) {
  errors.push("Root layout must not place skip target before site navigation.");
}

const a11yFile = "app/a11y.css";
if (!fs.existsSync(a11yFile)) {
  errors.push("Accessibility stylesheet missing.");
} else {
  const css = fs.readFileSync(a11yFile, "utf8");
  if (!css.includes(":focus-visible")) errors.push("Global focus-visible treatment missing.");
  if (!css.includes("prefers-reduced-motion")) errors.push("Reduced-motion treatment missing.");
  if (!css.includes(".skip-link:focus")) errors.push("Skip-link focus treatment missing.");
  if (!css.includes(".skip-target")) errors.push("Skip-target styling missing.");
}

const unique = [...new Set(errors)];
if (unique.length) {
  console.error("UI validation failed:");
  unique.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("UI validation passed.");
