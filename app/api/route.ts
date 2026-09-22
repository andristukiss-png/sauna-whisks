import { publicJson } from "@/lib/publicApi";
import { publicDataEndpoints } from "@/lib/publicData";

export function GET() {
  return publicJson({
    service: "SaunaWhisks.com public data",
    status: "pre-launch",
    endpoints: publicDataEndpoints.map(({ path, label, group }) => ({ path, label, group })),
  });
}
