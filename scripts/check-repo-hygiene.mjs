import { execFileSync } from "node:child_process";
import fs from "node:fs";

const errors = [];
const tracked = execFileSync("git", ["ls-files", "-z"], { encoding: "utf8" })
  .split("\0")
  .filter(Boolean)
  .map((file) => file.replaceAll("\\", "/"));

const forbiddenExact = new Set([
  ".env",
  ".DS_Store",
  ".eslintcache",
  "npm-debug.log",
  "yarn-error.log",
]);

const forbiddenPrefixes = [
  "node_modules/",
  ".next/",
  ".vercel/",
  "out/",
  "coverage/",
];

const forbiddenPatterns = [
  [/^\.env\./, "environment file"],
  [/\.tsbuildinfo$/i, "TypeScript build cache"],
  [/\.(?:pem|key|p12|pfx)$/i, "private key/certificate material"],
  [/(?:^|\/)(?:id_rsa|id_ed25519)$/i, "SSH private key"],
  [/(?:^|\/)(?:npm|yarn|pnpm)-debug\.log/i, "package-manager debug log"],
];

for (const file of tracked) {
  if (file === ".env.example") continue;
  if (forbiddenExact.has(file)) {
    errors.push("Forbidden tracked file: " + file);
    continue;
  }
  const prefix = forbiddenPrefixes.find((value) => file.startsWith(value));
  if (prefix) {
    errors.push("Generated/local path is tracked: " + file);
    continue;
  }
  for (const [pattern, label] of forbiddenPatterns) {
    if (pattern.test(file)) {
      errors.push("Tracked " + label + ": " + file);
      break;
    }
  }
}

const gitignore = fs.readFileSync(".gitignore", "utf8");
for (const required of [
  "node_modules",
  ".next",
  "out",
  ".env*",
  "!.env.example",
  ".vercel",
  ".DS_Store",
  "coverage",
  ".eslintcache",
  "*.tsbuildinfo",
]) {
  if (!gitignore.split(/\r?\n/).includes(required)) {
    errors.push(".gitignore missing required pattern: " + required);
  }
}

const attributes = fs.readFileSync(".gitattributes", "utf8");
if (!attributes.includes("* text=auto eol=lf")) {
  errors.push(".gitattributes must normalize text files to LF.");
}

const npmrc = fs.readFileSync(".npmrc", "utf8");
if (!/^engine-strict=true$/m.test(npmrc)) {
  errors.push(".npmrc must enforce engine-strict=true.");
}

if (errors.length) {
  console.error("Repository hygiene validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Repository hygiene validation passed for " + tracked.length + " tracked files.");
