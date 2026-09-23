import fs from "node:fs";
import dns from "node:dns/promises";
import tls from "node:tls";

const site = JSON.parse(fs.readFileSync("config/site.json", "utf8"));
const redirects = JSON.parse(fs.readFileSync("config/redirects.json", "utf8"));
const canonicalProductionHost = site.host;
const baseUrl = (process.env.SAUNAWHISKS_BASE_URL || `https://${canonicalProductionHost}`).replace(/\/$/, "");
const base = new URL(baseUrl);
const checkCanonicalWww = base.hostname === canonicalProductionHost;
const wwwUrl = `${base.protocol}//www.${canonicalProductionHost}`;

if (base.protocol !== "https:") {
  console.error("Production verification requires an HTTPS base URL.");
  process.exit(1);
}

const failures = [];
const expectedCommit = (process.env.SAUNAWHISKS_EXPECTED_COMMIT || "").trim().toLowerCase();
if (expectedCommit && !/^[0-9a-f]{7,40}$/.test(expectedCommit)) {
  console.error("Expected commit must be 7-40 hexadecimal characters.");
  process.exit(1);
}

async function checkTlsCertificate(host) {
  console.log("TLS:");
  await new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      resolve();
    };

    const socket = tls.connect(
      {
        host,
        port: 443,
        servername: host,
        rejectUnauthorized: true,
      },
      () => {
        const certificate = socket.getPeerCertificate();
        const validTo = Date.parse(certificate.valid_to || "");
        const protocol = socket.getProtocol() || "(unknown)";
        console.log(`- ${host}: protocol=${protocol} valid_to=${certificate.valid_to || "(unknown)"}`);

        if (!certificate.valid_to || Number.isNaN(validTo)) {
          failures.push(`${host} TLS certificate has no valid expiry date`);
        } else {
          const daysRemaining = (validTo - Date.now()) / 86_400_000;
          if (daysRemaining < 7) {
            failures.push(`${host} TLS certificate expires in less than 7 days`);
          }
        }

        socket.end();
        finish();
      }
    );

    socket.setTimeout(10_000, () => {
      socket.destroy(new Error("TLS connection timed out"));
    });

    socket.on("error", (error) => {
      failures.push(`${host} TLS check failed: ${error.code || error.message}`);
      finish();
    });

    socket.on("close", finish);
  });
}

async function reportDns() {
  console.log("DNS:");
  try {
    const addresses = await dns.resolve4(base.hostname);
    console.log(`- ${base.hostname} A: ${addresses.join(", ") || "(none)"}`);
  } catch (error) {
    console.log(`- ${base.hostname} A: ERROR ${error.code || error.message}`);
  }

  if (!checkCanonicalWww) {
    console.log("- canonical www DNS check skipped for alternate base URL");
    return;
  }

  try {
    const cnames = await dns.resolveCname(`www.${canonicalProductionHost}`);
    console.log(`- www.${canonicalProductionHost} CNAME: ${cnames.join(", ") || "(none)"}`);
  } catch (error) {
    console.log(`- www.${canonicalProductionHost} CNAME: ${error.code || error.message}`);
  }
}

async function check(
  url,
  {
    redirect = "follow",
    expectJson = false,
    verifyDeployment = false,
    contentTypeIncludes,
    requiredHeaders = [],
    headerIncludes = [],
    forbiddenHeaders = [],
  } = {}
) {
  try {
    const response = await fetch(url, {
      redirect,
      headers: { "user-agent": "SaunaWhisks-production-smoke/1.0" },
      signal: AbortSignal.timeout(10_000),
    });

    const location = response.headers.get("location");
    console.log(`- ${url}: ${response.status}${location ? ` -> ${location}` : ""}`);

    if (response.status < 200 || response.status >= 400) {
      failures.push(`${url} returned ${response.status}`);
      return;
    }

    if (contentTypeIncludes) {
      const type = response.headers.get("content-type") || "";
      if (!type.includes(contentTypeIncludes)) {
        failures.push(`${url} content-type did not include ${contentTypeIncludes}`);
      }
    }

    for (const header of requiredHeaders) {
      if (!response.headers.get(header)) {
        failures.push(`${url} missing required header: ${header}`);
      }
    }

    for (const [header, expected] of headerIncludes) {
      const value = response.headers.get(header) || "";
      if (!value.toLowerCase().includes(expected.toLowerCase())) {
        failures.push(`${url} header ${header} did not include ${expected}; got "${value}"`);
      }
    }

    for (const header of forbiddenHeaders) {
      if (response.headers.get(header)) {
        failures.push(`${url} unexpectedly exposed forbidden header: ${header}`);
      }
    }

    if (expectJson) {
      const type = response.headers.get("content-type") || "";
      if (!type.includes("application/json")) {
        failures.push(`${url} did not return JSON`);
        return;
      }
      const body = await response.json();
      if (body?.ok !== true) failures.push(`${url} health payload did not report ok=true`);

      if (verifyDeployment) {
        const deployment = body?.deployment || {};
        const environment = typeof deployment.environment === "string" ? deployment.environment : "";
        const commit = typeof deployment.commit === "string" ? deployment.commit.toLowerCase() : "";
        console.log(`  deployment: env=${environment || "(unknown)"} commit=${commit || "(unknown)"}`);

        if (expectedCommit) {
          if (!commit) {
            failures.push(`${url} did not expose a deployment commit for expected-commit verification`);
          } else if (!expectedCommit.startsWith(commit) && !commit.startsWith(expectedCommit)) {
            failures.push(`${url} deployment commit ${commit} does not match expected ${expectedCommit}`);
          }
        }
      }
    }
  } catch (error) {
    console.log(`- ${url}: ERROR ${error.cause?.code || error.code || error.message}`);
    failures.push(`${url} could not be fetched`);
  }
}

async function checkProductionRobots() {
  const url = `${baseUrl}/robots.txt`;
  try {
    const response = await fetch(url, {
      headers: { "user-agent": "SaunaWhisks-production-smoke/1.0" },
      signal: AbortSignal.timeout(10_000),
    });
    console.log(`- ${url}: ${response.status}`);

    if (!response.ok) {
      failures.push(`${url} returned ${response.status}`);
      return;
    }

    const type = response.headers.get("content-type") || "";
    if (!type.includes("text/plain")) {
      failures.push(`${url} did not return text/plain`);
    }
    const body = await response.text();
    if (/^Disallow:\s*\/$/m.test(body)) {
      failures.push("production robots.txt disallows the entire site");
    }
    if (!body.includes(`Sitemap: ${site.origin}/sitemap.xml`)) {
      failures.push("production robots.txt does not advertise the canonical sitemap");
    }
    if (!/^Disallow:\s*\/api$/m.test(body)) {
      failures.push("production robots.txt does not disallow the API prefix");
    }
  } catch (error) {
    failures.push(`${url} could not be verified: ${error.cause?.code || error.code || error.message}`);
  }
}

async function checkSecurityTxt() {
  const url = `${baseUrl}/.well-known/security.txt`;
  try {
    const response = await fetch(url, {
      headers: { "user-agent": "SaunaWhisks-production-smoke/1.0" },
      signal: AbortSignal.timeout(10_000),
    });
    console.log(`- ${url}: ${response.status}`);

    if (!response.ok) {
      failures.push(`${url} returned ${response.status}`);
      return;
    }

    const type = response.headers.get("content-type") || "";
    if (!type.includes("text/plain")) {
      failures.push(`${url} did not return text/plain`);
    }

    for (const [header, expected] of [
      ["x-saunawhisks-data-version", "1"],
      ["access-control-allow-origin", "*"],
      ["cross-origin-resource-policy", "cross-origin"],
    ]) {
      const value = response.headers.get(header) || "";
      if (!value.toLowerCase().includes(expected.toLowerCase())) {
        failures.push(`${url} header ${header} did not include ${expected}; got "${value}"`);
      }
    }

    const body = await response.text();
    if (!body.includes(`Contact: mailto:${site.publicEmail}`)) {
      failures.push("security.txt contact does not match site config");
    }
    if (!body.includes(`Canonical: ${site.origin}/.well-known/security.txt`)) {
      failures.push("security.txt canonical URL does not match site config");
    }

    const expiresValue = body.match(/^Expires:\s*(.+)$/m)?.[1]?.trim() || "";
    const expiresAt = Date.parse(expiresValue);
    if (!expiresValue || Number.isNaN(expiresAt)) {
      failures.push("security.txt has no valid Expires timestamp");
    } else {
      const daysRemaining = (expiresAt - Date.now()) / 86_400_000;
      console.log(`  security.txt expires in ${daysRemaining.toFixed(1)} days`);
      if (daysRemaining < 30) {
        failures.push("security.txt expires in less than 30 days");
      }
    }
  } catch (error) {
    failures.push(`${url} could not be verified: ${error.cause?.code || error.code || error.message}`);
  }
}

async function checkRegisteredRedirects() {
  console.log("Redirects:");
  for (const { source, destination } of redirects) {
    const sourceUrl = `${baseUrl}${source}`;
    try {
      const response = await fetch(sourceUrl, {
        redirect: "manual",
        headers: { "user-agent": "SaunaWhisks-production-smoke/1.0" },
        signal: AbortSignal.timeout(10_000),
      });
      const location = response.headers.get("location") || "";
      console.log(`- ${source}: ${response.status}${location ? ` -> ${location}` : ""}`);

      if (![301, 307, 308].includes(response.status)) {
        failures.push(`${source} did not return a permanent-style redirect`);
        continue;
      }

      const resolved = new URL(location, baseUrl);
      if (resolved.pathname !== destination) {
        failures.push(`${source} redirected to ${resolved.pathname}, expected ${destination}`);
        continue;
      }
      if (resolved.origin !== base.origin) {
        failures.push(`${source} redirected off the tested origin to ${resolved.origin}`);
        continue;
      }

      const target = await fetch(`${baseUrl}${destination}`, {
        redirect: "follow",
        headers: { "user-agent": "SaunaWhisks-production-smoke/1.0" },
        signal: AbortSignal.timeout(10_000),
      });
      if (!target.ok) {
        failures.push(`${destination} redirect target returned ${target.status}`);
      }
    } catch (error) {
      failures.push(`${source} redirect check failed: ${error.cause?.code || error.code || error.message}`);
    }
  }
}

await checkTlsCertificate(base.hostname);
await reportDns();

console.log("HTTP:");
await check(`${baseUrl}/`, {
  contentTypeIncludes: "text/html",
  requiredHeaders: [
    "strict-transport-security",
    "x-content-type-options",
    "x-frame-options",
    "referrer-policy",
  ],
  forbiddenHeaders: ["x-powered-by"],
});
await check(`${baseUrl}/api/health`, {
  expectJson: true,
  verifyDeployment: true,
  headerIncludes: [
    ["cache-control", "no-store"],
    ["access-control-allow-origin", "*"],
    ["cross-origin-resource-policy", "cross-origin"],
    ["x-robots-tag", "noindex"],
    ["x-saunawhisks-data-version", "1"],
    ["access-control-expose-headers", "x-saunawhisks-data-version"],
  ],
});
await checkProductionRobots();
await check(`${baseUrl}/sitemap.xml`, { contentTypeIncludes: "xml" });
await check(`${baseUrl}/feed.xml`, {
  contentTypeIncludes: "application/rss+xml",
  headerIncludes: [
    ["x-saunawhisks-data-version", "1"],
    ["access-control-allow-origin", "*"],
    ["cross-origin-resource-policy", "cross-origin"],
  ],
});
await check(`${baseUrl}/feed.json`, {
  contentTypeIncludes: "application/json",
  headerIncludes: [
    ["x-saunawhisks-data-version", "1"],
    ["access-control-allow-origin", "*"],
    ["cross-origin-resource-policy", "cross-origin"],
  ],
});
await checkSecurityTxt();

await checkRegisteredRedirects();

async function checkWwwRedirect(pathWithQuery, expectedPath, expectedSearch = "") {
  const source = new URL(pathWithQuery, wwwUrl);
  try {
    const response = await fetch(source, {
      redirect: "manual",
      headers: { "user-agent": "SaunaWhisks-production-smoke/1.0" },
      signal: AbortSignal.timeout(10_000),
    });
    const location = response.headers.get("location");
    console.log(`- ${source.href}: ${response.status}${location ? ` -> ${location}` : ""}`);

    if (![301, 302, 307, 308].includes(response.status)) {
      failures.push(`${source.href} did not redirect`);
      return;
    }
    if (!location) {
      failures.push(`${source.href} redirect is missing a Location header`);
      return;
    }

    try {
      const target = new URL(location, source);
      if (target.origin !== site.origin) {
        failures.push(`${source.href} redirected to unexpected origin ${target.origin}`);
      }
      if (target.pathname !== expectedPath || target.search !== expectedSearch || target.hash) {
        failures.push(`${source.href} did not preserve the expected path/query: ${target.href}`);
      }
    } catch {
      failures.push(`${source.href} returned an invalid redirect Location: ${location}`);
    }
  } catch (error) {
    failures.push(`${source.href} redirect check failed: ${error.cause?.code || error.code || error.message}`);
  }
}

if (checkCanonicalWww) {
  try {
    const response = await fetch(wwwUrl, {
      redirect: "manual",
      headers: { "user-agent": "SaunaWhisks-production-smoke/1.0" },
      signal: AbortSignal.timeout(10_000),
    });
    const location = response.headers.get("location");
    console.log(`- ${wwwUrl}: ${response.status}${location ? ` -> ${location}` : ""}`);
    if (![301, 302, 307, 308].includes(response.status)) {
      failures.push(`${wwwUrl} did not redirect`);
    } else if (!location) {
      failures.push(`${wwwUrl} redirect is missing a Location header`);
    } else {
      try {
        const target = new URL(location, wwwUrl);
        if (target.origin !== site.origin) {
          failures.push(`${wwwUrl} redirected to unexpected origin ${target.origin}`);
        }
        if (target.pathname !== "/" || target.search || target.hash) {
          failures.push(`${wwwUrl} root redirect changed the root URL: ${target.href}`);
        }
      } catch {
        failures.push(`${wwwUrl} returned an invalid redirect Location: ${location}`);
      }
    }
  } catch (error) {
    console.log(`- ${wwwUrl}: ERROR ${error.cause?.code || error.code || error.message}`);
    failures.push(`${wwwUrl} could not be fetched`);
  }

  await checkWwwRedirect("/api/health?redirect_probe=1", "/api/health", "?redirect_probe=1");
} else {
  console.log("- canonical www redirect check skipped for alternate base URL");
}

if (failures.length) {
  console.error("\nProduction verification failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("\nProduction verification passed.");
