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
}

const unique = [...new Set(errors)];
if (unique.length) {
  console.error("UI validation failed:");
  unique.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("UI validation passed.");
