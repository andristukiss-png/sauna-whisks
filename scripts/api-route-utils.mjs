import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

export function apiRouteFileToPath(file) {
  const normalized = file.replaceAll("\\", "/");
  if (normalized === "app/api/route.ts") return "/api";
  const match = normalized.match(/^app\/api\/(.+)\/route\.ts$/);
  if (!match) throw new Error("Unsupported API route file: " + file);
  return "/api/" + match[1];
}

export function discoverApiRouteFiles() {
  return walk("app/api")
    .filter((file) => file.replaceAll("\\", "/").endsWith("/route.ts"))
    .map((file) => file.replaceAll("\\", "/"))
    .sort();
}

export function discoverApiRoutes() {
  return discoverApiRouteFiles().map((file) => ({
    file,
    path: apiRouteFileToPath(file),
  }));
}
