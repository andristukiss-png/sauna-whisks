import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = pageMetadata({
  title: "Company",
  description: "SaunaWhisks.com company, launch, partnership, supplier, editorial and policy information.",
  canonical: "/company",
});

const links=[
  ["/about","About","Why SaunaWhisks.com is being built in Latvia and what the specialist focus is."],
  ["/status","Launch status","What is built, open, planned and still being verified."],
  ["/partners","Partnerships","Industry, practitioner, content and editorial collaborations."],
  ["/suppliers","Suppliers","Producer and supply-partner intake."],
  ["/press","Press facts","Short verified facts for editorial use."],
  ["/editorial-policy","Editorial policy","How factual and commercial claims are sourced and reviewed."],
  ["/legal","Legal & policies","Privacy, terms, returns, cookies and accessibility."],
  ["/contact","Contact","One public contact address: info@SaunaWhisks.com."]
];

export default function CompanyPage(){
  return <>
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Company"}]}/>
    <section className="page-hero"><p className="section-kicker">COMPANY</p><h1>A specialist category company, still pre-launch.</h1><p>Company information, supply, partnerships, editorial standards and current commercial status in one place.</p></section>
    <section className="hub-grid">{links.map(([href,title,copy],index)=><Link href={href} key={href}><span>{String(index+1).padStart(2,"0")}</span><h2>{title}</h2><p>{copy}</p><b>Open →</b></Link>)}</section>
  </>;
}
