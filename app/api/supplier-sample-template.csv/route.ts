function csv(value: string) {
  return '"' + value.replace(/"/g, '""') + '"';
}

export function GET() {
  const headers = [
    "supplier","sampleId","material","origin","condition","receivedDate","preparedDate",
    "preparationMethod","handleComfort","tieIntegrity","flexibility","leafRetention",
    "aroma","visibleDamage","notes","overallDecision"
  ];
  const example = ["","","","","","","","","","","","","","","",""];
  const body=[headers,example].map((row)=>row.map(csv).join(",")).join("\n");
  return new Response(body,{
    headers:{
      "Content-Type":"text/csv; charset=utf-8",
      "Content-Disposition":'attachment; filename="saunawhisks-supplier-sample-template.csv"',
      "Cache-Control":"public, max-age=3600"
    }
  });
}
