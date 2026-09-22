import { comparisons } from "@/lib/comparisons";
import { publicJson } from "@/lib/publicApi";

export function GET(){
  return publicJson({
    count:comparisons.length,
    comparisons:comparisons.map((item)=>({
      slug:item.slug,
      title:item.title,
      description:item.description,
      left:item.left.name,
      right:item.right.name,
      conclusion:item.conclusion,
      url:`https://saunawhisks.com/compare/${item.slug}`
    }))
  });
}
