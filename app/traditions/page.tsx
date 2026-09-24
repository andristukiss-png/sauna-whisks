import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";

export const metadata = pageMetadata({
  title: "Sauna Whisk Traditions",
  description: "Learn how sauna whisks, venik, vihta and vasta fit into Baltic, Finnish and banya traditions.",
  canonical: "/traditions",
});

export default function TraditionsPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Traditions" }]} />
      <section className="page-hero">
        <p className="section-kicker">TRADITIONS</p>
        <h1>Whisk. Venik. Vihta. Vasta.</h1>
        <p>
          Different languages and traditions use different words, but the central idea is similar:
          a leafy bundle becomes an instrument for heat, aroma, touch and rhythm.
        </p>
      </section>

      <section className="tradition-grid">
        <Link href="/traditions/latvian-pirts">
          <span>LATVIA / BALTICS</span>
          <h2>Sauna and pirts culture</h2>
          <p>
            In Latvia, the sauna tradition is closely tied to pirts culture, plants, seasonal harvesting and a more intentional ritual than simple heat exposure.
          </p>
        </Link>
        <Link href="/traditions/finnish-vihta-vasta">
          <span>FINLAND</span>
          <h2>Vihta / vasta</h2>
          <p>
            Finnish terminology varies by region, but birch remains the classic material associated with traditional sauna whisking.
          </p>
        </Link>
        <Link href="/traditions/banya-venik">
          <span>BANYA</span>
          <h2>Venik</h2>
          <p>
            In banya traditions, the venik is often used more vigorously, with oak and birch among the best-known materials.
          </p>
        </Link>
        <Link href="/traditions/baltic-sauna-whisks">
          <span>BALTICS</span>
          <h2>Specialist whisk culture</h2>
          <p>Seasonal plant materials, dried preservation and a wider botanical assortment across the Baltic region.</p>
        </Link>
      </section>

      <section className="knowledge-copy">
        <p className="section-kicker">OUR APPROACH</p>
        <h2>Respect the differences.</h2>
        <p>
          SaunaWhisks.com will not flatten all of these traditions into one invented story.
          We will document regional terms, techniques and materials separately, with sources and producer knowledge where possible.
        </p>
      </section>
    </>
  );
}
