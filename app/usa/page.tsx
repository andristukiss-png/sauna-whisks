import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Sauna Whisks USA — Planned US Launch",
  description:
    "SaunaWhisks.com is preparing a US launch for Baltic sauna whisks. Learn about the planned assortment, product standards and import-compliance approach."
};

export default function USAPage() {
  return (
    <main>
      <Header />
      <section className="page-hero usa-hero">
        <p className="section-kicker">UNITED STATES / LAUNCH PLANNING</p>
        <h1>Baltic sauna whisks for the US.</h1>
        <p>
          We are preparing the US market around a small dried-whisk assortment, clear preparation guidance
          and bundles that make international logistics sensible. US orders are not open yet.
        </p>
        <div className="usa-actions">
          <a className="button button-dark" href="mailto:info@saunawhisks.com?subject=US%20launch%20waitlist">
            Join the US launch list
          </a>
          <Link className="text-link" href="/standards">Read our product standard →</Link>
        </div>
      </section>

      <section className="usa-grid">
        <article>
          <span>01</span>
          <h2>Start with dried</h2>
          <p>
            Dried products are the working launch assumption because they are shelf-stable and easier to inventory than fresh seasonal whisks.
          </p>
        </article>
        <article>
          <span>02</span>
          <h2>Bundle intelligently</h2>
          <p>
            Birch, oak and eucalyptus are planned as the core comparison set. Bundles reduce shipping cost as a percentage of the order.
          </p>
        </article>
        <article>
          <span>03</span>
          <h2>Clear before selling</h2>
          <p>
            USDA APHIS requirements vary by commodity and country of origin. Each commercial SKU will be checked before US sales open.
          </p>
        </article>
      </section>

      <section className="usa-compliance">
        <div>
          <p className="section-kicker light">IMPORT COMPLIANCE</p>
          <h2>No casual promises about plant imports.</h2>
        </div>
        <div>
          <p>
            APHIS directs importers to its Agricultural Commodity Import Requirements database because rules depend on the exact plant product and origin.
            We will publish shipping availability only after the relevant product form and origin have been checked.
          </p>
          <a
            className="text-link"
            href="https://www.aphis.usda.gov/plant-imports/how-to-import"
            target="_blank"
            rel="noreferrer"
          >
            USDA APHIS import guidance ↗
          </a>
        </div>
      </section>

      <section className="trade-contact">
        <p className="section-kicker">US TRADE INTEREST</p>
        <h2>Sauna clubs, builders and retailers.</h2>
        <p>
          If you operate a US sauna business and want trade packs or recurring supply, tell us your location and approximate monthly requirement.
        </p>
        <a className="button button-dark" href="mailto:info@saunawhisks.com?subject=US%20trade%20interest">
          Contact trade
        </a>
      </section>

      <SiteFooter />
    </main>
  );
}
