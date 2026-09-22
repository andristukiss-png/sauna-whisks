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
        <Link href="/traditions">Traditions</Link>
        <Link href="/about">About</Link>
      </div>
      <div>
        <b>Company</b>
        <Link href="/wholesale">Wholesale</Link>
        <Link href="/contact">Contact</Link>
        <a href="mailto:hello@saunawhisks.com">Email</a>
      </div>
      <div className="footer-note">
        Traditional sauna culture,<br />presented with modern standards.
        <small>© 2026 SaunaWhisks.com</small>
      </div>
    </footer>
  );
}
