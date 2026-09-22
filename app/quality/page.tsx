import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "Sauna Whisk Quality",
  description: "A hub for SaunaWhisks.com product standards, testing, provenance, claims and quality tools.",
  alternates: { canonical: "/quality" }
};

const links = [
  ["/standards", "Product standards", "The fields we intend to publish for every commercial whisk."],
  ["/operations/product-testing", "Product testing", "Leaf retention, flexibility, preparation repeatability and aroma."],
  ["/operations/provenance", "Provenance", "Harvest origin, producer identity, condition and supporting evidence."],
  ["/checklist", "Quality checklist", "Interactive sample-evaluation checklist."],
  ["/claims", "Claims standard", "Observable product facts without unsupported health marketing."],
  ["/catalog", "Product data", "Current pre-launch product verification status."],
  ["/tools/supplier-scorecard", "Supplier scorecard", "Evidence-based internal comparison of producer candidates."],
  ["/tools/launch-readiness", "Launch readiness", "Track the major gates before checkout opens."]
];

export default function QualityPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Quality" }]} />
      <section className="page-hero">
        <p className="section-kicker">QUALITY</p>
        <h1>Quality should survive preparation.</h1>
        <p>
          Appearance matters less than provenance, construction, preparation repeatability and how the whisk performs after soaking.
        </p>
      </section>

      <section className="hub-grid">
        {links.map(([href,title,copy], index) => (
          <Link prefetch={false} href={href} key={href}>
            <span>{String(index + 1).padStart(2,"0")}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <b>Open →</b>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
