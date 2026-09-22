import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://saunawhisks.com"),
  title: {
    default: "Sauna Whisks — Baltic Sauna Tradition from Latvia",
    template: "%s | Sauna Whisks",
  },
  description:
    "Traditional sauna whisks, veniks, vihta and Baltic sauna knowledge from Latvia. Birch, oak, eucalyptus and herbal sauna rituals for homes, saunas and trade partners.",
  openGraph: {
    title: "Sauna Whisks — Baltic Sauna Tradition from Latvia",
    description: "Traditional sauna whisks and the living sauna traditions behind them.",
    url: "https://saunawhisks.com",
    siteName: "Sauna Whisks",
    type: "website",
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
    description: "Sauna whisks and sauna tradition knowledge from Latvia."
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
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
