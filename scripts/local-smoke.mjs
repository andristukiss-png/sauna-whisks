const baseUrl = (process.env.LOCAL_SMOKE_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const failures = [];
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

await waitForServer();

const home = await request("/");
expectStatus(home, 200, "/");
expectHeader(home, "content-type", "text/html", "/");
for (const header of ["content-security-policy", "strict-transport-security", "x-content-type-options", "x-frame-options", "referrer-policy"]) {
  if (home && !home.headers.get(header)) fail(`/ missing security header ${header}`);
}

await expectJson("/api/health", (body, response) => {
  if (body.ok !== true) fail("/api/health did not report ok=true");
  if (body.status !== "pre-launch") fail("/api/health status is not pre-launch");
  expectHeader(response, "cache-control", "no-store", "/api/health");
  expectHeader(response, "access-control-allow-origin", "*", "/api/health");
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
});

await expectJson("/api/search?q=birch", (body, response) => {
  if (body.query !== "birch") fail("/api/search did not normalize query");
  if (!Array.isArray(body.results) || body.results.length === 0) fail("/api/search returned no birch results");
  expectHeader(response, "cache-control", "no-store", "/api/search");
});

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
  if (sitemap.includes("<loc>https://saunawhisks.com/search</loc>")) fail("Sitemap includes noindex /search.");
  if (sitemap.includes("<loc>https://saunawhisks.com/markets/united-states</loc>")) {
    fail("Sitemap includes non-canonical US market route.");
  }
  if (!sitemap.includes("<loc>https://saunawhisks.com/usa</loc>")) fail("Sitemap missing canonical /usa.");
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
  if (!body.includes("Contact: mailto:info@SaunaWhisks.com")) fail("security.txt missing contact.");
  if (!body.includes("Canonical: https://saunawhisks.com/.well-known/security.txt")) fail("security.txt missing canonical.");
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
}

if (failures.length) {
  console.error("Local production smoke failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("Local production smoke passed.");
