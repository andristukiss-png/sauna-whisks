import Link from "next/link";
import { LeafMark } from "./LeafMark";

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-brand">
        <LeafMark />
        <b>SAUNA WHISKS</b>
        <span>LATVIA</span>
      </div>
      <div>
        <b>Explore</b>
        <Link href="/shop">Shop</Link>
        <Link href="/compare">Compare</Link>
        <Link href="/traditions">Traditions</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/glossary">Glossary</Link>
        <Link href="/usa">USA</Link>
      </div>
      <div>
        <b>Company</b>
        <Link href="/about">About</Link>
        <Link href="/standards">Standards</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/wholesale">Wholesale</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/shipping">Shipping</Link>
        <Link href="/privacy">Privacy</Link>
      </div>
      <div className="footer-note">
        Traditional sauna culture,<br />presented with modern standards.
        <small>© 2026 SaunaWhisks.com</small>
      </div>
    </footer>
  );
}
