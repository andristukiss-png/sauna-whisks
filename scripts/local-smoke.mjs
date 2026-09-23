import fs from "node:fs";

const site = JSON.parse(fs.readFileSync("config/site.json", "utf8"));
const baseUrl = (process.env.LOCAL_SMOKE_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const failures = [];
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
      JSON.parse(body);
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
  if (!/<h1\b[^>]*>[\s\S]*?<\/h1>/i.test(html)) {
    fail(path + " is missing an H1.");
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
  expectHeader(home, "content-security-policy", "default-src 'self'", "/");
  expectHeader(home, "content-security-policy", "frame-ancestors 'none'", "/");
  expectHeader(home, "content-security-policy", "object-src 'none'", "/");
}

await expectJson("/api/health", (body, response) => {
  if (body.ok !== true) fail("/api/health did not report ok=true");
  if (body.status !== "pre-launch") fail("/api/health status is not pre-launch");
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
  expectHeader(response, "cache-control", "s-maxage=", "/api/catalog");
  expectHeader(response, "access-control-allow-origin", "*", "/api/catalog");
  expectHeader(response, "cross-origin-resource-policy", "cross-origin", "/api/catalog");
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
}

for (const path of [
  "/shop/definitely-not-a-product",
  "/journal/definitely-not-an-article",
  "/markets/definitely-not-a-market",
]) {
  const response = await request(path);
  expectStatus(response, 404, path);
}

const legacyUs = await request("/markets/united-states");
if (legacyUs) {
  if (![301, 307, 308].includes(legacyUs.status)) fail(`Legacy US route did not redirect; got ${legacyUs.status}`);
  const location = legacyUs.headers.get("location") || "";
  if (!location.endsWith("/usa")) fail(`Legacy US route redirected to unexpected location: ${location}`);
}

const wrongType = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "text/plain" },
  body: "not-json",
});
expectStatus(wrongType, 415, "/api/enquiry wrong content type");

const malformed = await request("/api/enquiry", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: "{",
});
expectStatus(malformed, 400, "/api/enquiry malformed JSON");

const foreignOrigin = await request("/api/enquiry", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    origin: "https://example.com",
  },
  body: JSON.stringify({ name: "Test User", email: "test@example.com", message: "A valid test enquiry." }),
});
expectStatus(foreignOrigin, 403, "/api/enquiry foreign origin");

const crossSite = await request("/api/enquiry", {
  method: "POST",
  headers: {
    "content-type": "application/json",
    "sec-fetch-site": "cross-site",
  },
  body: JSON.stringify({ name: "Test User", email: "test@example.com", message: "A valid test enquiry." }),
});
expectStatus(crossSite, 403, "/api/enquiry cross-site fetch metadata");

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
expectStatus(noProvider, 503, "/api/enquiry provider fallback");
if (noProvider) {
  const body = await noProvider.json();
  if (body.fallback !== "mailto") fail("/api/enquiry missing mailto fallback when provider is unavailable.");
  if (!noProvider.headers.get("x-request-id")) fail("/api/enquiry missing X-Request-ID.");
  expectHeader(noProvider, "cache-control", "no-store", "/api/enquiry provider fallback");
  expectHeader(noProvider, "cross-origin-resource-policy", "same-origin", "/api/enquiry provider fallback");
  if (noProvider.headers.get("access-control-allow-origin")) {
    fail("/api/enquiry must not expose wildcard CORS.");
  }
  expectHeader(noProvider, "x-robots-tag", "noindex", "/api/enquiry provider fallback");
}

if (failures.length) {
  console.error("Local production smoke failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("Local production smoke passed.");
