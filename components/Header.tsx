import Link from "next/link";
import { LeafMark } from "./LeafMark";

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
      <nav aria-label="Primary navigation">
        <Link href="/shop">Whisks</Link>
        <Link href="/traditions">Traditions</Link>
        <Link href="/journal">Journal</Link>
        <Link href="/about">About</Link>
        <Link href="/wholesale">Wholesale</Link>
      </nav>
      <Link href="/shop" className="header-cta">Explore whisks</Link>
    </header>
  );
}
