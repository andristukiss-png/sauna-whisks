import { encodeCsv } from "@/lib/csv";
import { publicCsv } from "@/lib/publicApi";

export function GET() {
  const headers = [
    "supplier","sampleId","material","origin","condition","receivedDate","preparedDate",
    "preparationMethod","handleComfort","tieIntegrity","flexibility","leafRetention",
    "aroma","visibleDamage","notes","overallDecision"
  ];
  const example = ["","","","","","","","","","","","","","","",""];

  return publicCsv(
    encodeCsv([headers, example]),
    "saunawhisks-supplier-sample-template.csv",
    "attachment"
  );
}
