import fs from "node:fs";

const text = fs.readFileSync("next.config.ts", "utf8");
const required = [
  ["/shop/latvian-oak", "/shop/baltic-oak"],
  ["/sauna-broom", "/journal/sauna-whisk-vs-sauna-broom"],
  ["/sauna-brooms", "/journal/sauna-whisk-vs-sauna-broom"],
  ["/venik", "/journal/venik-vihta-vasta"],
  ["/vihta", "/journal/venik-vihta-vasta"],
  ["/vasta", "/journal/venik-vihta-vasta"],
  ["/how-to-use-sauna-whisk", "/journal/how-to-use-a-sauna-whisk"],
  ["/dried-sauna-whisk", "/journal/how-to-prepare-dried-sauna-whisk"],
  ["/wholesale-sauna-whisks", "/wholesale"]
];

const errors = [];
for (const [source,destination] of required) {
  if (!text.includes('source: "' + source + '"') || !text.includes('destination: "' + destination + '"')) {
    errors.push(source + " -> " + destination);
  }
}

if (errors.length) {
  console.error("Redirect validation failed:");
  errors.forEach((item) => console.error("- Missing redirect: " + item));
  process.exit(1);
}
console.log("Redirect validation passed.");
