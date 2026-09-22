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
        <summary aria-label="Open navigation">Menu</summary>
        <div className="mobile-menu-panel">
          {links.map(([href, label]) => <Link href={href} key={href}>{label}</Link>)}
          <Link href="/faq">FAQ</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </details>
    </header>
  );
}
