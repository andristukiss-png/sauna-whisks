import fs from "node:fs";

const site = JSON.parse(fs.readFileSync("config/site.json", "utf8"));
const redirects = JSON.parse(fs.readFileSync("config/redirects.json", "utf8"));
const baseUrl = (process.env.LOCAL_SMOKE_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const failures = [];
const expectedCommit = (process.env.LOCAL_SMOKE_EXPECTED_COMMIT || "").trim().toLowerCase();
const observedPageTitles = [];
const attempts = 40;
const pauseMs = 500;

function fail(message) {
  failures.push(message);
}

async function request(path, options = {}) {
  const url = baseUrl + path;
  try {
    return await fetch(url, {
      redirect: "manual",
      signal: AbortSignal.timeout(5000),
      ...options,
    });
  } catch (error) {
    fail(`${path} fetch failed: ${error.cause?.code || error.code || error.message}`);
    return null;
  }
}

async function waitForServer() {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(baseUrl + "/api/health", {
        signal: AbortSignal.timeout(1500),
      });
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, pauseMs));
  }
  throw new Error("Production server did not become ready.");
}

function expectStatus(response, expected, path) {
  if (!response) return;
  if (response.status !== expected) {
    fail(`${path} expected ${expected}, received ${response.status}`);
  }
}

function expectHeader(response, name, includes, path) {
  if (!response) return;
  const value = response.headers.get(name) || "";
  if (!value.toLowerCase().includes(includes.toLowerCase())) {
    fail(`${path} header ${name} did not include ${includes}; got "${value}"`);
  }
}

async function expectJson(path, assertions, options) {
  const response = await request(path, options);
  if (!response) return;
  if (response.status < 200 || response.status >= 300) {
    fail(`${path} returned ${response.status}`);
    return;
  }
  expectHeader(response, "content-type", "application/json", path);
  const body = await response.json();
  assertions(body, response);
}

function normalizedPath(value) {
  const url = new URL(value, site.origin);
  return url.pathname.replace(/\/+$/, "") || "/";
}

function extractCanonical(html) {
  const tags = html.match(/<link\b[^>]*>/gi) || [];
  const tag = tags.find((item) => /\brel=["']canonical["']/i.test(item));
  return tag?.match(/\bhref=["']([^"']+)["']/i)?.[1] || "";
}

function hasNoindex(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  return tags.some(
    (tag) =>
      /\bname=["']robots["']/i.test(tag) &&
      /\bcontent=["'][^"']*noindex/i.test(tag)
  );
}

function metaContent(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((item) => new RegExp("\\bname=[\"']" + name + "[\"']", "i").test(item));
  return tag?.match(/\bcontent=["']([^"']*)["']/i)?.[1]?.trim() || "";
}

const structuredUrlKeys = new Set([
  "url",
  "mainEntityOfPage",
  "item",
  "inDefinedTermSet",
  "target",
]);

function validateStructuredUrl(value, key, path) {
  if (typeof value !== "string" || !structuredUrlKeys.has(key)) return;

  if (value.startsWith("/")) {
    fail(path + " JSON-LD " + key + " must use an absolute URL: " + value);
    return;
  }

  if (!/^https?:\/\//i.test(value)) return;

  let url;
  try {
    url = new URL(value);
  } catch {
    fail(path + " JSON-LD " + key + " contains an invalid URL: " + value);
    return;
  }

  if (url.hostname === site.host || url.hostname === site.wwwHost) {
    if (url.origin !== site.origin) {
      fail(path + " JSON-LD " + key + " uses a non-canonical site origin: " + value);
    }
  }
}

function walkStructuredData(value, path, key = "") {
  if (typeof value === "string") {
    validateStructuredUrl(value, key, path);
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) walkStructuredData(item, path, key);
    return;
  }

  if (!value || typeof value !== "object") return;

  for (const [nextKey, nextValue] of Object.entries(value)) {
    walkStructuredData(nextValue, path, nextKey);
  }
}

function propertyMetaContent(html, property) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((item) => new RegExp("\\bproperty=[\"']" + property + "[\"']", "i").test(item));
  return tag?.match(/\bcontent=["']([^"']*)["']/i)?.[1]?.trim() || "";
}

function validateJsonLd(html, path) {
  const scripts = html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || [];
  const jsonLd = scripts.filter((script) =>
    /\btype=["']application\/ld\+json["']/i.test(script)
  );

  for (const script of jsonLd) {
    const body = script
      .replace(/^<script\b[^>]*>/i, "")
      .replace(/<\/script>$/i, "")
      .trim();

    try {
      const parsed = JSON.parse(body);
      walkStructuredData(parsed, path);
    } catch {
      fail(path + " contains invalid JSON-LD.");
    }
  }
}

async function checkSitemapPage(location) {
  let canonicalUrl;
  try {
    canonicalUrl = new URL(location);
  } catch {
    fail("Sitemap contains invalid URL: " + location);
    return;
  }

  if (canonicalUrl.origin !== site.origin) {
    fail("Sitemap contains non-canonical origin: " + location);
    return;
  }

  const path = canonicalUrl.pathname + canonicalUrl.search;
  const response = await request(path);
  expectStatus(response, 200, path);
  expectHeader(response, "content-type", "text/html", path);
  if (!response?.ok) return;

  const html = await response.text();

  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || "";
  if (!title) {
    fail(path + " is missing a non-empty title.");
  } else {
    observedPageTitles.push({ path, title });
  }
  const renderedHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  const h1Count = (renderedHtml.match(/<h1\b/gi) || []).length;
  if (h1Count !== 1) {
    fail(path + " must render exactly one H1; found " + h1Count + ".");
  }

  const mainCount = (renderedHtml.match(/<main\b/gi) || []).length;
  if (mainCount !== 1) {
    fail(path + " must render exactly one main landmark; found " + mainCount + ".");
  }
  if (!/<html\b[^>]*\blang=["']en["']/i.test(html)) {
    fail(path + ' is missing <html lang="en">.');
  }
  if (!metaContent(html, "description")) {
    fail(path + " is missing a non-empty meta description.");
  }
  if (!/href=["']#main-content["']/i.test(html) || !/id=["']main-content["']/i.test(html)) {
    fail(path + " is missing working skip-navigation markup.");
  }
  if (hasNoindex(html)) {
    fail(path + " is in the sitemap but renders noindex.");
  }
  validateJsonLd(html, path);

  const canonical = extractCanonical(html);
  if (!canonical) {
    fail(path + " is missing a canonical link.");
  } else {
    const canonicalResolved = new URL(canonical, site.origin);
    if (
      canonicalResolved.origin !== canonicalUrl.origin ||
      normalizedPath(canonicalResolved.href) !== normalizedPath(canonicalUrl.href)
    ) {
      fail(path + " canonical mismatch: " + canonicalResolved.href + " vs " + canonicalUrl.href);
    }
  }

  const ogTitle = propertyMetaContent(html, "og:title");
  const ogDescription = propertyMetaContent(html, "og:description");
  const ogUrl = propertyMetaContent(html, "og:url");
  if (!ogTitle) fail(path + " is missing og:title.");
  if (!ogDescription) fail(path + " is missing og:description.");
  if (!ogUrl) {
    fail(path + " is missing og:url.");
  } else {
    try {
      const resolved = new URL(ogUrl, site.origin);
      if (
        resolved.origin !== canonicalUrl.origin ||
        normalizedPath(resolved.href) !== normalizedPath(canonicalUrl.href)
      ) {
        fail(path + " og:url mismatch: " + resolved.href + " vs " + canonicalUrl.href);
      }
    } catch {
      fail(path + " has invalid og:url: " + ogUrl);
    }
  }

  if (!metaContent(html, "twitter:title")) fail(path + " is missing twitter:title.");
  if (!metaContent(html, "twitter:description")) fail(path + " is missing twitter:description.");
  if (!metaContent(html, "twitter:card")) fail(path + " is missing twitter:card.");
}

async function crawlSitemapPages(locations) {
  const batchSize = 8;
  for (let index = 0; index < locations.length; index += batchSize) {
    await Promise.all(locations.slice(index, index + batchSize).map(checkSitemapPage));
  }

  const titleOwners = new Map();
  for (const item of observedPageTitles) {
    const owner = titleOwners.get(item.title);
    if (owner && owner !== item.path) {
      fail("Duplicate page title: " + item.title + " -> " + owner + " and " + item.path);
    } else {
      titleOwners.set(item.title, item.path);
    }
  }
}

await waitForServer();

const home = await request("/");
expectStatus(home, 200, "/");
expectHeader(home, "content-type", "text/html", "/");
for (const header of ["content-security-policy", "strict-transport-security", "x-content-type-options", "x-frame-options", "referrer-policy"]) {
  if (home && !home.headers.get(header)) fail(`/ missing security header ${header}`);
}

if (home) {
  const robotsHeader = home.headers.get("x-robots-tag") || "";
  if (/noindex/i.test(robotsHeader)) {
    fail("/ unexpectedly emits a noindex header in production-mode smoke.");
  }
  expectHeader(home, "content-security-policy", "default-src 'self'", "/");
  expectHeader(home, "content-security-policy", "frame-ancestors 'none'", "/");
  expectHeader(home, "content-security-policy", "object-src 'none'", "/");
}

await expectJson("/api/health", (body, response) => {
  if (body.ok !== true) fail("/api/health did not report ok=true");
  if (body.status !== "pre-launch") fail("/api/health status is not pre-launch");
  if (!body.deployment || typeof body.deployment !== "object") {
    fail("/api/health deployment field is missing.");
  } else if (expectedCommit) {
    const commit = typeof body.deployment.commit === "string" ? body.deployment.commit.toLowerCase() : "";
    if (!commit) {
      fail("/api/health deployment commit is missing.");
    } else if (!expectedCommit.startsWith(commit) && !commit.startsWith(expectedCommit)) {
      fail("/api/health deployment commit does not match the expected CI commit.");
    }
    if (body.deployment.environment !== "development") {
      fail("/api/health deployment environment did not preserve the CI test environment.");
    }
  }
  expectHeader(response, "cache-control", "no-store", "/api/health");
  expectHeader(response, "access-control-allow-origin", "*", "/api/health");
  expectHeader(response, "x-robots-tag", "noindex", "/api/health");
});

await expectJson("/api/status", (body, response) => {
  if (body.status !== "pre-launch") fail("/api/status status is not pre-launch");
  if (body.checkoutEnabled !== false) fail("/api/status checkoutEnabled must remain false");
  if (body.enquiriesOpen !== true) fail("/api/status enquiriesOpen must remain true");
  expectHeader(response, "cache-control", "no-store", "/api/status");
});

await expectJson("/api/catalog", (body, response) => {
  if (body.status !== "pre-launch") fail("/api/catalog status is not pre-launch");
  if (!body.bundle || body.bundle.status !== "Pre-launch") fail("/api/catalog bundle status is not Pre-launch");
  if (body.bundle?.availableForPurchase !== false) fail("/api/catalog bundle must remain unavailable");
  if (!String(body.bundle?.plannedPrice || "").startsWith("US$")) fail("/api/catalog bundle price must use explicit USD labeling");
  if (!Array.isArray(body.bundle?.includes) || body.bundle.includes.length !== 3) fail("/api/catalog bundle must include three products");
  expectHeader(response, "cache-control", "s-maxage=", "/api/catalog");
  expectHeader(response, "access-control-allow-origin", "*", "/api/catalog");
  expectHeader(response, "cross-origin-resource-policy", "cross-origin", "/api/catalog");
});

await expectJson("/api/company", (body) => {
  if (body.status !== "pre-launch") fail("/api/company status is not pre-launch");
  if (body.checkoutEnabled !== false) fail("/api/company checkoutEnabled must remain false");
  if (!Array.isArray(body.plannedCoreProducts) || body.plannedCoreProducts.length !== 4) {
    fail("/api/company plannedCoreProducts must include three core whisks and the Discovery Trio");
  }
});

await expectJson("/api/search?q=birch", (body, response) => {
  if (body.query !== "birch") fail("/api/search did not normalize query");
  if (!Array.isArray(body.results) || body.results.length === 0) fail("/api/search returned no birch results");
  expectHeader(response, "cache-control", "no-store", "/api/search");
});

const apiIndexResponse = await request("/api");
expectStatus(apiIndexResponse, 200, "/api");
expectHeader(apiIndexResponse, "content-type", "application/json", "/api");
if (apiIndexResponse?.ok) {
  const index = await apiIndexResponse.json();
  const endpoints = Array.isArray(index.endpoints) ? index.endpoints : [];

  if (!endpoints.length) {
    fail("/api index advertises no endpoints.");
  } else {
    const paths = endpoints
      .map((item) => (item && typeof item.path === "string" ? item.path : ""))
      .filter(Boolean);
    const unique = [...new Set(paths)];
    if (unique.length !== paths.length) fail("/api index contains duplicate endpoint paths.");

    for (const path of unique) {
      const response = await request(path);
      expectStatus(response, 200, path);
      if (!response?.ok) continue;

      if (path.startsWith("/api/") || path === "/api") {
        expectHeader(response, "x-robots-tag", "noindex", path);
      }

      if (path.endsWith(".csv")) {
        expectHeader(response, "content-type", "text/csv", path);
        expectHeader(response, "content-disposition", "filename=", path);
      } else if (path === "/feed.xml") {
        expectHeader(response, "content-type", "application/rss+xml", path);
      } else if (path === "/sitemap.xml") {
        expectHeader(response, "content-type", "xml", path);
      } else if (
        path === "/robots.txt" ||
        path === "/llms.txt" ||
        path === "/humans.txt" ||
        path === "/.well-known/security.txt"
      ) {
        expectHeader(response, "content-type", "text/plain", path);
      } else {
        expectHeader(response, "content-type", "application/json", path);
      }
    }
  }
}

for (const [path, type] of [
  ["/robots.txt", "text/plain"],
  ["/sitemap.xml", "xml"],
  ["/feed.xml", "application/rss+xml"],
  ["/feed.json", "application/json"],
  ["/.well-known/security.txt", "text/plain"],
  ["/humans.txt", "text/plain"],
  ["/llms.txt", "text/plain"],
  ["/manifest.webmanifest", "application/manifest+json"],
]) {
  const response = await request(path);
  expectStatus(response, 200, path);
  expectHeader(response, "content-type", type, path);
}

const productionRobots = await request("/robots.txt");
if (productionRobots?.ok) {
  const body = await productionRobots.text();
  if (/^Disallow:\s*\/$/m.test(body)) {
    fail("Production-mode robots.txt disallows the entire site.");
  }
  if (!body.includes(`Sitemap: ${site.origin}/sitemap.xml`)) {
    fail("Production-mode robots.txt is missing the canonical sitemap.");
  }
}

const sitemapResponse = await request("/sitemap.xml");
if (sitemapResponse?.ok) {
  const sitemap = await sitemapResponse.text();
  if (sitemap.includes(`<loc>${site.origin}/search</loc>`)) fail("Sitemap includes noindex /search.");
  if (sitemap.includes(`<loc>${site.origin}/markets/united-states</loc>`)) {
    fail("Sitemap includes non-canonical US market route.");
  }
  if (!sitemap.includes(`<loc>${site.origin}/usa</loc>`)) fail("Sitemap missing canonical /usa.");

  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (!locations.length) {
    fail("Sitemap contains no page URLs.");
  } else {
    const unique = [...new Set(locations)];
    if (unique.length !== locations.length) fail("Sitemap contains duplicate URLs.");
    await crawlSitemapPages(unique);
  }
}

const searchPage = await request("/search?q=birch");
expectStatus(searchPage, 200, "/search?q=birch");
if (searchPage?.ok) {
  const html = await searchPage.text();
  if (!hasNoindex(html)) fail("/search must render noindex.");
}

const rssResponse = await request("/feed.xml");
if (rssResponse?.ok) {
  const rss = await rssResponse.text();
  if (!rss.includes('rel="self"')) fail("RSS feed missing self link.");
  if (!rss.includes("<language>en</language>")) fail("RSS feed missing language.");
}

const securityResponse = await request("/.well-known/security.txt");
if (securityResponse?.ok) {
  const body = await securityResponse.text();
  if (!body.includes(`Contact: mailto:${site.publicEmail}`)) fail("security.txt missing contact.");
  if (!body.includes(`Canonical: ${site.origin}/.well-known/security.txt`)) fail("security.txt missing canonical.");

  const expiresValue = body.match(/^Expires:\s*(.+)$/m)?.[1]?.trim() || "";
  const expiresAt = Date.parse(expiresValue);
  if (!expiresValue || Number.isNaN(expiresAt)) {
    fail("security.txt has no valid Expires timestamp.");
  } else {
    const daysRemaining = (expiresAt - Date.now()) / 86_400_000;
    if (daysRemaining < 30) {
      fail("security.txt expires in less than 30 days.");
    }
  }
}

for (const path of [
  "/shop/definitely-not-a-product",
  "/journal/definitely-not-an-article",
  "/markets/definitely-not-a-market",
]) {
  const response = await request(path);
  expectStatus(response, 404, path);
  if (response) {
    expectHeader(response, "content-type", "text/html", path);
    const html = await response.text();
    if (!hasNoindex(html)) fail(path + " 404 response must render noindex.");
  }
}

for (const { source, destination } of redirects) {
  const response = await request(source);
  if (!response) continue;

  if (![301, 307, 308].includes(response.status)) {
    fail(`${source} did not redirect; got ${response.status}`);
    continue;
  }

  const location = response.headers.get("location") || "";
  const resolved = new URL(location, baseUrl);
  if (resolved.pathname !== destination) {
    fail(`${source} redirected to unexpected location: ${location}`);
    continue;
  }

  const target = await request(destination);
  expectStatus(target, 200, destination);
}

async function verifyEnquiryResponse(response, expectedStatus, label) {
  expectStatus(response, expectedStatus, label);
  if (!response) return {};

  expectHeader(response, "content-type", "application/json", label);
  expectHeader(response, "cache-control", "no-store", label);
  expectHeader(response, "cross-origin-resource-policy", "same-origin", label);
  expectHeader(response, "x-robots-tag", "noindex", label);

  const requestId = response.headers.get("x-request-id") || "";
  if (!requestId) fail(label + " missing X-Request-ID.");
  if (response.headers.get("access-control-allow-origin")) {
    fail(label + " must not expose wildcard CORS.");
  }

  try {
    const body = await response.json();
    if (requestId && body.requestId !== requestId) {
      fail(label + " response requestId does not match X-Request-ID.");
    }
    return body;
  } catch {
    fail(label + " did not return valid JSON.");
    return {};
  }
}

const enquiryGet = await request("/api/enquiry");
expectStatus(enquiryGet, 405, "/api/enquiry GET");

const wrongType = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "text/plain" },
  body: "not-json",
});
await verifyEnquiryResponse(wrongType, 415, "/api/enquiry wrong content type");

const jsonPatchType = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json-patch+json" },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    message: "A valid test enquiry.",
  }),
});
await verifyEnquiryResponse(
  jsonPatchType,
  415,
  "/api/enquiry JSON patch media type"
);

const jsonWithCharset = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    name: "A",
    email: "test@example.com",
    message: "A valid test enquiry.",
  }),
});
const jsonWithCharsetBody = await verifyEnquiryResponse(
  jsonWithCharset,
  400,
  "/api/enquiry JSON charset media type"
);
if (jsonWithCharsetBody.error !== "Please enter your name.") {
  fail("/api/enquiry JSON charset media type was not parsed as normal JSON.");
}

const malformed = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: "{",
});
await verifyEnquiryResponse(malformed, 400, "/api/enquiry malformed JSON");

const nonObject = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify([]),
});
const nonObjectBody = await verifyEnquiryResponse(nonObject, 400, "/api/enquiry non-object JSON");
if (nonObjectBody.error !== "Invalid request.") {
  fail("/api/enquiry non-object JSON returned unexpected error text.");
}

const invalidNameType = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: { nested: true },
    email: "test@example.com",
    message: "A valid test enquiry.",
  }),
});
const invalidNameTypeBody = await verifyEnquiryResponse(
  invalidNameType,
  400,
  "/api/enquiry invalid name field type"
);
if (invalidNameTypeBody.error !== "Invalid field type.") {
  fail("/api/enquiry invalid name field type returned unexpected error text.");
}

const invalidMessageType = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    message: 12345,
  }),
});
const invalidMessageTypeBody = await verifyEnquiryResponse(
  invalidMessageType,
  400,
  "/api/enquiry invalid message field type"
);
if (invalidMessageTypeBody.error !== "Invalid field type.") {
  fail("/api/enquiry invalid message field type returned unexpected error text.");
}

const invalidName = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "A",
    email: "test@example.com",
    message: "A valid test enquiry.",
  }),
});
const invalidNameBody = await verifyEnquiryResponse(invalidName, 400, "/api/enquiry invalid name");
if (invalidNameBody.error !== "Please enter your name.") {
  fail("/api/enquiry invalid-name validation returned unexpected error text.");
}

const invalidEmail = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "not-an-email",
    message: "A valid test enquiry.",
  }),
});
const invalidEmailBody = await verifyEnquiryResponse(invalidEmail, 400, "/api/enquiry invalid email");
if (invalidEmailBody.error !== "Please enter a valid email address.") {
  fail("/api/enquiry invalid-email validation returned unexpected error text.");
}

const shortMessage = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    message: "short",
  }),
});
const shortMessageBody = await verifyEnquiryResponse(shortMessage, 400, "/api/enquiry short message");
if (!String(shortMessageBody.error || "").includes("10 and 5000")) {
  fail("/api/enquiry short-message validation returned unexpected error text.");
}

const longMessage = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    message: "x".repeat(5001),
  }),
});
await verifyEnquiryResponse(longMessage, 400, "/api/enquiry long message");

const oversized = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    message: "x".repeat(21_000),
  }),
});
const oversizedBody = await verifyEnquiryResponse(oversized, 413, "/api/enquiry oversized body");
if (oversizedBody.error !== "Request too large.") {
  fail("/api/enquiry oversized-body validation returned unexpected error text.");
}

const honeypot = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "Bot User",
    email: "bot@example.com",
    message: "A bot-shaped test enquiry.",
    website: "https://spam.example",
  }),
});
const honeypotBody = await verifyEnquiryResponse(honeypot, 200, "/api/enquiry honeypot");
if (honeypotBody.ok !== true) {
  fail("/api/enquiry honeypot did not return the expected silent success.");
}

const fastSubmit = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "Fast User",
    email: "fast@example.com",
    message: "A fast-submit test enquiry.",
    startedAt: String(Date.now()),
  }),
});
const fastSubmitBody = await verifyEnquiryResponse(fastSubmit, 200, "/api/enquiry fast submit");
if (fastSubmitBody.ok !== true) {
  fail("/api/enquiry fast-submit guard did not return the expected silent success.");
}

const foreignOrigin = await request("/api/enquiry", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    origin: "https://example.com",
  },
  body: JSON.stringify({ name: "Test User", email: "test@example.com", message: "A valid test enquiry." }),
});
await verifyEnquiryResponse(foreignOrigin, 403, "/api/enquiry foreign origin");

const crossSite = await request("/api/enquiry", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "sec-fetch-site": "cross-site",
  },
  body: JSON.stringify({ name: "Test User", email: "test@example.com", message: "A valid test enquiry." }),
});
await verifyEnquiryResponse(crossSite, 403, "/api/enquiry cross-site fetch metadata");

const noProvider = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    message: "A valid local smoke test enquiry.",
    startedAt: String(Date.now() - 5000),
  }),
});
const noProviderBody = await verifyEnquiryResponse(
  noProvider,
  503,
  "/api/enquiry provider fallback"
);
if (noProviderBody.fallback !== "mailto") {
  fail("/api/enquiry missing mailto fallback when provider is unavailable.");
}

if (failures.length) {
  console.error("Local production smoke failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("Local production smoke passed.");
