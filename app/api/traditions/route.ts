import site from "@/config/site.json";
import { traditionDetails } from "@/lib/traditionDetails";
import { publicJson } from "@/lib/publicApi";

export function GET(){
  return publicJson({
    count:traditionDetails.length,
    traditions:traditionDetails.map((item)=>({
      slug:item.slug,
      name:item.name,
      region:item.region,
      summary:item.summary,
      terminology:item.terminology,
      url:`${site.origin}/traditions/${item.slug}`
    }))
  });
}
