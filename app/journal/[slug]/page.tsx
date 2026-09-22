import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { articles, getArticle } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <main>
      <Header />
      <article className="article-page">
        <header className="article-header">
          <p className="section-kicker">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.description}</p>
          <span>{article.readTime} read</span>
        </header>

        <div className="article-body">
          <aside>
            <p>IN THIS GUIDE</p>
            {article.sections.map((section, index) => (
              <a href={"#section-" + index} key={section.heading}>{section.heading}</a>
            ))}
          </aside>

          <div className="article-content">
            {article.sections.map((section, index) => (
              <section id={"section-" + index} key={section.heading}>
                <span>0{index + 1}</span>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>
            ))}

            <section className="article-sources">
              <p className="section-kicker">SOURCES & FURTHER READING</p>
              {article.sources.map((source) => (
                <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>
                  {source.label} ↗
                </a>
              ))}
            </section>

            <Link href="/journal" className="text-link">← Back to the sauna library</Link>
          </div>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
