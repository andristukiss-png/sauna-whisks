import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TradeDemandEstimator } from "@/components/TradeDemandEstimator";

export const metadata = pageMetadata({
  title: "Trade Demand Estimator",
  description: "Estimate monthly sauna-whisk demand for a public sauna, spa or wellness venue.",
  canonical: "/tools/trade-demand",
});

export default function Page(){return <><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Tools",href:"/tools"},{label:"Trade demand"}]}/><section className="page-hero"><p className="section-kicker">TRADE TOOL</p><h1>Estimate before you quote.</h1><p>Turn weekly session assumptions into a working monthly whisk requirement.</p></section><section className="tool-wrap"><TradeDemandEstimator/></section></>}
