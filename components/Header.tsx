import Link from "next/link";
import { LeafMark } from "./LeafMark";
import { MobileMenu } from "./MobileMenu";

const links = [
  ["/shop", "Whisks"],
  ["/learn", "Learn"],
  ["/journal", "Journal"],
  ["/about", "About"],
  ["/wholesale", "Wholesale"],
  ["/search", "Search"]
] as const;

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

        <MobileMenu links={links} />
      </header>
    </>
  );
}
