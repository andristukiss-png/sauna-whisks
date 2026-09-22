import { noStoreJson } from "@/lib/publicApi";
import { launchStatus } from "@/lib/status";

export function GET() {
  return noStoreJson(launchStatus);
}
