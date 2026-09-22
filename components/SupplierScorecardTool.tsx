"use client";

import { useMemo, useState } from "react";

const criteria = [
  "Origin documentation",
  "Botanical detail",
  "Harvest information",
  "Processing / condition clarity",
  "Sample quality",
  "Leaf retention",
  "Packaging",
  "Capacity",
  "Lead time",
  "Export experience",
  "Responsiveness",
  "Traceability",
];

export function SupplierScorecardTool(){
  const [scores,setScores]=useState<number[]>(criteria.map(()=>0));
  const total=useMemo(()=>scores.reduce((a,b)=>a+b,0),[scores]);
  const max=criteria.length*5;
  const complete=scores.filter(Boolean).length;

  return <div className="scorecard-tool">
    <aside className="scorecard-summary">
      <span>{total}/{max}</span>
      <p>{complete}/{criteria.length} criteria scored</p>
      <small>Internal comparison tool only. A score does not replace evidence.</small>
      <button type="button" onClick={()=>setScores(criteria.map(()=>0))}>Reset</button>
    </aside>
    <div className="scorecard-criteria">
      {criteria.map((criterion,index)=><div key={criterion}>
        <div><span>{String(index+1).padStart(2,"0")}</span><b>{criterion}</b></div>
        <label>
          <span className="sr-only">Score {criterion}</span>
          <select
            value={scores[index]}
            onChange={(e)=>{
              const next=[...scores];
              next[index]=Number(e.target.value);
              setScores(next);
            }}
          >
            <option value={0}>Not scored</option>
            <option value={1}>1 — weak / unknown</option>
            <option value={2}>2</option>
            <option value={3}>3 — acceptable</option>
            <option value={4}>4</option>
            <option value={5}>5 — strong evidence</option>
          </select>
        </label>
      </div>)}
    </div>
  </div>;
}
