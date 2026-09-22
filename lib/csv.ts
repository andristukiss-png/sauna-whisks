export function csvCell(value: string) {
  return '"' + value.replace(/"/g, '""') + '"';
}

export function encodeCsv(rows: string[][]) {
  return rows.map((row) => row.map(csvCell).join(",")).join("\n");
}
