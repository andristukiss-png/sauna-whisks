import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LandedCostCalculator } from "@/components/LandedCostCalculator";

export const metadata = pageMetadata({
  title: "Landed-Cost Calculator",
  description: "Simple pre-launch variable-cost and contribution-margin calculator for SaunaWhisks.com.",
  canonical: "/tools/landed-cost",
});

export default function Page(){return <main><Header/><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Tools",href:"/tools"},{label:"Landed cost"}]}/><section className="page-hero"><p className="section-kicker">COMMERCIAL TOOL</p><h1>Price from landed economics.</h1><p>Model supplier cost, inbound freight, packaging, fulfilment, payment processing and shipping subsidy before thinking about CAC.</p></section><section className="tool-wrap"><LandedCostCalculator/></section><SiteFooter/></main>}
