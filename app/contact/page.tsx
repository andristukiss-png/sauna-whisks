import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Contact",
  description: "Contact SaunaWhisks.com in Latvia for product, trade and sourcing enquiries."
};

export default function ContactPage() {
  return (
    <main>
      <Header />
      <section className="contact-page">
        <p className="section-kicker">CONTACT</p>
        <h1>Talk to Sauna Whisks.</h1>
        <div className="contact-grid">
          <div><span>GENERAL</span><a href="mailto:hello@saunawhisks.com">hello@saunawhisks.com</a></div>
          <div><span>TRADE</span><a href="mailto:trade@saunawhisks.com">trade@saunawhisks.com</a></div>
          <div><span>BASE</span><p>Latvia · European Union</p></div>
        </div>
        <p className="fineprint">Full legal company details will be added before commercial launch.</p>
      </section>
      <SiteFooter />
    </main>
  );
}
