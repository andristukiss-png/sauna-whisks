function csv(value: string) {
  return '"' + value.replace(/"/g, '""') + '"';
}

export function GET() {
  const headers = [
    "business","location","trialStart","trialEnd","material","unitsReceived","unitsUsed",
    "prepTimeMinutes","leafRetention","staffFeedback","customerFeedback","wasteIssues",
    "preferredMaterial","estimatedMonthlyDemand","reorderDecision","notes"
  ];
  const example = ["","","","","","","","","","","","","","","",""];
  const body=[headers,example].map((row)=>row.map(csv).join(",")).join("\n");
  return new Response(body,{
    headers:{
      "Content-Type":"text/csv; charset=utf-8",
      "Content-Disposition":'attachment; filename="saunawhisks-trade-trial-template.csv"',
      "Cache-Control":"public, max-age=3600"
    }
  });
}
