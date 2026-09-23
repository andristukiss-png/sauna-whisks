import { articleSources } from "@/lib/sources";
import { publicJson } from "@/lib/publicApi";

export function GET() {
  return publicJson({ count: articleSources.length, sources: articleSources });
}
