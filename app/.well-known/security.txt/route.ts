import site from "@/config/site.json";
import { publicText } from "@/lib/publicApi";

export function GET() {
  return publicText(
    [
      "Contact: mailto:${site.publicEmail}",
      "Canonical: ${site.origin}/.well-known/security.txt",
      "Preferred-Languages: en",
      "Expires: 2027-09-22T00:00:00.000Z",
    ].join("\n"),
    { maxAge: 86400 }
  );
}
