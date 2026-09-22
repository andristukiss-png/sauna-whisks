import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Privacy",
  description: "Privacy information for SaunaWhisks.com.",
  alternates: { canonical: "/privacy" }
};

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <article className="legal-page">
        <p className="section-kicker">PRIVACY</p>
        <h1>Privacy at SaunaWhisks.com</h1>

        <section>
          <h2>Information you send us</h2>
          <p>
            If you submit an enquiry, we may receive your name, email address and the message you choose to send.
            We use that information only to respond to your enquiry and manage the related business conversation.
          </p>
        </section>

        <section>
          <h2>Email delivery</h2>
          <p>
            The website may use a third-party transactional email provider to deliver enquiry messages to
            info@SaunaWhisks.com. We will update this page with the final provider and legal company details before commercial launch.
          </p>
        </section>

        <section>
          <h2>No newsletter by default</h2>
          <p>
            Sending an enquiry does not subscribe you to a marketing newsletter. If we add marketing email later,
            it will use a separate opt-in process.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about personal information can be sent to
            <a href="mailto:info@SaunaWhisks.com"> info@SaunaWhisks.com</a>.
          </p>
        </section>

        <p className="legal-note">
          This is an interim pre-launch privacy notice. Formal controller/company details, retention periods,
          cookie information and any required statutory wording will be completed before checkout opens.
        </p>
      </article>
      <SiteFooter />
    </main>
  );
}
