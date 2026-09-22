import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Wholesale Sauna Whisks",
  description: "Trade supply for sauna clubs, bathhouses, hotels, spas, retailers and sauna builders."
};

export default function WholesalePage() {
  return (
    <main>
      <Header />
      <section className="page-hero dark-page">
        <p className="section-kicker light">TRADE / WHOLESALE</p>
        <h1>Whisks for businesses that use them every week.</h1>
        <p>
          We are building trade supply for public saunas, bathhouses, hotels, wellness clubs,
          retailers and sauna builders in Europe and North America.
        </p>
      </section>

      <section className="wholesale-grid">
        <div><span>01</span><h2>Recurring supply</h2><p>Planned case quantities for venues that need dependable replenishment.</p></div>
        <div><span>02</span><h2>Retail packs</h2><p>Consumer-ready units for sauna stores, builders and wellness retailers.</p></div>
        <div><span>03</span><h2>Seasonal harvests</h2><p>Future harvest-based programs for buyers who want provenance and seasonality.</p></div>
      </section>

      <section className="trade-contact">
        <p className="section-kicker">START A TRADE CONVERSATION</p>
        <h2>Tell us what you operate.</h2>
        <p>For now, email us with your business type, country and approximate monthly requirement.</p>
        <a className="button button-dark" href="mailto:trade@saunawhisks.com">trade@saunawhisks.com</a>
      </section>
      <SiteFooter />
    </main>
  );
}
