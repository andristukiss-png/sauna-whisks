import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getOperationGuide, operationGuides } from "@/lib/operations";

export function generateStaticParams() {
  return operationGuides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getOperationGuide(slug);
  if (!guide) return {};
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/operations/${guide.slug}` }
  };
}

export default async function OperationGuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getOperationGuide(slug);
  if (!guide) notFound();

  return (
    <main>
      <Header />
      <Breadcrumbs items={[
        { label: "Home", href: "/" },
        { label: "Operations", href: "/operations" },
        { label: guide.title }
      ]} />
      <section className="page-hero">
        <p className="section-kicker">{guide.eyebrow}</p>
        <h1>{guide.title}</h1>
        <p>{guide.description}</p>
      </section>

      <section className="operation-sections">
        {guide.sections.map((section, index) => (
          <article key={section.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{section.title}</h2>
            <p>{section.copy}</p>
          </article>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
