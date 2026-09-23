import fs from "node:fs";

const errors = [];
const expectedMajor = "22";

for (const file of [".nvmrc", ".node-version"]) {
  if (!fs.existsSync(file)) {
    errors.push("Missing Node version file: " + file);
    continue;
  }
  const value = fs.readFileSync(file, "utf8").trim();
  if (value !== expectedMajor) {
    errors.push(file + " must pin Node " + expectedMajor + ".");
  }
}

if (!fs.existsSync("package-lock.json")) {
  errors.push("Missing package-lock.json for reproducible installs.");
} else {
  const lock = JSON.parse(fs.readFileSync("package-lock.json", "utf8"));
  if (lock.lockfileVersion !== 3) {
    errors.push("package-lock.json must use lockfileVersion 3.");
  }
  if (lock.name !== "sauna-whisks") {
    errors.push("package-lock.json package name does not match the project.");
  }
}

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
if (pkg.engines?.node !== ">=22 <23") {
  errors.push("package.json engines.node must stay on Node 22.");
}
if (!pkg.scripts?.["validate:toolchain"]) {
  errors.push("package.json missing validate:toolchain script.");
}

const workflow = fs.readFileSync(".github/workflows/build.yml", "utf8");
if (!workflow.includes('node-version-file: ".nvmrc"')) {
  errors.push("CI must read its Node version from .nvmrc.");
}
if (!workflow.includes("npm ci --no-audit --no-fund")) {
  errors.push("CI must use npm ci with the committed lockfile.");
}
if (!pkg.scripts?.["audit:prod"]) {
  errors.push("package.json missing audit:prod script.");
}
if (!workflow.includes("npm run audit:prod")) {
  errors.push("CI must audit production dependencies.");
}
if (workflow.includes("npm install --no-audit --no-fund")) {
  errors.push("CI must not use floating npm install.");
}
if (!workflow.includes("npm run smoke:local")) {
  errors.push("CI must smoke-test the built production server.");
}
if (!workflow.includes("npm start > /tmp/sauna-whisks-next.log")) {
  errors.push("CI must start the production server before smoke testing.");
}
if (!workflow.includes("if: always()")) {
  errors.push("CI must clean up the production server even after failures.");
}

const codeqlFile = ".github/workflows/codeql.yml";
if (!fs.existsSync(codeqlFile)) {
  errors.push("Missing CodeQL workflow.");
} else {
  const codeql = fs.readFileSync(codeqlFile, "utf8");
  if (!codeql.includes("github/codeql-action/init@v4")) {
    errors.push("CodeQL init action must use v4.");
  }
  if (!codeql.includes("github/codeql-action/analyze@v4")) {
    errors.push("CodeQL analyze action must use v4.");
  }
  if (!codeql.includes("javascript-typescript")) {
    errors.push("CodeQL must analyze JavaScript/TypeScript.");
  }
  if (!codeql.includes("security-events: write")) {
    errors.push("CodeQL workflow needs security-events write permission.");
  }
}

const dependabot = fs.readFileSync(".github/dependabot.yml", "utf8");
if (!dependabot.includes('package-ecosystem: "npm"')) {
  errors.push("Dependabot npm updates missing.");
}
if (!dependabot.includes('package-ecosystem: "github-actions"')) {
  errors.push("Dependabot GitHub Actions updates missing.");
}

if (errors.length) {
  console.error("Toolchain validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Toolchain validation passed.");
