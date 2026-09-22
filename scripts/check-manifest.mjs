import fs from "node:fs";

const manifest = fs.readFileSync("app/manifest.ts", "utf8");
const errors = [];

const required = [
  ['id: "/"', "manifest app id"],
  ['start_url: "/"', "manifest start URL"],
  ['scope: "/"', "manifest scope"],
  ['lang: "en"', "manifest language"],
  ['display: "standalone"', "manifest display mode"],
  ['background_color: "#f1eee5"', "manifest background color"],
  ['theme_color: "#203629"', "manifest theme color"],
  ['src: "/icon.svg"', "manifest icon"],
  ['type: "image/svg+xml"', "manifest icon type"],
];

for (const [needle, label] of required) {
  if (!manifest.includes(needle)) errors.push("Missing " + label + ".");
}

const iconMatch = manifest.match(/src:\s*"([^"]+)"/);
if (!iconMatch) {
  errors.push("Manifest has no icon source.");
} else {
  const iconPath = "app" + iconMatch[1];
  if (!fs.existsSync(iconPath)) errors.push("Manifest icon does not exist: " + iconPath);
}

if (errors.length) {
  console.error("Manifest validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Manifest validation passed.");
