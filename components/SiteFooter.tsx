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
      <nav className="footer-links" aria-label="Explore">
        <b>Explore</b>
        <Link prefetch={false} href="/shop">Shop</Link>
        <Link prefetch={false} href="/catalog">Product data</Link>
        <Link prefetch={false} href="/learn">Learn</Link>
        <Link prefetch={false} href="/resources">Resources</Link>
        <Link prefetch={false} href="/templates">Templates</Link>
        <Link prefetch={false} href="/quality">Quality</Link>
        <Link prefetch={false} href="/search">Search</Link>
        <Link prefetch={false} href="/beginners">Beginners</Link>
        <Link prefetch={false} href="/materials">Materials</Link>
        <Link prefetch={false} href="/care">Care</Link>
        <Link prefetch={false} href="/conditions">Conditions</Link>
        <Link prefetch={false} href="/guides">Buying guides</Link>
        <Link prefetch={false} href="/use-cases">Use cases</Link>
        <Link prefetch={false} href="/techniques">Techniques</Link>
        <Link prefetch={false} href="/finder">Whisk finder</Link>
        <Link prefetch={false} href="/checklist">Quality checklist</Link>
        <Link prefetch={false} href="/compare">Compare</Link>
        <Link prefetch={false} href="/traditions">Traditions</Link>
        <Link prefetch={false} href="/journal">Journal</Link>
        <Link prefetch={false} href="/glossary">Glossary</Link>
        <Link prefetch={false} href="/markets">Markets</Link>
        <Link prefetch={false} href="/usa">USA</Link>
        <a href="/feed.xml">RSS</a>
      </nav>
      <nav className="footer-links" aria-label="Company">
        <b>Company</b>
        <Link prefetch={false} href="/about">About</Link>
        <Link prefetch={false} href="/status">Launch status</Link>
        <Link prefetch={false} href="/site-map">Site map</Link>
        <Link prefetch={false} href="/data">Public data</Link>
        <Link prefetch={false} href="/standards">Standards</Link>
        <Link prefetch={false} href="/operations">Operations</Link>
        <Link prefetch={false} href="/claims">Claims standard</Link>
        <Link prefetch={false} href="/sources">Sources</Link>
        <Link prefetch={false} href="/faq">FAQ</Link>
        <Link prefetch={false} href="/trade">Trade</Link>
        <Link prefetch={false} href="/wholesale">Wholesale</Link>
        <Link prefetch={false} href="/suppliers">Suppliers</Link>
        <Link prefetch={false} href="/partners">Partners / Press</Link>
        <Link prefetch={false} href="/contact">Contact</Link>
        <Link prefetch={false} href="/shipping">Shipping</Link>
        <Link prefetch={false} href="/legal">Legal hub</Link>
        <Link prefetch={false} href="/privacy">Privacy</Link>
        <Link prefetch={false} href="/terms">Terms</Link>
        <Link prefetch={false} href="/returns">Returns</Link>
        <Link prefetch={false} href="/cookies">Cookies</Link>
        <Link prefetch={false} href="/accessibility">Accessibility</Link>
      </nav>
      <div className="footer-note">
        Traditional sauna culture,<br />presented with modern standards.
        <small>© 2026 SaunaWhisks.com</small>
      </div>
    </footer>
  );
}
