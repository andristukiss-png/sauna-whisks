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
        <Link href="#whisks">Whisks</Link>
        <Link href="#tradition">Traditions</Link>
        <Link href="#guide">Guide</Link>
        <Link href="#about">About</Link>
        <Link href="#wholesale">Wholesale</Link>
      </nav>
      <Link href="#whisks" className="header-cta">Explore whisks</Link>
    </header>
  );
}
