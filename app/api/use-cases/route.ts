import site from "@/config/site.json";
import { useCases } from "@/lib/useCases";
import { publicJson } from "@/lib/publicApi";

export function GET(){
  return publicJson({
    count:useCases.length,
    useCases:useCases.map((item)=>({
      slug:item.slug,
      name:item.name,
      summary:item.summary,
      recommendation:item.recommendation,
      url:`${site.origin}/use-cases/${item.slug}`
    }))
  });
}
