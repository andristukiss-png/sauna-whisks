import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata = {
  title: "Contact",
  description: "Contact SaunaWhisks.com in Latvia for product, trade and sourcing enquiries.",
  alternates: { canonical: "/contact" }
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <section className="contact-page">
        <p className="section-kicker">CONTACT</p>
        <h1>Talk to Sauna Whisks.</h1>
        <p className="contact-intro">
          Product question, wholesale request, sourcing enquiry or something else?
          Send us a message and we will reply from <strong>info@SaunaWhisks.com</strong>.
        </p>

        <EnquiryForm
          topics={["Product question", "Shipping / country availability", "Wholesale / trade", "Sourcing / supplier", "Press / partnership", "Other"]}
          messagePlaceholder="Tell us how we can help..."
        />

        <div className="contact-meta">
          <div><span>EMAIL</span><a href="mailto:info@SaunaWhisks.com">info@SaunaWhisks.com</a></div>
          <div><span>BASE</span><p>Latvia · European Union</p></div>
        </div>

        <p className="fineprint">Full legal company details will be added before commercial launch.</p>
      </section>
      <SiteFooter />
    </main>
  );
}
