import site from "@/config/site.json";
import { publicJson } from "@/lib/publicApi";
import { saunaWhisks } from "@/lib/products";
import { discoveryTrio } from "@/lib/bundles";
import { launchStatus } from "@/lib/status";

export function GET(){
  return publicJson({
    brand:site.name,
    domain:site.host,
    base:"Latvia, European Union",
    status:launchStatus.status,
    checkoutEnabled:launchStatus.checkoutEnabled,
    contact:launchStatus.contact,
    focus:["sauna whisks","materials","care","traditions","trade supply","producer documentation"],
    plannedCoreProducts:[...saunaWhisks.map((product)=>product.name), discoveryTrio.name],
    urls:{
      about:`${site.origin}/about`,
      status:`${site.origin}/status`,
      press:`${site.origin}/press`,
      editorialPolicy:`${site.origin}/editorial-policy`
    }
  });
}
