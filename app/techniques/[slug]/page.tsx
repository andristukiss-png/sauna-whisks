import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getTechnique, techniques } from "@/lib/techniques";

export const dynamicParams = false;\n\nexport function generateStaticParams(){
  return techniques.map((item)=>({slug:item.slug}));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getTechnique(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.name + " — Sauna Whisk Technique",
    description: item.summary,
    canonical: "/techniques/" + item.slug,
  });
}

export default async function TechniquePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const item=getTechnique(slug);
  if(!item) notFound();

  const schema={
    "@context":"https://schema.org",
    "@type":"HowTo",
    name:item.name,
    description:item.summary,
    step:item.steps.map((text,index)=>({
      "@type":"HowToStep",
      position:index+1,
      name:"Step "+(index+1),
      text
    }))
  };

  return <main>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/>
    <Header/>
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Techniques",href:"/techniques"},{label:item.name}]}/>
    <section className="page-hero">
      <p className="section-kicker">TECHNIQUE</p>
      <h1>{item.name}</h1>
      <p>{item.summary}</p>
    </section>
    <section className="requirements-list">
      {item.steps.map((step,index)=><div key={step}>
        <span>{String(index+1).padStart(2,"0")}</span>
        <h2>Step {index+1}</h2>
        <p>{step}</p>
      </div>)}
    </section>
    <section className="knowledge-copy">
      <p className="section-kicker">CONTROL</p>
      <h2>{item.caution}</h2>
      <div className="condition-related">{item.related.map((link)=><Link href={link.href} key={link.href}>{link.label} →</Link>)}</div>
    </section>
    <SiteFooter/>
  </main>;
}
