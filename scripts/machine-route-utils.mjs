import fs from "node:fs";
import path from "node:path";

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}

export function machineRouteFileToPath(file) {
  const normalized = file.replaceAll("\\", "/");
  const match = normalized.match(/^app\/(.+)\/route\.ts$/);
  if (!match || match[1].startsWith("api/")) {
    throw new Error("Unsupported machine route file: " + file);
  }
  return "/" + match[1];
}

export function discoverMachineRouteFiles() {
  return walk("app")
    .filter((file) => {
      const normalized = file.replaceAll("\\", "/");
      return normalized.endsWith("/route.ts") && !normalized.startsWith("app/api/");
    })
    .map((file) => file.replaceAll("\\", "/"))
    .sort();
}

export function discoverMachineRoutes() {
  return discoverMachineRouteFiles().map((file) => ({
    file,
    path: machineRouteFileToPath(file),
  }));
}
