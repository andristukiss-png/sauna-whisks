import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = pageMetadata({
  title: "Help",
  description: "Find product, shipping, learning, trade and contact help for SaunaWhisks.com.",
  canonical: "/help",
});

const links=[
  ["/search","Search the site","Find products, guides, markets, trade pages and terminology."],
  ["/faq","FAQ","Common questions about choosing, care, shipping and trade."],
  ["/shipping","Shipping & availability","See current market and pre-launch shipping status."],
  ["/beginners","Beginner path","Start with choosing, preparing and using a first whisk."],
  ["/status","Launch status","See what is open, planned and still being verified."],
  ["/contact","Contact","Send a direct enquiry to info@SaunaWhisks.com."],
  ["/wholesale","Wholesale","Trade and recurring supply enquiries."],
  ["/suppliers","Suppliers","Producer and supplier enquiries."]
];

export default function HelpPage(){
  return <main>
    <Header/>
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Help"}]}/>
    <section className="page-hero">
      <p className="section-kicker">HELP</p>
      <h1>Find the right next step.</h1>
      <p>Product question, shipping question, trade enquiry or simply learning the terminology—start here.</p>
    </section>
    <section className="hub-grid">
      {links.map(([href,title,copy],index)=><Link href={href} key={href}>
        <span>{String(index+1).padStart(2,"0")}</span>
        <h2>{title}</h2>
        <p>{copy}</p>
        <b>Open →</b>
      </Link>)}
    </section>
    <SiteFooter/>
  </main>;
}
