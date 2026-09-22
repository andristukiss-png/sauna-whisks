import { saunaWhisks } from "@/lib/products";
import { encodeCsv } from "@/lib/csv";
import { publicCsv } from "@/lib/publicApi";

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

  return publicCsv(encodeCsv(rows), "saunawhisks-catalog.csv");
}
