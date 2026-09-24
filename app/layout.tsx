import { Header } from "@/components/Header";
import { SiteFooter } from "@/components/SiteFooter";
import { StructuredData } from "@/components/StructuredData";
import site from "@/config/site.json";
import type { Metadata } from "next";
import "./globals.css";
import "./a11y.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: "Sauna Whisks — Sauna Ritual Knowledge from Latvia",
    template: "%s | Sauna Whisks",
  },
  description:
    "Traditional sauna whisks — also known as sauna brooms, venik, vihta or vasta — plus Baltic sauna knowledge for homes, saunas and trade partners.",
  applicationName: "Sauna Whisks",
  creator: "Sauna Whisks",
  publisher: "Sauna Whisks",
  category: "Sauna and wellness",
  openGraph: {
    siteName: site.name,
    type: "website",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${site.origin}/feed.xml`,
      "application/feed+json": `${site.origin}/feed.json`,
    }
  },
  twitter: {
    card: "summary_large_image"
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.origin,
    description: "Sauna whisk knowledge, terminology, care and traditions from a Latvia-based specialist brand.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.origin}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.origin,
    email: site.publicEmail,
    address: {
      "@type": "PostalAddress",
      addressCountry: site.countryCode
    }
  };

  return (
    <html lang="en">
      <body>
        <StructuredData data={websiteSchema} />
        <StructuredData data={organizationSchema} />
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
