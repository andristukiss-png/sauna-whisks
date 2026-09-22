import { editorialReviewDate, sourceHierarchy } from "@/lib/editorial";
import { publicJson } from "@/lib/publicApi";

export function GET(){
  return publicJson({
    lastEditorialReview:editorialReviewDate,
    sourceHierarchy:sourceHierarchy.map(([category,description])=>({category,description})),
    policies:{
      editorial:"https://saunawhisks.com/editorial-policy",
      corrections:"https://saunawhisks.com/corrections",
      claims:"https://saunawhisks.com/claims",
      sources:"https://saunawhisks.com/sources"
    }
  });
}
