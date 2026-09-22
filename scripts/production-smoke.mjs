import dns from "node:dns/promises";

const baseUrl = (process.env.SAUNAWHISKS_BASE_URL || "https://saunawhisks.com").replace(/\/$/, "");
const canonical = new URL(baseUrl);
const wwwUrl = `${canonical.protocol}//www.${canonical.hostname}`;

if (canonical.protocol !== "https:") {
  console.error("Production verification requires an HTTPS base URL.");
  process.exit(1);
}

const failures = [];

async function reportDns() {
  console.log("DNS:");
  try {
    const addresses = await dns.resolve4(canonical.hostname);
    console.log(`- ${canonical.hostname} A: ${addresses.join(", ") || "(none)"}`);
  } catch (error) {
    console.log(`- ${canonical.hostname} A: ERROR ${error.code || error.message}`);
  }

  try {
    const cnames = await dns.resolveCname(`www.${canonical.hostname}`);
    console.log(`- www.${canonical.hostname} CNAME: ${cnames.join(", ") || "(none)"}`);
  } catch (error) {
    console.log(`- www.${canonical.hostname} CNAME: ${error.code || error.message}`);
  }
}

async function check(url, { redirect = "follow", expectJson = false } = {}) {
  try {
    const response = await fetch(url, {
      redirect,
      headers: { "user-agent": "SaunaWhisks-production-smoke/1.0" },
      signal: AbortSignal.timeout(10000),
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

try {
  const response = await fetch(wwwUrl, {
    redirect: "manual",
    headers: { "user-agent": "SaunaWhisks-production-smoke/1.0" },
    signal: AbortSignal.timeout(10000),
  });
  const location = response.headers.get("location");
  console.log(`- ${wwwUrl}: ${response.status}${location ? ` -> ${location}` : ""}`);
  if (![301, 302, 307, 308].includes(response.status)) {
    failures.push(`${wwwUrl} did not redirect`);
  } else if (!location || !location.startsWith(baseUrl)) {
    failures.push(`${wwwUrl} redirected somewhere other than ${baseUrl}`);
  }
} catch (error) {
  console.log(`- ${wwwUrl}: ERROR ${error.cause?.code || error.code || error.message}`);
  failures.push(`${wwwUrl} could not be fetched`);
}

if (failures.length) {
  console.error("\nProduction verification failed:");
  for (const failure of failures) console.error("- " + failure);
  process.exit(1);
}

console.log("\nProduction verification passed.");
