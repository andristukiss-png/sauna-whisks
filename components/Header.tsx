import Link from "next/link";
import { LeafMark } from "./LeafMark";

const links = [
  ["/shop", "Whisks"],
  ["/learn", "Learn"],
  ["/journal", "Journal"],
  ["/about", "About"],
  ["/wholesale", "Wholesale"],
  ["/search", "Search"]
];

export function Header() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="prelaunch-bar">
        <span>PRE-LAUNCH · ENQUIRIES OPEN · CHECKOUT DISABLED</span>
        <Link href="/status">Launch status →</Link>
      </div>
      <header className="site-header">
        <Link href="/" className="brand" aria-label="Sauna Whisks home">
          <LeafMark className="brand-mark" />
          <span>
            <b>SAUNA WHISKS</b>
            <small>LATVIA · BALTIC TRADITION</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
        </nav>

        <Link href="/shop" className="header-cta">Explore whisks</Link>

        <details className="mobile-menu">
          <summary>Menu</summary>
          <nav className="mobile-menu-panel" aria-label="Mobile navigation">
            {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
            <Link href="/faq">FAQ</Link>
            <Link href="/resources">Resources</Link>
            <Link href="/tools">Tools</Link>
            <Link href="/trade">Trade</Link>
            <Link href="/help">Help</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </details>
      </header>
      <span id="main-content" className="skip-target" tabIndex={-1}>Main content</span>
    </>
  );
}
