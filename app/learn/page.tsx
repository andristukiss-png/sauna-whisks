import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Learn Sauna Whisks",
  description: "A structured learning hub for sauna whisk materials, care, traditions and terminology.",
  alternates: { canonical: "/learn" }
};

const sections = [
  ["/beginners", "Start here", "A four-step path for your first sauna whisk."],
  ["/materials", "Materials", "Understand birch, oak and eucalyptus."],
  ["/care", "Care", "Preparation, storage, reuse and troubleshooting."],
  ["/traditions", "Traditions", "Latvian pirts, Finnish vihta/vasta and banya venik context."],
  ["/journal", "Journal", "All long-form guides and source-backed articles."],
  ["/glossary", "Glossary", "The language of whisking in one place."]
];

export default function LearnPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">LEARN</p>
        <h1>Understand the whisk before you buy it.</h1>
        <p>
          Start with the basics, then go deeper into material, preparation, care and regional traditions.
        </p>
      </section>

      <section className="learn-grid">
        {sections.map(([href, title, copy], index) => (
          <Link href={href} key={href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
            <b>Explore →</b>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
