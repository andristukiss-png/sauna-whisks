import { pageMetadata } from "@/lib/metadata";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getTradeSegment, tradeSegments } from "@/lib/tradeSegments";

export const dynamicParams = false;\n\nexport function generateStaticParams() {
  return tradeSegments.map((segment) => ({ slug: segment.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const segment = getTradeSegment(slug);
  if (!segment) return {};
  return pageMetadata({
    title: `${segment.name} | Trade Sauna Whisks`,
    description: segment.summary,
    canonical: `/trade/${segment.slug}`,
  });
}

export default async function TradeSegmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const segment = getTradeSegment(slug);
  if (!segment) notFound();

  return (
    <main>
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Trade", href: "/trade" },
        { label: segment.name }
      ]} />

      <section className="page-hero">
        <p className="section-kicker">TRADE / {segment.name.toUpperCase()}</p>
        <h1>{segment.headline}</h1>
        <p>{segment.summary}</p>
      </section>

      <section className="trade-plan-grid">
        <div>
          <p className="section-kicker">WHAT YOU NEED</p>
          <ul>{segment.needs.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div>
          <p className="section-kicker">WHAT WE ARE BUILDING</p>
          <ul>{segment.offer.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </section>

      <section className="trade-contact">
        <p className="section-kicker">TRADE ENQUIRY</p>
        <h2>Tell us your expected use.</h2>
        <EnquiryForm
          subject={`SaunaWhisks.com — ${segment.topic}`}
          businessFields
          topics={["Initial trial order", "Recurring supply", "Retail stock", "Distribution", "Partnership", "Other"]}
          messagePlaceholder="Tell us your venue/business type, expected quantity, market and timing..."
        />
      </section>

      <SiteFooter />
    </main>
  );
}
