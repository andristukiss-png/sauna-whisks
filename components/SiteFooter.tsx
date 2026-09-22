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
        <Link href="/learn">Learn</Link>
        <Link href="/search">Search</Link>
        <Link href="/beginners">Beginners</Link>
        <Link href="/materials">Materials</Link>
        <Link href="/care">Care</Link>
        <Link href="/conditions">Conditions</Link>
        <Link href="/guides">Buying guides</Link>
        <Link href="/compare">Compare</Link>
        <Link href="/traditions">Traditions</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/glossary">Glossary</Link>
        <Link href="/markets">Markets</Link>
        <Link href="/usa">USA</Link>
        <a href="/feed.xml">RSS</a>
      </div>
      <div>
        <b>Company</b>
        <Link href="/about">About</Link>
        <Link href="/status">Launch status</Link>
        <Link href="/site-map">Site map</Link>
        <Link href="/standards">Standards</Link>
        <Link href="/operations">Operations</Link>
        <Link href="/sources">Sources</Link>
        <Link href="/faq">FAQ</Link>
        <Link href="/trade">Trade</Link>
        <Link href="/wholesale">Wholesale</Link>
        <Link href="/suppliers">Suppliers</Link>
        <Link href="/partners">Partners / Press</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/shipping">Shipping</Link>
        <Link href="/legal">Legal hub</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/terms">Terms</Link>
        <Link href="/returns">Returns</Link>
        <Link href="/cookies">Cookies</Link>
        <Link href="/accessibility">Accessibility</Link>
      </div>
      <div className="footer-note">
        Traditional sauna culture,<br />presented with modern standards.
        <small>© 2026 SaunaWhisks.com</small>
      </div>
    </footer>
  );
}
