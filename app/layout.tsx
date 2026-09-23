import site from "@/config/site.json";
import type { Metadata } from "next";
import "./globals.css";
import "./a11y.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.origin),
  title: {
    default: "Sauna Whisks — Baltic Sauna Tradition from Latvia",
    template: "%s | Sauna Whisks",
  },
  description:
    "Traditional sauna whisks, veniks, vihta and Baltic sauna knowledge from Latvia. Birch, oak, eucalyptus and herbal sauna rituals for homes, saunas and trade partners.",
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
      "application/rss+xml": `${site.origin}/feed.xml`
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
    description: "Sauna whisks and sauna tradition knowledge from Latvia.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
