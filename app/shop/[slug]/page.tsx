import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { LeafMark } from "@/components/LeafMark";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
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
    description: whisk.description,
    alternates: { canonical: `/shop/${whisk.slug}` }
  };
}

export default async function WhiskPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const whisk = getWhisk(slug);
  if (!whisk) notFound();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: whisk.name,
    description: whisk.description,
    category: "Sauna whisk",
    material: whisk.material,
    brand: {
      "@type": "Brand",
      name: "Sauna Whisks"
    },
    url: `https://saunawhisks.com/shop/${whisk.slug}`,
    additionalProperty: [
      { "@type": "PropertyValue", name: "Status", value: whisk.status },
      { "@type": "PropertyValue", name: "Planned condition", value: whisk.plannedCondition },
      { "@type": "PropertyValue", name: "Verification", value: whisk.verification }
    ]
  };

  const faqItems = [
    ["Is this product available now?", "Not yet. SaunaWhisks.com is pre-launch and is not accepting payment for this product."],
    ["Will the final origin be published?", "Yes. Final origin, condition and producer information will be published when verified for the commercial SKU."],
    ["How should I prepare it?", "Use the product-specific instructions supplied at launch. General preparation guidance is available in the sauna library."]
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop" },
        { label: whisk.name }
      ]} />
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
            <div><span>Status</span><b>{whisk.status}</b></div>
            <div><span>Material</span><b>{whisk.material}</b></div>
            <div><span>Botanical group</span><b>{whisk.latin}</b></div>
            <div><span>Planned condition</span><b>{whisk.plannedCondition}</b></div>
            <div><span>Origin</span><b>{whisk.origin}</b></div>
            <div><span>Verification</span><b>{whisk.verification}</b></div>
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
        <div className="preparation-links">
          <Link className="text-link" href="/journal/how-to-use-a-sauna-whisk">How to use a sauna whisk →</Link>
          <Link className="text-link" href="/traditions">Learn the wider sauna ritual →</Link>
        </div>
      </section>
      <section className="product-support">
        <div>
          <p className="section-kicker">GOOD NEXT READS</p>
          <h2>Understand the ritual before buying.</h2>
          <div className="support-links">
            <Link href="/journal/how-to-use-a-sauna-whisk">How to use a sauna whisk →</Link>
            <Link href="/journal/how-to-prepare-dried-sauna-whisk">How to prepare a dried whisk →</Link>
            <Link href="/compare">Birch vs oak vs eucalyptus →</Link>
          </div>
        </div>
        <div>
          <p className="section-kicker">OTHER WHISKS</p>
          <div className="related-products">
            {saunaWhisks.filter((item) => item.slug !== whisk.slug).map((item) => (
              <Link href={`/shop/${item.slug}`} key={item.slug}>
                <span>{item.material}</span>
                <b>{item.name}</b>
                <em>{item.plannedPrice} →</em>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="product-faq">
        <p className="section-kicker">PRODUCT FAQ</p>
        {faqItems.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}<i>+</i></summary>
            <p>{answer}</p>
          </details>
        ))}
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
