import { techniques } from "@/lib/techniques";
import { publicJson } from "@/lib/publicApi";

export function GET(){
  return publicJson({
    count:techniques.length,
    techniques:techniques.map((item)=>({
      slug:item.slug,
      name:item.name,
      summary:item.summary,
      caution:item.caution,
      url:`https://saunawhisks.com/techniques/${item.slug}`
    }))
  });
}
