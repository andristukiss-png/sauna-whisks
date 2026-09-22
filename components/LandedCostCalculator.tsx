"use client";

import { useMemo, useState } from "react";

function n(value:string){ const parsed=Number(value); return Number.isFinite(parsed)?parsed:0; }
function money(value:number){ return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(value||0); }

export function LandedCostCalculator(){
  const [supplier,setSupplier]=useState("8");
  const [freight,setFreight]=useState("150");
  const [units,setUnits]=useState("100");
  const [packaging,setPackaging]=useState("1.5");
  const [fulfilment,setFulfilment]=useState("3");
  const [processing,setProcessing]=useState("3");
  const [retail,setRetail]=useState("24");
  const [shippingSubsidy,setShippingSubsidy]=useState("0");

  const calc=useMemo(()=>{
    const unitCount=Math.max(1,n(units));
    const inbound=n(freight)/unitCount;
    const base=n(supplier)+inbound+n(packaging)+n(fulfilment);
    const payment=n(retail)*(n(processing)/100);
    const total=base+payment+n(shippingSubsidy);
    const contribution=n(retail)-total;
    const margin=n(retail)>0?(contribution/n(retail))*100:0;
    return {inbound,total,contribution,margin};
  },[supplier,freight,units,packaging,fulfilment,processing,retail,shippingSubsidy]);

  const fields=[
    ["Supplier unit cost",supplier,setSupplier],
    ["Inbound freight per shipment",freight,setFreight],
    ["Units in shipment",units,setUnits],
    ["Packaging per unit",packaging,setPackaging],
    ["Fulfilment per unit",fulfilment,setFulfilment],
    ["Payment processing %",processing,setProcessing],
    ["Retail price",retail,setRetail],
    ["Shipping subsidy per order/unit",shippingSubsidy,setShippingSubsidy],
  ] as const;

  return <div className="calculator">
    <div className="calculator-fields">
      {fields.map(([label,value,setter])=><label key={label}>
        <span>{label}</span>
        <input type="number" min="0" step="0.01" value={value} onChange={(e)=>setter(e.target.value)}/>
      </label>)}
    </div>
    <div className="calculator-result" aria-live="polite">
      <div><span>Inbound freight / unit</span><b>{money(calc.inbound)}</b></div>
      <div><span>Estimated variable cost / unit</span><b>{money(calc.total)}</b></div>
      <div><span>Contribution before CAC</span><b>{money(calc.contribution)}</b></div>
      <div><span>Contribution margin</span><b>{calc.margin.toFixed(1)}%</b></div>
      <small>Planning model only. Taxes, duties, returns, damage, storage and other costs may still apply.</small>
    </div>
  </div>;
}
