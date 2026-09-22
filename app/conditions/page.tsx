import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { productConditions } from "@/lib/productConditions";

export const metadata = {
  title: "Sauna Whisk Conditions & Preservation",
  description: "Compare dried, fresh, frozen and preserved sauna whisk formats.",
  alternates: { canonical: "/conditions" }
};

export default function ConditionsPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">CONDITION & PRESERVATION</p>
        <h1>The same branch behaves differently after preservation.</h1>
        <p>Fresh, dried, frozen and preserved formats have different logistics, preparation and quality risks.</p>
      </section>
      <section className="condition-grid">
        {productConditions.map((item, index) => (
          <Link href={"/conditions/" + item.slug} key={item.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{item.status}</b>
            <h2>{item.name}</h2>
            <p>{item.summary}</p>
            <em>Explore format →</em>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
