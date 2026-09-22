function csv(value: string) {
  return '"' + value.replace(/"/g, '""') + '"';
}

export function GET() {
  const headers = [
    "internalSku","publicName","material","botanicalIdentity","harvestCountry","harvestRegion",
    "productionCountry","producer","harvestSeason","condition","lengthCm","weightG",
    "naturalTolerance","handleDescription","preparation","storage","leafRetentionNotes",
    "wholesaleUnitCost","packagingCost","fulfilmentCost","retailPrice","importStatus","batchLot"
  ];
  const example = [
    "","Example product","Birch","Betula","","","","","","Dried","","","","","","","","","","","","",""
  ];
  const body=[headers,example].map((row)=>row.map(csv).join(",")).join("\n");
  return new Response(body,{
    headers:{
      "Content-Type":"text/csv; charset=utf-8",
      "Content-Disposition":'attachment; filename="saunawhisks-product-data-template.csv"',
      "Cache-Control":"public, max-age=3600"
    }
  });
}
