import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components", "lib"];

// Guard against health-marketing language without flagging ordinary prose
// such as "treats those traditions as distinct".
const forbiddenSubstrings = [
  ["detoxification", "Unsupported detoxification claim"],
  ["detoxes", "Unsupported detox claim"],
  ["boosts immunity", "Unsupported immunity claim"],
];

const healthClaimPatterns = [
  [/\bcures?\s+(pain|disease|illness|injury|condition|anxiety|depression|arthritis|inflammation)\b/i, "Unsupported cure claim"],
  [/\bheals?\s+(pain|disease|illness|injury|condition|skin|wounds?)\b/i, "Unsupported healing claim"],
  [/\btreats?\s+(pain|disease|illness|injury|condition|anxiety|depression|arthritis|inflammation)\b/i, "Unsupported treatment claim"],
  [/\brelieves?\s+(pain|arthritis|inflammation|anxiety|depression)\b/i, "Unsupported relief claim"],
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
  const text = fs.readFileSync(file, "utf8");
  const lowered = text.toLowerCase();

  for (const [needle, label] of forbiddenSubstrings) {
    if (lowered.includes(needle)) errors.push(label + ": " + file);
  }

  for (const [pattern, label] of healthClaimPatterns) {
    if (pattern.test(text)) errors.push(label + ": " + file);
  }
}

if (errors.length) {
  console.error("Claims validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Claims validation passed.");
