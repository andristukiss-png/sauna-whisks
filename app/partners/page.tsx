import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata = pageMetadata({
  title: "Partnerships & Press",
  description: "Partnership, editorial, press and industry collaboration enquiries for SaunaWhisks.com.",
  canonical: "/partners",
});

export default function PartnersPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Partners / Press" }]} />
      <section className="page-hero dark-page">
        <p className="section-kicker light">PARTNERSHIPS / PRESS</p>
        <h1>Build the sauna-whisk category with us.</h1>
        <p>
          We are open to relevant collaborations with sauna builders, public saunas,
          practitioners, educators, retailers, photographers and editorial partners.
        </p>
      </section>

      <section className="partner-grid">
        <article><span>01</span><h2>Editorial</h2><p>Expert interviews, pirts and sauna culture, material knowledge and sourcing.</p></article>
        <article><span>02</span><h2>Industry</h2><p>Sauna builders, public sauna operators, recovery studios and specialist retail.</p></article>
        <article><span>03</span><h2>Content</h2><p>Photography, demonstrations, harvest documentation and practitioner education.</p></article>
      </section>

      <section className="partner-resource-links">
        <Link href="/press">Press facts →</Link>
        <Link href="/company">Company hub →</Link>
        <Link href="/editorial-policy">Editorial policy →</Link>
      </section>
      <section className="trade-contact">
        <p className="section-kicker">START A CONVERSATION</p>
        <h2>Tell us what you have in mind.</h2>
        <EnquiryForm
          subject="SaunaWhisks.com partnership enquiry"
          topics={["Press / editorial", "Sauna industry partnership", "Practitioner collaboration", "Photography / content", "Retail partnership", "Other"]}
          businessFields
          messagePlaceholder="Tell us about the organization, project and what you would like to explore..."
        />
      </section>

      <SiteFooter />
    </main>
  );
}
