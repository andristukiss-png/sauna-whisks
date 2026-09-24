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

  const rawInternalAnchors = [...text.matchAll(/<a\b[^>]*href=["'](\/[^"'#?]*)["'][^>]*>/g)];
  const technicalPrefixes = [
    "/api/",
    "/feed.",
    "/sitemap.xml",
    "/robots.txt",
    "/llms.txt",
    "/humans.txt",
    "/.well-known/",
  ];
  for (const link of rawInternalAnchors) {
    const href = link[1];
    if (!technicalPrefixes.some((prefix) => href.startsWith(prefix))) {
      errors.push("Internal page navigation should use Next Link: " + file + " -> " + href);
    }
  }
}

const header = fs.readFileSync("components/Header.tsx", "utf8");
if (!header.includes('href="#main-content"')) errors.push("Skip link missing main-content target.");
if (!header.includes('id="main-content"')) errors.push("Post-header skip target missing.");
if (!header.includes("tabIndex={-1}")) errors.push("Skip target is not programmatically focusable.");
if (header.includes('id="main-content"') && header.includes('aria-hidden="true"')) {
  errors.push("Focusable skip target must not be hidden from assistive technology.");
}
if (!header.includes('aria-label="Mobile navigation"')) errors.push("Mobile navigation landmark label missing.");

const layout = fs.readFileSync("app/layout.tsx", "utf8");
if (layout.includes('id="main-content"')) {
  errors.push("Root layout must not place skip target before site navigation.");
}

const a11yFile = "app/a11y.css";
if (!fs.existsSync(a11yFile)) {
  errors.push("Accessibility stylesheet missing.");
} else {
  const css = fs.readFileSync(a11yFile, "utf8");
  if (!css.includes(":focus-visible")) errors.push("Global focus-visible treatment missing.");
  if (!css.includes("prefers-reduced-motion")) errors.push("Reduced-motion treatment missing.");
  if (!css.includes(".skip-link:focus")) errors.push("Skip-link focus treatment missing.");
  if (!css.includes(".skip-target")) errors.push("Skip-target styling missing.");
}

for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  if (/<summary[\s\S]*?<i>\+<\/i>[\s\S]*?<\/summary>/.test(text)) {
    errors.push("Disclosure plus decoration must be aria-hidden: " + file);
  }
}

const loading = fs.readFileSync("app/loading.tsx", "utf8");
if (loading.includes("<main")) {
  errors.push("Global loading fallback must not create a second main landmark.");
}
for (const [needle, label] of [
  ['role="status"', "loading status role"],
  ['aria-live="polite"', "loading polite announcement"],
  ['aria-atomic="true"', "loading atomic announcement"],
]) {
  if (!loading.includes(needle)) errors.push("Loading fallback missing " + label + ".");
}

const journalSearch = fs.readFileSync("components/JournalSearch.tsx", "utf8");
for (const [needle, label] of [
  ['aria-controls="journal-search-results"', "journal search controls relationship"],
  ['aria-describedby="journal-search-count"', "journal search count description"],
  ['id="journal-search-count"', "journal search count id"],
  ['role="status"', "journal search live status"],
  ['aria-live="polite"', "journal search polite live region"],
  ['id="journal-search-results"', "journal search result container id"],
  ['maxLength={MAX_SEARCH_QUERY_LENGTH}', "journal search query length bound"],
  ['aria-atomic="true"', "journal search atomic announcement"],
]) {
  if (!journalSearch.includes(needle)) errors.push("Journal search missing " + label + ".");
}

const siteSearch = fs.readFileSync("components/SiteSearch.tsx", "utf8");
for (const [needle, label] of [
  ['aria-describedby="site-search-count"', "site search count description"],
  ['id="site-search-count"', "site search count id"],
  ['aria-controls="site-search-results"', "site search controls relationship"],
  ['aria-atomic="true"', "site search atomic announcement"],
]) {
  if (!siteSearch.includes(needle)) errors.push("Site search missing " + label + ".");
}

const contextualStatusChecks = [
  ["components/QualityChecklist.tsx", "checks complete", "quality checklist status"],
  ["components/LaunchReadinessTool.tsx", "launch gates complete", "launch readiness status"],
  ["components/SupplierScorecardTool.tsx", "criteria scored", "supplier score status"],
  ["components/TradeDemandEstimator.tsx", "whisks per month", "trade demand status"],
];

for (const [file, context, label] of contextualStatusChecks) {
  const source = fs.readFileSync(file, "utf8");
  if (!source.includes('role="status"')) errors.push(label + " missing status role.");
  if (!source.includes('aria-live="polite"')) errors.push(label + " missing polite live region.");
  if (!source.includes('aria-atomic="true"')) errors.push(label + " missing atomic announcement.");
  if (!source.includes('className="sr-only"')) errors.push(label + " missing screen-reader context.");
  if (!source.includes(context)) errors.push(label + " missing contextual status text.");
}

const whiskFinder = fs.readFileSync("components/WhiskFinder.tsx", "utf8");
for (const [needle, label] of [
  ['role="status"', "finder status role"],
  ['aria-live="polite"', "finder polite live region"],
  ['aria-atomic="true"', "finder atomic recommendation announcement"],
  ["WORKING RECOMMENDATION", "finder recommendation context"],
]) {
  if (!whiskFinder.includes(needle)) errors.push("Whisk finder missing " + label + ".");
}

const enquiryForm = fs.readFileSync("components/EnquiryForm.tsx", "utf8");
for (const [needle, label] of [
  ['minLength={2}', "enquiry name minimum length"],
  ['aria-atomic="true"', "enquiry status atomic announcement"],
]) {
  if (!enquiryForm.includes(needle)) errors.push("Enquiry form missing " + label + ".");
}

const globalCss = fs.readFileSync("app/globals.css", "utf8");
if (!globalCss.includes(".sr-only")) errors.push("Screen-reader-only utility missing.");

const comparePage = fs.readFileSync("app/compare/page.tsx", "utf8");
for (const [needle, label] of [
  ['<table className="compare-table">', "semantic comparison table"],
  ['<caption className="sr-only">', "comparison table caption"],
  ['<thead>', "comparison table header group"],
  ['<tbody>', "comparison table body group"],
  ['scope="col"', "comparison column headers"],
  ['scope="row"', "comparison row headers"],
]) {
  if (!comparePage.includes(needle)) errors.push("Compare page missing " + label + ".");
}

const unique = [...new Set(errors)];
if (unique.length) {
  console.error("UI validation failed:");
  unique.forEach((error) => console.error("- " + error));
  process.exit(1);
}

console.log("UI validation passed.");
