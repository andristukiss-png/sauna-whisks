import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SupplierScorecardTool } from "@/components/SupplierScorecardTool";

export const metadata={title:"Supplier Scorecard",description:"Interactive evidence-based scorecard for sauna-whisk supplier candidates.",alternates:{canonical:"/tools/supplier-scorecard"}};

export default function Page(){return <main><Header/><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Tools",href:"/tools"},{label:"Supplier scorecard"}]}/><section className="page-hero"><p className="section-kicker">SUPPLIER TOOL</p><h1>Score evidence, not salesmanship.</h1><p>Use the same twelve criteria for every candidate, then keep the supporting evidence beside the score internally.</p></section><section className="tool-wrap"><SupplierScorecardTool/></section><SiteFooter/></main>}
