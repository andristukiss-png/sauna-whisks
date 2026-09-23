import site from "@/config/site.json";
import { editorialReviewDate, sourceHierarchy } from "@/lib/editorial";
import { publicJson } from "@/lib/publicApi";

export function GET(){
  return publicJson({
    lastEditorialReview:editorialReviewDate,
    sourceHierarchy:sourceHierarchy.map(([category,description])=>({category,description})),
    policies:{
      editorial:`${site.origin}/editorial-policy`,
      corrections:`${site.origin}/corrections`,
      claims:`${site.origin}/claims`,
      sources:`${site.origin}/sources`
    }
  });
}
