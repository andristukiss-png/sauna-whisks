import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { EnquiryForm } from "@/components/EnquiryForm";
import { getMarket, markets } from "@/lib/markets";

export function generateStaticParams() {
  return markets.map((market) => ({ slug: market.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const market = getMarket(slug);
  if (!market) return {};
  return {
    title: `Sauna Whisks in ${market.name}`,
    description: market.summary,
    alternates: { canonical: `/markets/${market.slug}` }
  };
}

export default async function MarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const market = getMarket(slug);
  if (!market) notFound();

  return (
    <main>
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Markets", href: "/markets" },
        { label: market.name }
      ]} />

      <section className="page-hero">
        <p className="section-kicker">{market.status.toUpperCase()} / {market.name.toUpperCase()}</p>
        <h1>{market.headline}</h1>
        <p>{market.summary}</p>
      </section>

      <section className="market-plan">
        <div>
          <p className="section-kicker">PRIORITIES</p>
          <ul>
            {market.priorities.map((priority) => <li key={priority}>{priority}</li>)}
          </ul>
        </div>
        <div>
          <p className="section-kicker">LOGISTICS</p>
          <p>{market.logistics}</p>
        </div>
      </section>

      <section className="trade-contact">
        <p className="section-kicker">MARKET ENQUIRY</p>
        <h2>Interested in {market.name}?</h2>
        <p>Tell us whether you are a home sauna user, retailer, venue, builder or potential partner.</p>
        <EnquiryForm
          subject={`SaunaWhisks.com — ${market.enquiryTopic}`}
          topics={["Customer interest", "Retail / stockist", "Public sauna / venue", "Sauna builder", "Distributor", "Other"]}
          businessFields
        />
      </section>

      <SiteFooter />
    </main>
  );
}
