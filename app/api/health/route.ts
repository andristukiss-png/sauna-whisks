export function GET() {
  return Response.json({
    ok: true,
    service: "saunawhisks.com",
    status: "pre-launch",
  });
}
