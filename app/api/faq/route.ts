import site from "@/config/site.json";
import { faqTopics } from "@/lib/faqTopics";
import { publicJson } from "@/lib/publicApi";

export function GET(){
  return publicJson({
    count:faqTopics.length,
    topics:faqTopics.map((topic)=>({
      slug:topic.slug,
      title:topic.title,
      description:topic.description,
      questions:topic.items.map(([question,answer])=>({question,answer})),
      url:`${site.origin}/faq/topic/${topic.slug}`
    }))
  });
}
