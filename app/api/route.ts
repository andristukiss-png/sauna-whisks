import { publicJson } from "@/lib/publicApi";
import { publicDataEndpoints } from "@/lib/publicData";
import { launchStatus } from "@/lib/status";
import site from "@/config/site.json";

export function GET() {
  return publicJson({
    service: `${site.name} public data`,
    status: launchStatus.status,
    endpoints: publicDataEndpoints.map(({ path, label, group }) => ({ path, label, group })),
  });
}
