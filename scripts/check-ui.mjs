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
}

const layout = fs.readFileSync("app/layout.tsx", "utf8");
if (!layout.includes('href="#main-content"')) errors.push("Skip link missing main-content target.");
if (!layout.includes('id="main-content"')) errors.push("Main-content target missing.");
if (!layout.includes("tabIndex={-1}")) errors.push("Main-content skip target is not programmatically focusable.");

const a11yFile = "app/a11y.css";
if (!fs.existsSync(a11yFile)) {
  errors.push("Accessibility stylesheet missing.");
} else {
  const css = fs.readFileSync(a11yFile, "utf8");
  if (!css.includes(":focus-visible")) errors.push("Global focus-visible treatment missing.");
  if (!css.includes("prefers-reduced-motion")) errors.push("Reduced-motion treatment missing.");
  if (!css.includes(".skip-link:focus")) errors.push("Skip-link focus treatment missing.");
}

const unique = [...new Set(errors)];
if (unique.length) {
  console.error("UI validation failed:");
  unique.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("UI validation passed.");
