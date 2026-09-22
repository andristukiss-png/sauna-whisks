export function GET() {
  return Response.json({
    service: "SaunaWhisks.com public data",
    status: "pre-launch",
    endpoints: [
      "/api/health",
      "/api/status",
      "/api/catalog",
      "/api/catalog.csv",
      "/api/articles",
      "/api/search?q=birch",
      "/api/markets",
      "/api/trade",
      "/api/materials",
      "/api/conditions",
      "/api/glossary",
      "/api/guides",
      "/api/operations",
      "/api/sources",
      "/api/sources.csv"
    ]
  });
}
