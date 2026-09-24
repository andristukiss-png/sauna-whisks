import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteSearch } from "@/components/SiteSearch";
import { siteSearchItems } from "@/lib/siteSearch";
import { isSiteSearchFilter, MAX_SEARCH_QUERY_LENGTH } from "@/lib/search";

export const metadata = pageMetadata({
  title: "Search",
  description: "Search SaunaWhisks.com products, guides, markets and trade information.",
  canonical: "/search",
  robots: { index: false, follow: true },
});

type SearchParamValue = string | string[] | undefined;

function firstSearchParam(value: SearchParamValue) {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: SearchParamValue; type?: SearchParamValue }>;
}) {
  const { q, type } = await searchParams;
  const initialQuery = firstSearchParam(q).slice(0, MAX_SEARCH_QUERY_LENGTH);
  const requestedType = firstSearchParam(type) || "All";
  const initialType = isSiteSearchFilter(requestedType) ? requestedType : "All";

  return (
    <>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Search" }]} />
      <section className="page-hero compact-hero">
        <p className="section-kicker">SEARCH</p>
        <h1>Find the branch you need.</h1>
        <p>Search products, materials, preparation guides, traditions, launch markets and trade information.</p>
      </section>
      <SiteSearch items={siteSearchItems} initialQuery={initialQuery} initialType={initialType} />
    </>
  );
}
