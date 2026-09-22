import fs from "node:fs";

const errors=[];

const sitemap=fs.readFileSync("app/sitemap.ts","utf8");
const staticBlock=sitemap.match(/const staticPages = \[([\s\S]*?)\];/);
if(staticBlock){
  const routes=[...staticBlock[1].matchAll(/"([^"]*)"/g)].map((m)=>m[1]);
  const duplicates=routes.filter((route,index)=>routes.indexOf(route)!==index);
  if(duplicates.length) errors.push("Duplicate sitemap routes: "+[...new Set(duplicates)].join(", "));
}

const search=fs.readFileSync("lib/siteSearch.ts","utf8");
const hrefs=[...search.matchAll(/href:\s*"([^"]+)"/g)].map((m)=>m[1]);
const duplicateHrefs=hrefs.filter((href,index)=>hrefs.indexOf(href)!==index);
if(duplicateHrefs.length) errors.push("Duplicate static search hrefs: "+[...new Set(duplicateHrefs)].join(", "));

if(errors.length){
  console.error("Duplicate validation failed:");
  errors.forEach((error)=>console.error("- "+error));
  process.exit(1);
}

console.log("Duplicate validation passed.");
