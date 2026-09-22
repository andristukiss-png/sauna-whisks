import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { useCases } from "@/lib/useCases";

export const metadata = {
  title:"Sauna Whisk Use Cases",
  description:"Choose sauna whisks by how and where they will actually be used.",
  alternates:{canonical:"/use-cases"}
};

export default function UseCasesPage(){
  return <main>
    <Header/>
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Use cases"}]}/>
    <section className="page-hero">
      <p className="section-kicker">USE CASES</p>
      <h1>Choose for the way the sauna is used.</h1>
      <p>Home sauna, public venue, hospitality, retail or gifting each creates different product and operational priorities.</p>
    </section>
    <section className="hub-grid">
      {useCases.map((item,index)=><Link prefetch={false} href={"/use-cases/"+item.slug} key={item.slug}>
        <span>{String(index+1).padStart(2,"0")}</span>
        <h2>{item.name}</h2>
        <p>{item.summary}</p>
        <b>Open use case →</b>
      </Link>)}
    </section>
    <SiteFooter/>
  </main>;
}
