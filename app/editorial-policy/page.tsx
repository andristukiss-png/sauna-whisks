import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { sourceHierarchy } from "@/lib/editorial";

export const metadata={
  title:"Editorial & Source Policy",
  description:"How SaunaWhisks.com sources, reviews and separates cultural, regulatory and commercial claims.",
  alternates:{canonical:"/editorial-policy"}
};

export default function EditorialPolicyPage(){
  return <main>
    <Header/>
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Editorial policy"}]}/>
    <section className="page-hero">
      <p className="section-kicker">EDITORIAL POLICY</p>
      <h1>Use the strongest source that fits the claim.</h1>
      <p>Tradition, regulation, product specification and marketplace vocabulary need different kinds of evidence.</p>
    </section>
    <section className="requirements-list">
      {sourceHierarchy.map(([title,copy],index)=><div key={title}>
        <span>{String(index+1).padStart(2,"0")}</span>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>)}
    </section>
    <section className="knowledge-copy">
      <p className="section-kicker">SEPARATION</p>
      <h2>Source-backed fact, commercial plan and opinion should not be blended.</h2>
      <p>Pre-launch pricing, assortment and market plans are labeled as plans. Product origin and supplier details are published only when verified. Unsupported health claims are excluded.</p>
    </section>
    <SiteFooter/>
  </main>;
}
