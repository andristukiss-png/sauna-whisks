import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

const files = ["app", "components", "lib"]
  .flatMap((dir) => walk(dir))
  .filter((file) => /\.(ts|tsx)$/.test(file));

const errors = [];

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  const isClient = /^\s*["']use client["'];/m.test(text);

  if (isClient) {
    const forbiddenClientImports = [
      'from "node:',
      "from 'node:",
      'from "next/headers"',
      "from 'next/headers'",
      'from "server-only"',
      "from 'server-only'",
    ];

    for (const needle of forbiddenClientImports) {
      if (text.includes(needle)) {
        errors.push("Client Component imports server-only code: " + file + " -> " + needle);
      }
    }

    if (/export\s+default\s+async\s+function\s+[A-Z]/.test(text)) {
      errors.push("Async default Client Component is not allowed: " + file);
    }
    if (/export\s+async\s+function\s+[A-Z]/.test(text)) {
      errors.push("Async named Client Component is not allowed: " + file);
    }
  }

  if (file.includes("[") && file.endsWith("page.tsx") && text.includes("params:")) {
    if (!/params\s*:\s*Promise\s*</.test(text)) {
      errors.push("Dynamic App Router page must use async params: " + file);
    }
  }

  if (file.endsWith("page.tsx") && text.includes("searchParams:")) {
    if (!/searchParams\s*:\s*Promise\s*</.test(text)) {
      errors.push("App Router page must use async searchParams: " + file);
    }
  }
}

for (const legacy of ["middleware.ts", "src/middleware.ts"]) {
  if (fs.existsSync(legacy)) {
    errors.push("Next.js 16 uses proxy.ts instead of legacy middleware.ts: " + legacy);
  }
}

if (errors.length) {
  console.error("Next.js boundary validation failed:");
  errors.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("Next.js boundary validation passed.");
