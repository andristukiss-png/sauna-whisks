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

  const externalTargets = [...text.matchAll(/<a\\b([^>]*target=[\"']_blank[\"'][^>]*)>[\\s\\S]*?<\\/a>/g)];
  for (const link of externalTargets) {
    if (!/\\brel=[\"'][^\"']*(noreferrer|noopener)/.test(link[1])) {
      errors.push("target=_blank link missing safe rel: " + file);
    }
    if (!/className=[\"']sr-only[\"'][^>]*>\\s*\\(opens in a new tab\\)\\s*<\\/span>/.test(link[0])) {
      errors.push("target=_blank link must announce new-tab behavior: " + file);
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
if (header.includes('id="main-content"')) errors.push("Header must not own the main-content target.");
if (!header.includes('aria-label="Mobile navigation"')) errors.push("Mobile navigation landmark label missing.");

const layout = fs.readFileSync("app/layout.tsx", "utf8");
for (const [needle, label] of [
  ['<Header />', "global header"],
  ['<main id="main-content" tabIndex={-1}>', "focusable primary main landmark"],
  ['<SiteFooter />', "global footer"],
]) {
  if (!layout.includes(needle)) errors.push("Root layout missing " + label + ".");
}
const layoutHeaderIndex = layout.indexOf("<Header />");
const layoutMainIndex = layout.indexOf('<main id="main-content" tabIndex={-1}>');
const layoutFooterIndex = layout.indexOf("<SiteFooter />");
if (!(layoutHeaderIndex >= 0 && layoutHeaderIndex < layoutMainIndex && layoutMainIndex < layoutFooterIndex)) {
  errors.push("Root layout landmarks must be ordered header -> main -> footer.");
}

const routePages = walk("app").filter((file) => file.endsWith("page.tsx"));
for (const file of routePages) {
  const source = fs.readFileSync(file, "utf8");
  if (/<Header\s*\/>/.test(source)) errors.push("Route page must not render global Header: " + file);
  if (/<SiteFooter\s*\/>/.test(source)) errors.push("Route page must not render global SiteFooter: " + file);
  if (/<main\b/.test(source)) errors.push("Route page must not create a second main landmark: " + file);
}
for (const file of ["app/not-found.tsx", "app/error.tsx"]) {
  const source = fs.readFileSync(file, "utf8");
  if (/<Header\s*\/>/.test(source)) errors.push("Boundary must not render global Header: " + file);
  if (/<SiteFooter\s*\/>/.test(source)) errors.push("Boundary must not render global SiteFooter: " + file);
  if (/<main\b/.test(source)) errors.push("Boundary must not create a second main landmark: " + file);
}

for (const [file, className, label] of [
  ["app/error.tsx", "route-error-message", "route error"],
  ["app/global-error.tsx", "fatal-error-message", "global error"],
]) {
  const source = fs.readFileSync(file, "utf8");
  const statusPattern = new RegExp(
    '<div className="' + className + '" role="alert"[\\s\\S]*?<\\/div>'
  );
  const alertBlock = source.match(statusPattern)?.[0] || "";
  if (!alertBlock.includes('aria-live="assertive"') || !alertBlock.includes('aria-atomic="true"')) {
    errors.push(label + " message must be an atomic assertive alert.");
  }
  if (alertBlock.includes("<button") || alertBlock.includes("<a ") || alertBlock.includes("<Link")) {
    errors.push(label + " alert must not contain interactive controls.");
  }
}

const errorCss = fs.readFileSync("app/globals.css", "utf8");
if (!errorCss.includes(".route-error{")) errors.push("Route error layout styling missing.");
if (!errorCss.includes(".route-error-actions{")) errors.push("Route error action layout styling missing.");

const a11yFile = "app/a11y.css";
if (!fs.existsSync(a11yFile)) {
  errors.push("Accessibility stylesheet missing.");
} else {
  const css = fs.readFileSync(a11yFile, "utf8");
  if (!css.includes(":focus-visible")) errors.push("Global focus-visible treatment missing.");
  if (!css.includes("prefers-reduced-motion")) errors.push("Reduced-motion treatment missing.");
  if (!css.includes(".skip-link:focus")) errors.push("Skip-link focus treatment missing.");
  if (!css.includes("#main-content:focus")) errors.push("Main skip-target focus treatment missing.");
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

const fragmentTargetChecks = [
  ["app/usa/page.tsx", 'id="usa-enquiry" tabIndex={-1}', "USA enquiry fragment target"],
  ["app/shop/discovery-trio/page.tsx", 'id="trio-enquiry" tabIndex={-1}', "Discovery Trio enquiry fragment target"],
  ["app/shop/[slug]/page.tsx", 'id="product-enquiry" tabIndex={-1}', "product enquiry fragment target"],
  ["app/journal/[slug]/page.tsx", 'id="article-top" tabIndex={-1}', "article top fragment target"],
  ["app/journal/[slug]/page.tsx", 'id={"section-" + index} key={section.heading} tabIndex={-1}', "article contents fragment targets"],
];

for (const [file, needle, label] of fragmentTargetChecks) {
  const source = fs.readFileSync(file, "utf8");
  if (!source.includes(needle)) errors.push(label + " must be programmatically focusable.");
}

const articleTools = fs.readFileSync("components/ArticleTools.tsx", "utf8");
for (const [needle, label] of [
  ['role="status"', "article tools status role"],
  ['aria-live="polite"', "article tools polite live region"],
  ['aria-atomic="true"', "article tools atomic announcement"],
]) {
  if (!articleTools.includes(needle)) errors.push("Article tools missing " + label + ".");
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

const landedCostCalculator = fs.readFileSync("components/LandedCostCalculator.tsx", "utf8");
for (const [needle, label] of [
  ["function finiteResult", "finite result helper"],
  ["Number.isFinite(value) ? value : null", "finite computed-result guard"],
  ['calc.margin === null ? "—"', "non-finite margin fallback"],
  ["calc.hasInvalidResult", "invalid computed-result state"],
  ["Enter smaller finite values", "non-finite calculator guidance"],
  ['aria-atomic="true"', "atomic calculator status"],
]) {
  if (!landedCostCalculator.includes(needle)) {
    errors.push("Landed cost calculator missing " + label + ".");
  }
}

const tradeDemandEstimator = fs.readFileSync("components/TradeDemandEstimator.tsx", "utf8");
for (const [needle, label] of [
  ["Number.isFinite(parsed)", "finite input guard"],
  ["Number.isFinite(estimate)", "finite estimate guard"],
  ['monthly ?? "—"', "non-finite visible fallback"],
  ["Enter finite numeric values", "non-finite accessible fallback"],
]) {
  if (!tradeDemandEstimator.includes(needle)) {
    errors.push("Trade demand estimator missing " + label + ".");
  }
}

const whiskFinder = fs.readFileSync("components/WhiskFinder.tsx", "utf8");
for (const [needle, label] of [
  ['className="finder-result-copy" role="status"', "dedicated finder status boundary"],
  ['aria-live="polite"', "finder polite live region"],
  ['aria-atomic="true"', "finder atomic recommendation announcement"],
  ["WORKING RECOMMENDATION", "finder recommendation context"],
]) {
  if (!whiskFinder.includes(needle)) errors.push("Whisk finder missing " + label + ".");
}
const finderStatusBlock = whiskFinder.match(/<div className="finder-result-copy" role="status"[\s\S]*?<\/div>/)?.[0] || "";
if (!finderStatusBlock) {
  errors.push("Whisk finder recommendation status block is missing.");
} else if (finderStatusBlock.includes("<Link") || finderStatusBlock.includes("<button")) {
  errors.push("Whisk finder live status must not contain interactive controls.");
}

const enquiryForm = fs.readFileSync("components/EnquiryForm.tsx", "utf8");
for (const [needle, label] of [
  ['minLength={2}', "enquiry name minimum length"],
  ['aria-atomic="true"', "enquiry status atomic announcement"],
  ['Thank you. Your enquiry was submitted.', "accurate enquiry success message"],
  ['startedAt.current = Date.now();', "enquiry timing reset after success"],
  ['elapsedMs: String(startedAt.current ? Math.max(0, Date.now() - startedAt.current) : 0)', "client-computed enquiry elapsed duration"],
]) {
  if (!enquiryForm.includes(needle)) errors.push("Enquiry form missing " + label + ".");
}

const siteFooter = fs.readFileSync("components/SiteFooter.tsx", "utf8");
if (!siteFooter.includes("new Date().getUTCFullYear()")) errors.push("Footer copyright year must be derived in UTC.");
if (/©\s+20\d{2}\s+SaunaWhisks\.com/.test(siteFooter)) errors.push("Footer must not hard-code a copyright year.");
for (const [needle, label] of [
  ['aria-label="Shop and explore"', "shop and explore navigation"],
  ['aria-label="Learn"', "learning navigation"],
  ['aria-label="Trade and operations"', "trade and operations navigation"],
  ['aria-label="Company and trust"', "company and trust navigation"],
  ['aria-label="Help and legal"', "help and legal navigation"],
  ['className="footer-menu-grid"', "grouped footer navigation layout"],
]) {
  if (!siteFooter.includes(needle)) errors.push("Footer missing " + label + ".");
}
const footerHrefs = [...siteFooter.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
const duplicateFooterHrefs = footerHrefs.filter((href, index) => footerHrefs.indexOf(href) !== index);
if (duplicateFooterHrefs.length) {
  errors.push("Footer contains duplicate destinations: " + [...new Set(duplicateFooterHrefs)].join(", "));
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
