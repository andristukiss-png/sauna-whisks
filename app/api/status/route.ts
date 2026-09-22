export function GET() {
  return Response.json({
    status: "pre-launch",
    checkoutEnabled: false,
    enquiriesOpen: true,
    sourceOfTruth: "GitHub main",
    contact: "info@SaunaWhisks.com",
  });
}
