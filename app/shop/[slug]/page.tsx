import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { LeafMark } from "@/components/LeafMark";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getWhisk, saunaWhisks } from "@/lib/products";

export function generateStaticParams() {
  return saunaWhisks.map((whisk) => ({ slug: whisk.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const whisk = getWhisk(slug);
  if (!whisk) return {};
  return {
    title: whisk.name,
    description: whisk.description
  };
}

export default async function WhiskPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const whisk = getWhisk(slug);
  if (!whisk) notFound();

  return (
    <main>
      <Header />
      <section className="product-detail">
        <div className="product-detail-art">
          <LeafMark />
          <LeafMark />
          <LeafMark />
        </div>
        <div className="product-detail-copy">
          <p className="section-kicker">{whisk.origin.toUpperCase()}</p>
          <h1>{whisk.name}</h1>
          <p className="detail-character">{whisk.character}</p>
          <p className="detail-description">{whisk.description}</p>
          <div className="detail-meta">
            <div><span>Material</span><b>{whisk.material}</b></div>
            <div><span>Botanical group</span><b>{whisk.latin}</b></div>
            <div><span>Planned launch price</span><b>{whisk.plannedPrice}</b></div>
          </div>
          <a className="button button-dark" href="#product-enquiry">Ask about this whisk</a>
          <p className="fineprint">Final origin, harvest and producer information will be published only after verification.</p>
        </div>
      </section>

      <section className="preparation">
        <p className="section-kicker">PREPARATION</p>
        <h2>Prepare it slowly.</h2>
        <div className="prep-grid">
          {whisk.preparation.map((step, index) => (
            <div key={step}>
              <span>0{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
        <Link className="text-link" href="/traditions">Learn the wider sauna ritual →</Link>
      </section>
      <section className="product-enquiry" id="product-enquiry">
        <p className="section-kicker">PRODUCT ENQUIRY</p>
        <h2>Ask about {whisk.name}.</h2>
        <p>
          Questions about availability, wholesale quantities, shipping or preparation?
          Send us a message below.
        </p>
        <EnquiryForm subject={`SaunaWhisks.com enquiry — ${whisk.name}`} />
      </section>
      <SiteFooter />
    </main>
  );
}
