import dns from "node:dns/promises";

const canonicalProductionHost = "saunawhisks.com";
const baseUrl = (process.env.SAUNAWHISKS_BASE_URL || `https://${canonicalProductionHost}`).replace(/\/$/, "");
const base = new URL(baseUrl);
const checkCanonicalWww = base.hostname === canonicalProductionHost;
const wwwUrl = `${base.protocol}//www.${canonicalProductionHost}`;

if (base.protocol !== "https:") {
  console.error("Production verification requires an HTTPS base URL.");
  process.exit(1);
}

const failures = [];

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

async function check(url, { redirect = "follow", expectJson = false } = {}) {
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

    if (expectJson) {
      const type = response.headers.get("content-type") || "";
      if (!type.includes("application/json")) {
        failures.push(`${url} did not return JSON`);
        return;
      }
      const body = await response.json();
      if (body?.ok !== true) failures.push(`${url} health payload did not report ok=true`);
    }
  } catch (error) {
    console.log(`- ${url}: ERROR ${error.cause?.code || error.code || error.message}`);
    failures.push(`${url} could not be fetched`);
  }
}

await reportDns();

console.log("HTTP:");
await check(`${baseUrl}/`);
await check(`${baseUrl}/api/health`, { expectJson: true });
await check(`${baseUrl}/robots.txt`);
await check(`${baseUrl}/sitemap.xml`);

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
