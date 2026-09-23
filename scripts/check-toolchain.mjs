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

const workflowDir = ".github/workflows";
for (const file of fs.readdirSync(workflowDir).filter((name) => /\.ya?ml$/.test(name))) {
  const workflowText = fs.readFileSync(workflowDir + "/" + file, "utf8");
  for (const match of workflowText.matchAll(/uses:\s*([^\s@]+)@([^\s#]+)/g)) {
    const [, action, ref] = match;
    if (action.startsWith("./")) continue;
    if (!/^[0-9a-f]{40}$/.test(ref)) {
      errors.push("Workflow action must be pinned to a full commit SHA: " + file + " -> " + action + "@" + ref);
    }
  }
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
if (!workflow.includes('VERCEL_GIT_COMMIT_SHA="$GITHUB_SHA"')) {
  errors.push("CI must inject the commit SHA into the production smoke server.");
}
if (!workflow.includes('LOCAL_SMOKE_EXPECTED_COMMIT="$GITHUB_SHA"')) {
  errors.push("CI must verify the health endpoint against the running commit.");
}
if (!workflow.includes("npm start > /tmp/sauna-whisks-next.log")) {
  errors.push("CI must start the production server before smoke testing.");
}
if (!workflow.includes("if: always()")) {
  errors.push("CI must clean up the production server even after failures.");
}

function pinnedActionSha(text, action) {
  return text.match(new RegExp(action + "@([0-9a-f]{40})"))?.[1] || "";
}

for (const [action, label] of [
  ["actions/checkout", "checkout"],
  ["actions/setup-node", "setup-node"],
]) {
  if (!pinnedActionSha(workflow, action)) {
    errors.push("Build workflow " + label + " action must be pinned to a full commit SHA.");
  }
}
if (!workflow.includes("persist-credentials: false")) {
  errors.push("Build workflow checkout must disable persisted credentials.");
}

const codeqlFile = ".github/workflows/codeql.yml";
if (!fs.existsSync(codeqlFile)) {
  errors.push("Missing CodeQL workflow.");
} else {
  const codeql = fs.readFileSync(codeqlFile, "utf8");
  const initSha = pinnedActionSha(codeql, "github/codeql-action/init");
  const analyzeSha = pinnedActionSha(codeql, "github/codeql-action/analyze");
  const checkoutSha = pinnedActionSha(codeql, "actions/checkout");

  if (!initSha) errors.push("CodeQL init action must be pinned to a full commit SHA.");
  if (!analyzeSha) errors.push("CodeQL analyze action must be pinned to a full commit SHA.");
  if (initSha && analyzeSha && initSha !== analyzeSha) {
    errors.push("CodeQL init/analyze actions must use the same pinned commit.");
  }
  if (!checkoutSha) errors.push("CodeQL checkout action must be pinned to a full commit SHA.");
  if (!codeql.includes("persist-credentials: false")) {
    errors.push("CodeQL checkout must disable persisted credentials.");
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
if (!dependabot.includes('dependency-name: "*"')) {
  errors.push("Dependabot npm major-update ignore policy missing.");
}
if (!dependabot.includes('"version-update:semver-major"')) {
  errors.push("Dependabot must defer automatic npm semver-major updates.");
}

if (errors.length) {
  console.error("Toolchain validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Toolchain validation passed.");
