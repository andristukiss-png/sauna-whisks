import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import site from "@/config/site.json";

export const metadata = pageMetadata({
  title: "Corrections",
  description: "How to report a factual or attribution error on SaunaWhisks.com.",
  canonical: "/corrections",
});

export default function CorrectionsPage(){
  return <>
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Corrections"}]}/>
    <article className="legal-page">
      <p className="section-kicker">CORRECTIONS</p>
      <h1>Found something wrong?</h1>
      <section><h2>What to send</h2><p>Email the page URL, the statement you believe is incorrect, and the strongest source you have supporting the correction.</p></section>
      <section><h2>What we do</h2><p>We review the claim against the relevant source type. If a factual statement, attribution or product detail is wrong, the page should be corrected rather than defended for consistency.</p></section>
      <section><h2>Commercial product data</h2><p>Supplier, origin, harvest and condition information can change during pre-launch verification. Corrections should be reflected in the catalog and product page together.</p></section>
      <section><h2>Contact</h2><p><a href={`mailto:${site.publicEmail}?subject=Website%20correction`}>{site.publicEmail}</a></p></section>
    </article>
  </>;
}
