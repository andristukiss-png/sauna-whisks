import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";
import { LeafMark } from "@/components/LeafMark";

export const metadata = {
  title: "About Sauna Whisks",
  description: "SaunaWhisks.com is a Latvia-based specialist brand focused on sauna whisks, ritual knowledge and Baltic sourcing.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <section className="about-page">
        <div className="about-page-art"><LeafMark /><span>57° N · LATVIA</span></div>
        <div className="about-page-copy">
          <p className="section-kicker">ABOUT</p>
          <h1>A specialist sauna company from Latvia.</h1>
          <p>
            SaunaWhisks.com is being built around one category that deserves more care:
            the sauna whisk and the traditions surrounding it.
          </p>
          <p>
            Our direction is simple — work close to Baltic producers, document materials and origin properly,
            explain how the products are used, and serve international customers with modern ecommerce standards.
          </p>
          <div className="principles">
            <div><span>01</span><b>Verified origin over vague storytelling.</b></div>
            <div><span>02</span><b>Small, understandable assortment over endless SKUs.</b></div>
            <div><span>03</span><b>Traditional knowledge presented clearly for modern sauna users.</b></div>
          </div>
        </div>
      </section>
      <section className="about-links">
        <a href="/company">Company hub →</a>
        <a href="/press">Press facts →</a>
        <a href="/editorial-policy">Editorial policy →</a>
        <a href="/status">Launch status →</a>
      </section>
      <SiteFooter />
    </main>
  );
}
