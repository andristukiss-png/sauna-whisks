const publicAccessHeaders = {
  "Access-Control-Allow-Origin": "*",
} as const;

export function publicJson(data: unknown, maxAge = 3600) {
  return Response.json(data, {
    headers: {
      ...publicAccessHeaders,
      "Cache-Control": `public, max-age=0, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 6}`,
    },
  });
}

export function noStoreJson(data: unknown, status = 200) {
  return Response.json(data, {
    status,
    headers: {
      ...publicAccessHeaders,
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

export function publicText(
  body: string,
  {
    contentType = "text/plain; charset=utf-8",
    maxAge = 3600,
    contentDisposition,
  }: {
    contentType?: string;
    maxAge?: number;
    contentDisposition?: string;
  } = {}
) {
  const headers: Record<string, string> = {
    ...publicAccessHeaders,
    "Content-Type": contentType,
    "Cache-Control": `public, max-age=${maxAge}`,
  };

  if (contentDisposition) headers["Content-Disposition"] = contentDisposition;

  return new Response(body, { headers });
}

export function publicCsv(
  body: string,
  filename: string,
  disposition: "inline" | "attachment" = "inline",
  maxAge = 3600
) {
  return publicText(body, {
    contentType: "text/csv; charset=utf-8",
    maxAge,
    contentDisposition: `${disposition}; filename="${filename}"`,
  });
}
