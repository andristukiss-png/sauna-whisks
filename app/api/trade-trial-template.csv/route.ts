import { encodeCsv } from "@/lib/csv";
import { publicCsv } from "@/lib/publicApi";

export function GET() {
  const headers = [
    "business","location","trialStart","trialEnd","material","unitsReceived","unitsUsed",
    "prepTimeMinutes","leafRetention","staffFeedback","customerFeedback","wasteIssues",
    "preferredMaterial","estimatedMonthlyDemand","reorderDecision","notes"
  ];
  const example = ["","","","","","","","","","","","","","","",""];

  return publicCsv(
    encodeCsv([headers, example]),
    "saunawhisks-trade-trial-template.csv",
    "attachment"
  );
}
