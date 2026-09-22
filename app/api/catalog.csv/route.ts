import { saunaWhisks } from "@/lib/products";

function csv(value: string) {
  return '"' + value.replace(/"/g, '""') + '"';
}

export function GET() {
  const rows = [
    ["slug","name","material","botanicalGroup","origin","status","plannedCondition","verification","plannedPrice","availableForPurchase"],
    ...saunaWhisks.map((whisk) => [
      whisk.slug,
      whisk.name,
      whisk.material,
      whisk.latin,
      whisk.origin,
      whisk.status,
      whisk.plannedCondition,
      whisk.verification,
      whisk.plannedPrice,
      String(whisk.availableForPurchase),
    ]),
  ];
  return new Response(rows.map((row) => row.map((value) => csv(value)).join(",")).join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'inline; filename="saunawhisks-catalog.csv"',
    },
  });
}
