import site from "@/config/site.json";
import { publicJson } from "@/lib/publicApi";

export function GET(){
  return publicJson({
    brand:site.name,
    domain:site.host,
    base:"Latvia, European Union",
    status:"pre-launch",
    checkoutEnabled:false,
    contact:site.publicEmail,
    focus:["sauna whisks","materials","care","traditions","trade supply","producer documentation"],
    plannedCoreProducts:["Baltic Birch","Baltic Oak","Eucalyptus","Discovery Trio"],
    urls:{
      about:`${site.origin}/about`,
      status:`${site.origin}/status`,
      press:`${site.origin}/press`,
      editorialPolicy:`${site.origin}/editorial-policy`
    }
  });
}
