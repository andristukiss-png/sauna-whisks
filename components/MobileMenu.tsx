"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const extraLinks = [
  ["/faq", "FAQ"],
  ["/resources", "Resources"],
  ["/tools", "Tools"],
  ["/trade", "Trade"],
  ["/help", "Help"],
  ["/contact", "Contact"],
] as const;

export function MobileMenu({
  links,
}: {
  links: readonly (readonly [string, string])[];
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (detailsRef.current) detailsRef.current.open = false;
  }, [pathname]);

  function closeMenu() {
    if (detailsRef.current) detailsRef.current.open = false;
  }

  return (
    <details className="mobile-menu" ref={detailsRef}>
      <summary>Menu</summary>
      <nav className="mobile-menu-panel" aria-label="Mobile navigation">
        {links.map(([href, label]) => (
          <Link href={href} key={href} onClick={closeMenu}>{label}</Link>
        ))}
        {extraLinks.map(([href, label]) => (
          <Link href={href} key={href} onClick={closeMenu}>{label}</Link>
        ))}
      </nav>
    </details>
  );
}
