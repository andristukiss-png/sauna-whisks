import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import site from "@/config/site.json";

export const metadata = pageMetadata({
  title: "Cookie Notice",
  description: "Cookie and tracking technology notice for SaunaWhisks.com.",
  canonical: "/cookies",
});

export default function CookiesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cookies" }]} />
      <article className="legal-page">
        <p className="section-kicker">COOKIE NOTICE</p>
        <h1>Cookies and similar technologies</h1>
        <p className="legal-note">Last updated: 25 September 2026</p>

        <section>
          <h2>What cookies are</h2>
          <p>
            Cookies are small text files or similar browser-storage technologies that can be placed on your device when you visit a website.
            They can be used to operate a site, remember preferences, measure usage or support advertising and other tracking.
          </p>
        </section>

        <section>
          <h2>What SaunaWhisks.com uses today</h2>
          <p>
            SaunaWhisks.com does not intentionally set advertising, marketing, personalization or analytics cookies on the current pre-launch site.
            We have not added Google Analytics, advertising pixels or comparable non-essential tracking.
          </p>
          <p>
            Our hosting and security infrastructure may still use strictly necessary technical mechanisms to deliver the website, protect it from abuse,
            route requests or maintain security. These mechanisms are used only where needed to provide the service.
          </p>
        </section>

        <section>
          <h2>Non-essential cookies and consent</h2>
          <p>
            If we add analytics, personalization, advertising or another non-essential tracking technology later, it will not be activated for users
            who require consent until an appropriate consent choice has been provided. We will also update this notice with the relevant purpose,
            provider and duration information.
          </p>
        </section>

        <section>
          <h2>Your choices</h2>
          <p>
            Most browsers allow you to inspect, block or delete cookies. Blocking strictly necessary browser storage can affect how a website works.
            If SaunaWhisks.com introduces a consent preference control, you will be able to change your non-essential cookie choice through that control.
          </p>
        </section>

        <section>
          <h2>Changes to this notice</h2>
          <p>
            This notice will be updated when our use of cookies or similar technologies changes. The date at the top of this page shows the latest revision.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about cookies or tracking can be sent to <a href={`mailto:${site.publicEmail}`}>{site.publicEmail}</a>.
          </p>
          <p>
            Latvia&apos;s Data State Inspectorate also publishes public guidance about cookies and data-protection rights.
          </p>
        </section>
      </article>
    </>
  );
}
