import { StructuredData } from "@/components/StructuredData";
import site from "@/config/site.json";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { techniques } from "@/lib/techniques";

export const metadata = pageMetadata({
  title: "Sauna Whisk Techniques",
  description: "Practical sauna-whisk technique guides for fanning, brushing, pressing, rhythmic use and cleanup.",
  canonical: "/techniques",
});

export default function TechniquesPage(){
  const schema={
    "@context":"https://schema.org",
    "@type":"CollectionPage",
    name:"Sauna Whisk Techniques",
    hasPart:techniques.map((item)=>({
      "@type":"HowTo",
      name:item.name,
      url:site.origin+"/techniques/"+item.slug
    }))
  };

  return <>
    <StructuredData data={schema} />
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Techniques"}]}/>
    <section className="page-hero">
      <p className="section-kicker">TECHNIQUES</p>
      <h1>Start with air, then add contact.</h1>
      <p>Gentle technique is easier to learn, easier to explain and less likely to damage a natural whisk.</p>
    </section>
    <section className="hub-grid">
      {techniques.map((item,index)=><Link prefetch={false} href={"/techniques/"+item.slug} key={item.slug}>
        <span>{String(index+1).padStart(2,"0")}</span>
        <h2>{item.name}</h2>
        <p>{item.summary}</p>
        <b>Open technique →</b>
      </Link>)}
    </section>
  </>;
}
