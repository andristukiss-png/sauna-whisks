import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { articles } from "@/lib/articles";

export const metadata = {
  title: "Sauna Whisk Journal",
  description:
    "Practical guides to sauna whisks, Latvian pirts, venik, vihta, vasta, materials, preparation and sauna traditions."
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

      <section className="journal-list">
        {articles.map((article, index) => (
          <Link href={"/journal/" + article.slug} className="journal-row" key={article.slug}>
            <span className="journal-index">0{index + 1}</span>
            <div>
              <p>{article.eyebrow}</p>
              <h2>{article.title}</h2>
              <p className="journal-description">{article.description}</p>
            </div>
            <span className="journal-time">{article.readTime} →</span>
          </Link>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
