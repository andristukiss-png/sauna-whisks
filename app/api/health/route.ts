import site from "@/config/site.json";
import { noStoreJson } from "@/lib/publicApi";
export function GET() {
  return noStoreJson({
    ok: true,
    service: site.host,
    status: "pre-launch",
  });
}
