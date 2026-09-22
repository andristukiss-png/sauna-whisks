import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: "/shop/latvian-oak", destination: "/shop/baltic-oak", permanent: true },
      { source: "/sauna-broom", destination: "/journal/sauna-whisk-vs-sauna-broom", permanent: true },
      { source: "/sauna-brooms", destination: "/journal/sauna-whisk-vs-sauna-broom", permanent: true },
      { source: "/venik", destination: "/journal/venik-vihta-vasta", permanent: true },
      { source: "/vihta", destination: "/journal/venik-vihta-vasta", permanent: true },
      { source: "/vasta", destination: "/journal/venik-vihta-vasta", permanent: true },
      { source: "/how-to-use-sauna-whisk", destination: "/journal/how-to-use-a-sauna-whisk", permanent: true },
      { source: "/dried-sauna-whisk", destination: "/journal/how-to-prepare-dried-sauna-whisk", permanent: true },
      { source: "/wholesale-sauna-whisks", destination: "/wholesale", permanent: true },
    ];
  },
};

export default nextConfig;
