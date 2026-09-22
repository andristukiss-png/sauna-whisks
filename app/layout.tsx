import type { Metadata } from "next";
import "./globals.css";
import "./a11y.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://saunawhisks.com"),
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
    title: "Sauna Whisks — Baltic Sauna Tradition from Latvia",
    description: "Traditional sauna whisks and the living sauna traditions behind them.",
    url: "https://saunawhisks.com",
    siteName: "Sauna Whisks",
    type: "website",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": "https://saunawhisks.com/feed.xml"
    }
  },
  twitter: {
    card: "summary_large_image",
    title: "Sauna Whisks — Baltic Sauna Tradition from Latvia",
    description: "Traditional sauna whisks and the living sauna traditions behind them."
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sauna Whisks",
    url: "https://saunawhisks.com",
    description: "Sauna whisks and sauna tradition knowledge from Latvia.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://saunawhisks.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sauna Whisks",
    url: "https://saunawhisks.com",
    email: "info@SaunaWhisks.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "LV"
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
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div id="main-content" tabIndex={-1}>{children}</div>
      </body>
    </html>
  );
}
