const publicAccessHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Cross-Origin-Resource-Policy": "cross-origin",
} as const;

function publicCacheControl(maxAge: number) {
  const safeMaxAge = Math.max(0, Math.floor(maxAge));
  return `public, max-age=0, s-maxage=${safeMaxAge}, stale-while-revalidate=${safeMaxAge * 6}`;
}

export function publicJson(data: unknown, maxAge = 3600) {
  return Response.json(data, {
    headers: {
      ...publicAccessHeaders,
      "Cache-Control": publicCacheControl(maxAge),
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
    "Cache-Control": publicCacheControl(maxAge),
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
