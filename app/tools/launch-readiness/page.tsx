import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { LaunchReadinessTool } from "@/components/LaunchReadinessTool";

export const metadata = pageMetadata({
  title: "Launch Readiness",
  description: "Interactive pre-launch checklist for product, compliance, commercial, technical and QA gates.",
  canonical: "/tools/launch-readiness",
});

export default function Page(){return <><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Tools",href:"/tools"},{label:"Launch readiness"}]}/><section className="page-hero"><p className="section-kicker">LAUNCH TOOL</p><h1>Checkout is the last step, not the first.</h1><p>Track the major gates that should be real before commercial orders open.</p></section><section className="tool-wrap"><LaunchReadinessTool/></section></>}
