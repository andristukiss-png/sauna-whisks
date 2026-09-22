import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = pageMetadata({
  title: "Press Facts",
  description: "Verified pre-launch facts about SaunaWhisks.com for media and editorial reference.",
  canonical: "/press",
});

const facts=[
  ["Brand","Sauna Whisks / SaunaWhisks.com"],
  ["Base","Latvia, European Union"],
  ["Status","Pre-launch; checkout disabled"],
  ["Focus","Sauna whisks, materials, care, traditions, trade supply and producer documentation"],
  ["Planned core products","Baltic Birch, Baltic Oak, Eucalyptus and the Discovery Trio"],
  ["Public contact","info@SaunaWhisks.com"],
  ["Editorial principle","Publish what can be verified; distinguish traditions rather than flattening them together"],
  ["Commercial principle","Open markets only after product, fulfilment and import paths are validated"]
];

export default function PressPage(){
  return <main>
    <Header/>
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Press facts"}]}/>
    <section className="page-hero"><p className="section-kicker">PRESS FACTS</p><h1>Short facts without invented heritage.</h1><p>Use these facts as the current pre-launch description. Product and company details will change as supplier and commercial verification progresses.</p></section>
    <section className="press-facts">{facts.map(([label,value])=><div key={label}><span>{label}</span><p>{value}</p></div>)}</section>
    <section className="knowledge-copy"><p className="section-kicker">PRESS / EDITORIAL</p><h2>Need a comment or collaboration?</h2><p>Email info@SaunaWhisks.com and include the publication, topic and deadline.</p><a className="text-link" href="mailto:info@SaunaWhisks.com?subject=Press%20enquiry">Press enquiry →</a></section>
    <SiteFooter/>
  </main>;
}
