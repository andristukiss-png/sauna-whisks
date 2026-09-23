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
});
await check(`${baseUrl}/api/health`, { expectJson: true, verifyDeployment: true });
await check(`${baseUrl}/robots.txt`, { contentTypeIncludes: "text/plain" });
await check(`${baseUrl}/sitemap.xml`, { contentTypeIncludes: "xml" });
await check(`${baseUrl}/feed.xml`, { contentTypeIncludes: "application/rss+xml" });
await check(`${baseUrl}/feed.json`, { contentTypeIncludes: "application/json" });
await check(`${baseUrl}/.well-known/security.txt`, { contentTypeIncludes: "text/plain" });

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
    } else if (!location || !location.startsWith(`https://${canonicalProductionHost}`)) {
      failures.push(`${wwwUrl} redirected somewhere other than https://${canonicalProductionHost}`);
    }
  } catch (error) {
    console.log(`- ${wwwUrl}: ERROR ${error.cause?.code || error.code || error.message}`);
    failures.push(`${wwwUrl} could not be fetched`);
  }
} else {
  console.log("- canonical www redirect check skipped for alternate base URL");
}

if (failures.length) {
  console.error("\nProduction verification failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("\nProduction verification passed.");
