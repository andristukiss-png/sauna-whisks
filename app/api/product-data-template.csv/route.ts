import { encodeCsv } from "@/lib/csv";
import { publicCsv } from "@/lib/publicApi";

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

  return publicCsv(
    encodeCsv([headers, example]),
    "saunawhisks-product-data-template.csv",
    "attachment"
  );
}
