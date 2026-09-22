import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata = {
  title: "Wholesale Sauna Whisks",
  description: "Trade supply for sauna clubs, bathhouses, hotels, spas, retailers and sauna builders.",
  alternates: { canonical: "/wholesale" }
};

const wholesaleFaq = [
  ["Do you have a trade price list?", "Not yet. Trade pricing will be finalized after the first supplier and landed-cost models are confirmed."],
  ["What order sizes are you planning?", "The working plan includes smaller retail cases and larger recurring venue quantities. Exact pack sizes are still being validated."],
  ["Can you supply the United States?", "US trade supply is a priority, but each plant-product SKU must be cleared for import and documentation before orders open."],
  ["Can you private-label whisks?", "Potentially later. The initial focus is consistent Sauna Whisks branded supply and verified product provenance."]
];

export default function WholesalePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: wholesaleFaq.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <Header />
      <section className="page-hero dark-page">
        <p className="section-kicker light">TRADE / WHOLESALE</p>
        <h1>Whisks for businesses that use them every week.</h1>
        <p>
          We are building trade supply for public saunas, bathhouses, hotels, wellness clubs,
          retailers and sauna builders in Europe and North America.
        </p>
      </section>

      <section className="wholesale-segment-link">
        <p className="section-kicker">BY BUSINESS TYPE</p>
        <h2>See the trade plan for your business.</h2>
        <a className="button button-dark" href="/trade">Explore trade segments</a>
      </section>

      <section className="wholesale-grid">
        <div><span>01</span><h2>Recurring supply</h2><p>Planned case quantities for venues that need dependable replenishment.</p></div>
        <div><span>02</span><h2>Retail packs</h2><p>Consumer-ready units for sauna stores, builders and wellness retailers.</p></div>
        <div><span>03</span><h2>Seasonal harvests</h2><p>Future harvest-based programs for buyers who want provenance and seasonality.</p></div>
      </section>

      <section className="wholesale-faq">
        <p className="section-kicker">TRADE FAQ</p>
        {wholesaleFaq.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}<i>+</i></summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>

      <section className="trade-contact">
        <p className="section-kicker">START A TRADE CONVERSATION</p>
        <h2>Tell us what you operate.</h2>
        <p>
          Include your business type, country and approximate monthly requirement.
          We will reply from info@SaunaWhisks.com.
        </p>
        <EnquiryForm
          subject="SaunaWhisks.com wholesale enquiry"
          topics={["Recurring venue supply", "Retail / stockist", "Sauna builder", "Hotel / spa", "Distributor", "Other trade enquiry"]}
          businessFields
          messagePlaceholder="Tell us about your business and what products you are interested in..."
        />
      </section>
      <SiteFooter />
    </main>
  );
}
