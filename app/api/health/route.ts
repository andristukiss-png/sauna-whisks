import { noStoreJson } from "@/lib/publicApi";
export function GET() {
  return noStoreJson({
    ok: true,
    service: "saunawhisks.com",
    status: "pre-launch",
  });
}
