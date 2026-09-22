import { pageMetadata } from "@/lib/metadata";
import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = pageMetadata({
  title: "Cookies",
  description: "Cookie information for SaunaWhisks.com.",
  canonical: "/cookies",
});

export default function CookiesPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Cookies" }]} />
      <article className="legal-page">
        <p className="section-kicker">COOKIES</p>
        <h1>Minimal by default</h1>

        <section>
          <h2>Current site</h2>
          <p>
            The current pre-launch site does not intentionally use advertising or marketing cookies.
            Essential platform functionality may still use technical storage or security mechanisms required to serve the website.
          </p>
        </section>

        <section>
          <h2>Analytics later</h2>
          <p>
            If analytics, advertising or other non-essential tracking is added, this page and any required consent controls will be updated before use.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions can be sent to <a href="mailto:info@SaunaWhisks.com">info@SaunaWhisks.com</a>.
          </p>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
