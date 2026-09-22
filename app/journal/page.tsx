import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { articles } from "@/lib/articles";
import { JournalSearch } from "@/components/JournalSearch";

export const metadata = {
  title: "Sauna Whisk Journal",
  description:
    "Practical guides to sauna whisks, Latvian pirts, venik, vihta, vasta, materials, preparation and sauna traditions.",
  alternates: { canonical: "/journal" }
};

export default function JournalPage() {
  return (
    <main>
      <Header />
      <section className="page-hero">
        <p className="section-kicker">THE SAUNA LIBRARY</p>
        <h1>Knowledge before commerce.</h1>
        <p>
          Materials, language, preparation and regional traditions — documented so a sauna whisk makes sense before you buy one.
        </p>
      </section>

      <div className="journal-topic-link">
        <a className="text-link" href="/journal/topics">Browse by topic →</a>
      </div>
      <JournalSearch items={articles.map(({ slug, title, eyebrow, description, readTime }) => ({
        slug, title, eyebrow, description, readTime
      }))} />

      <SiteFooter />
    </main>
  );
}
