import site from "@/config/site.json";
import { publicJson } from "@/lib/publicApi";

export function GET(){
  return publicJson({
    tools:[
      {name:"Whisk finder",url:`${site.origin}/finder`},
      {name:"Quality checklist",url:`${site.origin}/checklist`},
      {name:"Supplier scorecard",url:`${site.origin}/tools/supplier-scorecard`},
      {name:"Landed-cost calculator",url:`${site.origin}/tools/landed-cost`},
      {name:"Trade demand estimator",url:`${site.origin}/tools/trade-demand`},
      {name:"Launch readiness",url:`${site.origin}/tools/launch-readiness`}
    ]
  });
}
