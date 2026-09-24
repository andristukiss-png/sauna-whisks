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

      <div className="footer-menu-grid">
        <nav className="footer-links" aria-label="Shop and explore">
          <b>Shop &amp; Explore</b>
          <Link prefetch={false} href="/shop">Shop</Link>
          <Link prefetch={false} href="/catalog">Product data</Link>
          <Link prefetch={false} href="/compare">Compare</Link>
          <Link prefetch={false} href="/finder">Whisk finder</Link>
          <Link prefetch={false} href="/shipping">Shipping</Link>
          <Link prefetch={false} href="/markets">Markets</Link>
          <Link prefetch={false} href="/usa">USA</Link>
          <Link prefetch={false} href="/search">Search</Link>
        </nav>

        <nav className="footer-links" aria-label="Learn">
          <b>Learn</b>
          <Link prefetch={false} href="/learn">Learning hub</Link>
          <Link prefetch={false} href="/beginners">Beginners</Link>
          <Link prefetch={false} href="/materials">Materials</Link>
          <Link prefetch={false} href="/care">Care</Link>
          <Link prefetch={false} href="/conditions">Conditions</Link>
          <Link prefetch={false} href="/guides">Buying guides</Link>
          <Link prefetch={false} href="/use-cases">Use cases</Link>
          <Link prefetch={false} href="/techniques">Techniques</Link>
          <Link prefetch={false} href="/traditions">Traditions</Link>
          <Link prefetch={false} href="/journal">Journal</Link>
          <Link prefetch={false} href="/glossary">Glossary</Link>
          <Link prefetch={false} href="/resources">Resources</Link>
          <a href="/feed.xml">RSS</a>
        </nav>

        <nav className="footer-links" aria-label="Trade and operations">
          <b>Trade &amp; Operations</b>
          <Link prefetch={false} href="/trade">Trade</Link>
          <Link prefetch={false} href="/wholesale">Wholesale</Link>
          <Link prefetch={false} href="/suppliers">Suppliers</Link>
          <Link prefetch={false} href="/partners">Partners / Press</Link>
          <Link prefetch={false} href="/quality">Quality</Link>
          <Link prefetch={false} href="/standards">Standards</Link>
          <Link prefetch={false} href="/operations">Operations</Link>
          <Link prefetch={false} href="/tools">Tools</Link>
          <Link prefetch={false} href="/templates">Templates</Link>
          <Link prefetch={false} href="/checklist">Quality checklist</Link>
        </nav>

        <nav className="footer-links" aria-label="Company and trust">
          <b>Company &amp; Trust</b>
          <Link prefetch={false} href="/company">Company</Link>
          <Link prefetch={false} href="/about">About</Link>
          <Link prefetch={false} href="/press">Press facts</Link>
          <Link prefetch={false} href="/status">Launch status</Link>
          <Link prefetch={false} href="/data">Public data</Link>
          <Link prefetch={false} href="/claims">Claims standard</Link>
          <Link prefetch={false} href="/sources">Sources</Link>
          <Link prefetch={false} href="/editorial-policy">Editorial policy</Link>
          <Link prefetch={false} href="/corrections">Corrections</Link>
          <Link prefetch={false} href="/site-map">Site map</Link>
        </nav>

        <nav className="footer-links" aria-label="Help and legal">
          <b>Help &amp; Legal</b>
          <Link prefetch={false} href="/faq">FAQ</Link>
          <Link prefetch={false} href="/help">Help</Link>
          <Link prefetch={false} href="/contact">Contact</Link>
          <Link prefetch={false} href="/legal">Legal hub</Link>
          <Link prefetch={false} href="/privacy">Privacy</Link>
          <Link prefetch={false} href="/terms">Terms</Link>
          <Link prefetch={false} href="/returns">Returns</Link>
          <Link prefetch={false} href="/cookies">Cookies</Link>
          <Link prefetch={false} href="/accessibility">Accessibility</Link>
        </nav>
      </div>

      <div className="footer-note">
        <span>Traditional sauna culture, presented with modern standards.</span>
        <small>© 2026 SaunaWhisks.com</small>
      </div>
    </footer>
  );
}
