import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = pageMetadata({
  title: "Sauna Whisks Tools",
  description: "Pre-launch product, supplier, trade and commercial planning tools.",
  canonical: "/tools",
});

const tools=[
  ["/tools/supplier-scorecard","Supplier scorecard","Compare producer candidates using the same evidence categories."],
  ["/tools/landed-cost","Landed-cost calculator","Model variable cost and contribution before acquisition cost."],
  ["/tools/trade-demand","Trade demand estimator","Estimate monthly whisk usage for a venue."],
  ["/tools/launch-readiness","Launch readiness","Track the major product, compliance, commercial, technical and QA gates."],
  ["/finder","Whisk finder","Choose among the planned core consumer products."],
  ["/checklist","Quality checklist","Evaluate a prepared whisk or supplier sample."]
];

export default function ToolsPage(){
  return <>
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Tools"}]}/>
    <section className="page-hero"><p className="section-kicker">TOOLS</p><h1>Turn assumptions into fields.</h1><p>Simple pre-launch tools for product selection, supplier evaluation, venue planning and commercial readiness.</p></section>
    <section className="hub-grid">{tools.map(([href,title,copy],index)=><Link prefetch={false} href={href} key={href}><span>{String(index+1).padStart(2,"0")}</span><h2>{title}</h2><p>{copy}</p><b>Open tool →</b></Link>)}</section>
  </>;
}
