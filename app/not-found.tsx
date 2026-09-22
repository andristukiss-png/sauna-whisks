import Link from "next/link";
import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";

export default function NotFound() {
  return (
    <main>
      <Header />
      <section className="not-found">
        <p className="section-kicker">404 / LOST IN THE FOREST</p>
        <h1>This branch does not exist.</h1>
        <p>The page may have moved, or the address may be incorrect.</p>
        <div>
          <Link className="button button-dark" href="/">Return home</Link>
          <Link className="text-link" href="/shop">Browse sauna whisks →</Link>
          <Link className="text-link" href="/search">Search the site →</Link>
          <Link className="text-link" href="/help">Open help →</Link>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
