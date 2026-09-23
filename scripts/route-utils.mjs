import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

function routeSegmentsFromPageFile(file) {
  const relative = path.relative("app", file).replace(/\\/g, "/");
  if (relative === "page.tsx") return [];

  return relative
    .replace(/\/page\.tsx$/, "")
    .split("/")
    .filter(Boolean)
    .filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")));
}

export function discoverPageFiles() {
  return walk("app").filter((file) => file.endsWith("page.tsx"));
}

export function pageFileToRoute(file) {
  const segments = routeSegmentsFromPageFile(file);
  return "/" + segments.join("/");
}

export function discoverStaticPageRoutes() {
  return discoverPageFiles()
    .filter((file) => !pageFileToRoute(file).includes("["))
    .map(pageFileToRoute)
    .sort();
}

export function discoverDynamicPageFiles() {
  return discoverPageFiles()
    .filter((file) => pageFileToRoute(file).includes("["))
    .sort();
}

export function discoverDynamicRoutePrefixes() {
  return [
    ...new Set(
      discoverDynamicPageFiles().map((file) => {
        const route = pageFileToRoute(file);
        const bracket = route.indexOf("[");
        const before = bracket >= 0 ? route.slice(0, bracket) : route;
        return before.endsWith("/") ? before : before + "/";
      })
    ),
  ].sort();
}
