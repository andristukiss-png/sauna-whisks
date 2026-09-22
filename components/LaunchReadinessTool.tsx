"use client";

import { useState } from "react";

const groups = [
  ["Product",["Launch SKUs selected","Supplier identity verified","Origin documented","Condition confirmed","Preparation tested","Packaging approved"]],
  ["Compliance",["Selling entity details ready","VAT/tax approach confirmed","Returns policy finalized","Market import checks completed"]],
  ["Commercial",["Landed cost known","Retail prices approved","Shipping economics modeled","Trade pricing drafted"]],
  ["Technical",["GitHub/Vercel deployment green","Enquiry delivery configured","Sender domain verified","Checkout integration tested"]],
  ["QA",["Mobile QA complete","Accessibility QA complete","Test order completed","Rollback path documented"]],
] as const;

export function LaunchReadinessTool(){
  const flat=groups.flatMap(([,items])=>items);
  const [checked,setChecked]=useState<Record<string,boolean>>({});
  const done=flat.filter((item)=>checked[item]).length;
  const pct=Math.round((done/flat.length)*100);

  return <div className="readiness-tool">
    <aside>
      <b role="status" aria-live="polite">{pct}%</b>
      <p>{done}/{flat.length} launch gates complete</p>
      <small>Commercial checkout should remain disabled until critical gates are genuinely complete.</small>
      <button type="button" onClick={()=>setChecked({})}>Reset</button>
    </aside>
    <div>
      {groups.map(([group,items])=><section key={group}>
        <h2>{group}</h2>
        {items.map((item)=><label key={item}>
          <input type="checkbox" checked={Boolean(checked[item])} onChange={(e)=>setChecked({...checked,[item]:e.target.checked})}/>
          <span>{item}</span>
        </label>)}
      </section>)}
    </div>
  </div>;
}
