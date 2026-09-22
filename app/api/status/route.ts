import { noStoreJson } from "@/lib/publicApi";
export function GET() {
  return noStoreJson({
    status: "pre-launch",
    checkoutEnabled: false,
    enquiriesOpen: true,
    sourceOfTruth: "GitHub main",
    contact: "info@SaunaWhisks.com",
  });
}
