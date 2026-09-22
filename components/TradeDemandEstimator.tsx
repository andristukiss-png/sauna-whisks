"use client";

import { useMemo, useState } from "react";

export function TradeDemandEstimator(){
  const [sessions,setSessions]=useState("20");
  const [whisksPerSession,setWhisksPerSession]=useState("2");
  const [usesPerWhisk,setUsesPerWhisk]=useState("1");

  const monthly=useMemo(()=>{
    const s=Math.max(0,Number(sessions)||0);
    const w=Math.max(0,Number(whisksPerSession)||0);
    const u=Math.max(1,Number(usesPerWhisk)||1);
    return Math.ceil((s*w*4.33)/u);
  },[sessions,whisksPerSession,usesPerWhisk]);

  return <div className="demand-estimator">
    <div className="calculator-fields">
      <label><span>Whisking sessions per week</span><input type="number" min="0" value={sessions} onChange={(e)=>setSessions(e.target.value)}/></label>
      <label><span>Whisks used per session</span><input type="number" min="0" step="0.5" value={whisksPerSession} onChange={(e)=>setWhisksPerSession(e.target.value)}/></label>
      <label><span>Average sessions per whisk</span><input type="number" min="1" step="1" value={usesPerWhisk} onChange={(e)=>setUsesPerWhisk(e.target.value)}/></label>
    </div>
    <div className="demand-result">
      <span>WORKING MONTHLY REQUIREMENT</span>
      <b aria-live="polite">{monthly}</b>
      <p>whisks / month</p>
      <small>Uses 4.33 weeks/month. Real consumption depends on material, venue practice and whether reuse is appropriate.</small>
    </div>
  </div>;
}
