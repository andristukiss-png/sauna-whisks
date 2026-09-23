const spreadsheetFormulaPrefix = /^[\t\r\n ]*[=+\-@]/;

export function csvCell(value: string) {
  const safeValue = spreadsheetFormulaPrefix.test(value) ? "'" + value : value;
  return '"' + safeValue.replace(/"/g, '""') + '"';
}

export function encodeCsv(rows: string[][]) {
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}
