import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getUseCase, useCases } from "@/lib/useCases";

export function generateStaticParams(){
  return useCases.map((item)=>({slug:item.slug}));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getUseCase(slug);
  if (!item) return {};
  return pageMetadata({
    title: item.name + " — Sauna Whisk Use Case",
    description: item.summary,
    canonical: "/use-cases/" + item.slug,
  });
}

export default async function UseCasePage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const item=getUseCase(slug);
  if(!item) notFound();

  return <main>
    <Header/>
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Use cases",href:"/use-cases"},{label:item.name}]}/>
    <section className="page-hero">
      <p className="section-kicker">USE CASE</p>
      <h1>{item.headline}</h1>
      <p>{item.summary}</p>
    </section>
    <section className="use-case-plan">
      <div>
        <p className="section-kicker">PRIORITIES</p>
        {item.priorities.map((priority,index)=><p key={priority}><span>{String(index+1).padStart(2,"0")}</span>{priority}</p>)}
      </div>
      <div>
        <p className="section-kicker">WORKING RECOMMENDATION</p>
        <h2>{item.recommendation}</h2>
        <div className="condition-related">
          {item.related.map((link)=><Link href={link.href} key={link.href}>{link.label} →</Link>)}
        </div>
      </div>
    </section>
    <SiteFooter/>
  </main>;
}
