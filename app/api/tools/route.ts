import { publicJson } from "@/lib/publicApi";

export function GET(){
  return publicJson({
    tools:[
      {name:"Whisk finder",url:"https://saunawhisks.com/finder"},
      {name:"Quality checklist",url:"https://saunawhisks.com/checklist"},
      {name:"Supplier scorecard",url:"https://saunawhisks.com/tools/supplier-scorecard"},
      {name:"Landed-cost calculator",url:"https://saunawhisks.com/tools/landed-cost"},
      {name:"Trade demand estimator",url:"https://saunawhisks.com/tools/trade-demand"},
      {name:"Launch readiness",url:"https://saunawhisks.com/tools/launch-readiness"}
    ]
  });
}
