import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components", "lib"];
const forbidden = [
  ["detoxification", "Unsupported detoxification claim"],
  ["detoxes", "Unsupported detox claim"],
  ["cures ", "Unsupported cure claim"],
  ["heals ", "Unsupported healing claim"],
  ["treats ", "Unsupported treatment claim"],
  ["boosts immunity", "Unsupported immunity claim"],
];

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const files = roots.flatMap((root) => walk(root)).filter((file) => /\.(ts|tsx)$/.test(file));
const errors = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8").toLowerCase();
  for (const [needle, label] of forbidden) {
    if (text.includes(needle)) errors.push(`${label}: ${file}`);
  }
}

if (errors.length) {
  console.error("Claims validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Claims validation passed.");
