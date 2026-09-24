import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "@/components/EnquiryForm";
import site from "@/config/site.json";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact SaunaWhisks.com in Latvia for product, trade and sourcing enquiries.",
  canonical: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className="contact-page">
        <p className="section-kicker">CONTACT</p>
        <h1>Talk to Sauna Whisks.</h1>
        <p className="contact-intro">
          Product question, wholesale request, sourcing enquiry or something else?
          Send us a message and we will reply from <strong>{site.publicEmail}</strong>.
        </p>

        <EnquiryForm
          topics={["Product question", "Shipping / country availability", "Wholesale / trade", "Sourcing / supplier", "Press / partnership", "Other"]}
          messagePlaceholder="Tell us how we can help..."
        />

        <div className="contact-meta">
          <div><span>EMAIL</span><a href={`mailto:${site.publicEmail}`}>{site.publicEmail}</a></div>
          <div><span>BASE</span><p>Latvia · European Union</p></div>
        </div>

        <p className="fineprint">Full legal company details will be added before commercial launch.</p>
      </section>
    </>
  );
}
