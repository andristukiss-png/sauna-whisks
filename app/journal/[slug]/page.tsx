import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { articles, getArticle } from "@/lib/articles";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArticleTools } from "@/components/ArticleTools";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/journal/${article.slug}` }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: `https://saunawhisks.com/journal/${article.slug}`,
    author: {
      "@type": "Organization",
      name: "Sauna Whisks"
    },
    publisher: {
      "@type": "Organization",
      name: "Sauna Whisks",
      url: "https://saunawhisks.com"
    },
    citation: article.sources.map((source) => source.url)
  };

  const sameTopic = articles.filter((candidate) => candidate.slug !== article.slug && candidate.eyebrow === article.eyebrow);
  const related = [...sameTopic, ...articles.filter((candidate) => candidate.slug !== article.slug && candidate.eyebrow !== article.eyebrow)].slice(0, 3);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }}
      />
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Journal", href: "/journal" },
        { label: article.title }
      ]} />
      <article className="article-page">
        <header className="article-header">
          <p className="section-kicker">{article.eyebrow}</p>
          <h1>{article.title}</h1>
          <p className="article-deck">{article.description}</p>
          <span>{article.readTime} read</span>
          <ArticleTools />
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

        <section className="article-related">
          <p className="section-kicker">READ NEXT</p>
          <div>
            {related.map((item) => (
              <Link href={"/journal/" + item.slug} key={item.slug}>
                <span>{item.eyebrow}</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <b>{item.readTime} →</b>
              </Link>
            ))}
          </div>
        </section>

      </article>
      <SiteFooter />
    </main>
  );
}
