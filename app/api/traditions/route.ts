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
      url:`https://saunawhisks.com/traditions/${item.slug}`
    }))
  });
}
