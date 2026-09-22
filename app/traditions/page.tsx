import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Sauna Whisk Traditions",
  description: "Learn how sauna whisks, venik, vihta and vasta fit into Baltic, Finnish and banya traditions."
};

export default function TraditionsPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">TRADITIONS</p>
        <h1>Whisk. Venik. Vihta. Vasta.</h1>
        <p>
          Different languages and traditions use different words, but the central idea is similar:
          a leafy bundle becomes an instrument for heat, aroma, touch and rhythm.
        </p>
      </section>

      <section className="tradition-grid">
        <article>
          <span>LATVIA / BALTICS</span>
          <h2>Sauna and pirts culture</h2>
          <p>
            In Latvia, the sauna tradition is closely tied to pirts culture, plants, seasonal harvesting and a more intentional ritual than simple heat exposure.
          </p>
        </article>
        <article>
          <span>FINLAND</span>
          <h2>Vihta / vasta</h2>
          <p>
            Finnish terminology varies by region, but birch remains the classic material associated with traditional sauna whisking.
          </p>
        </article>
        <article>
          <span>BANYA</span>
          <h2>Venik</h2>
          <p>
            In banya traditions, the venik is often used more vigorously, with oak and birch among the best-known materials.
          </p>
        </article>
      </section>

      <section className="knowledge-copy">
        <p className="section-kicker">OUR APPROACH</p>
        <h2>Respect the differences.</h2>
        <p>
          SaunaWhisks.com will not flatten all of these traditions into one invented story.
          We will document regional terms, techniques and materials separately, with sources and producer knowledge where possible.
        </p>
      </section>

      <SiteFooter />
    </main>
  );
}
