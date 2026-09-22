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
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sauna Whisks — Baltic Sauna Tradition from Latvia",
    description: "Traditional sauna whisks and the living sauna traditions behind them.",
    url: "https://saunawhisks.com",
    siteName: "Sauna Whisks",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
