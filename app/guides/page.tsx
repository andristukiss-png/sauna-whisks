import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { buyerGuides } from "@/lib/buyerGuides";

export const metadata = {
  title: "Sauna Whisk Buying Guides",
  description: "Practical buying guides for first-time users, home saunas, gifting, materials and trade trials.",
  alternates: { canonical: "/guides" }
};

export default function GuidesPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">BUYING GUIDES</p>
        <h1>Choose by use, not by branch count.</h1>
        <p>Start with who will use the whisk, how often, and what kind of sauna ritual they want.</p>
      </section>
      <section className="guide-card-grid">
        {buyerGuides.map((guide, index) => (
          <Link href={"/guides/" + guide.slug} key={guide.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{guide.title}</h2>
            <p>{guide.description}</p>
            <b>Open guide →</b>
          </Link>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
