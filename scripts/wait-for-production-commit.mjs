import fs from "node:fs";

const site = JSON.parse(fs.readFileSync("config/site.json", "utf8"));
const expectedCommit = (process.env.SAUNAWHISKS_EXPECTED_COMMIT || "").trim().toLowerCase();
const baseUrl = (process.env.SAUNAWHISKS_BASE_URL || site.origin).replace(/\/$/, "");
const timeoutMs = Number(process.env.SAUNAWHISKS_DEPLOY_WAIT_MS || "120000");
const pollMs = Number(process.env.SAUNAWHISKS_DEPLOY_POLL_MS || "10000");

if (!expectedCommit || !/^[0-9a-f]{7,40}$/.test(expectedCommit)) {
  console.error("SAUNAWHISKS_EXPECTED_COMMIT must be 7-40 hexadecimal characters.");
  process.exit(1);
}

if (!Number.isFinite(timeoutMs) || timeoutMs < 0 || timeoutMs > 240000) {
  console.error("SAUNAWHISKS_DEPLOY_WAIT_MS must be between 0 and 240000.");
  process.exit(1);
}

if (!Number.isFinite(pollMs) || pollMs < 1000 || pollMs > 60000) {
  console.error("SAUNAWHISKS_DEPLOY_POLL_MS must be between 1000 and 60000.");
  process.exit(1);
}

const deadline = Date.now() + timeoutMs;
let attempt = 0;
let lastObserved = "";

function matchesExpected(commit) {
  return expectedCommit.startsWith(commit) || commit.startsWith(expectedCommit);
}

while (true) {
  attempt += 1;

  try {
    const response = await fetch(baseUrl + "/api/health", {
      headers: {
        "cache-control": "no-cache",
        "user-agent": "SaunaWhisks-deployment-convergence/1.0",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (response.ok) {
      const body = await response.json();
      const commit =
        typeof body?.deployment?.commit === "string"
          ? body.deployment.commit.toLowerCase()
          : "";

      lastObserved = commit || "(missing)";
      console.log(
        `Attempt ${attempt}: expected=${expectedCommit.slice(0, 12)} observed=${lastObserved}`
      );

      if (commit && matchesExpected(commit)) {
        console.log("Production deployment has converged to the expected commit.");
        process.exit(0);
      }
    } else {
      lastObserved = "HTTP " + response.status;
      console.log(`Attempt ${attempt}: health endpoint returned ${response.status}`);
    }
  } catch (error) {
    lastObserved = error.cause?.code || error.code || error.message;
    console.log(`Attempt ${attempt}: health check failed: ${lastObserved}`);
  }

  const remaining = deadline - Date.now();
  if (remaining <= 0) break;

  await new Promise((resolve) => setTimeout(resolve, Math.min(pollMs, remaining)));
}

console.error(
  `Production did not converge to expected commit ${expectedCommit.slice(0, 12)} within ${timeoutMs}ms. Last observed: ${lastObserved || "(none)"}`
);
process.exit(1);
