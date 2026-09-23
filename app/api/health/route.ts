import site from "@/config/site.json";
import { noStoreJson } from "@/lib/publicApi";
import { launchStatus } from "@/lib/status";

function deploymentInfo() {
  const environment = (process.env.VERCEL_ENV || "").trim();
  const commit = (process.env.VERCEL_GIT_COMMIT_SHA || "").trim();

  return {
    ...(environment ? { environment } : {}),
    ...(commit ? { commit: commit.slice(0, 12) } : {}),
  };
}

export function GET() {
  return noStoreJson({
    ok: true,
    service: site.host,
    status: launchStatus.status,
    deployment: deploymentInfo(),
  });
}
