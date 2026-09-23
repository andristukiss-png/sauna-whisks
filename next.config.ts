import site from "./config/site.json";
import { publicCrossOriginPaths } from "./lib/publicData";
import type { NextConfig } from "next";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
        ],
      },
      ...publicCrossOriginPaths.map((source) => ({
        source,
        headers: [
          { key: "Cross-Origin-Resource-Policy", value: "cross-origin" },
        ],
      })),
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: site.wwwHost }],
        destination: `${site.origin}/:path*`,
        permanent: true,
      },
      { source: "/markets/united-states", destination: "/usa", permanent: true },
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
