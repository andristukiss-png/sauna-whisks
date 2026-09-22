import { Header } from "@/components/Header";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata = {
  title: "Returns & Refunds",
  description: "Pre-launch returns and refunds information for SaunaWhisks.com.",
  alternates: { canonical: "/returns" }
};

export default function ReturnsPage() {
  return (
    <main>
      <Header />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Returns" }]} />
      <article className="legal-page">
        <p className="section-kicker">RETURNS & REFUNDS</p>
        <h1>Before sales open</h1>

        <section>
          <h2>No purchases are currently accepted</h2>
          <p>
            SaunaWhisks.com is not yet taking payment, so there are currently no customer orders to return or refund.
          </p>
        </section>

        <section>
          <h2>Natural-product expectations</h2>
          <p>
            Sauna whisks are natural plant products. Size, color, leaf density and minor shedding may vary.
            Before launch we will define what counts as acceptable natural variation and what qualifies as damage or a product fault.
          </p>
        </section>

        <section>
          <h2>Commercial policy before checkout</h2>
          <p>
            A full returns, refund, cancellation and damaged-goods policy will be published before checkout is enabled,
            including any market-specific consumer rights that apply.
          </p>
        </section>

        <section>
          <h2>Questions</h2>
          <p>
            For pre-launch questions, contact <a href="mailto:info@SaunaWhisks.com">info@SaunaWhisks.com</a>.
          </p>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
