"use client";

import { useMemo, useState } from "react";

function numberOrZero(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function nonNegative(value: string) {
  return Math.max(0, numberOrZero(value));
}

function percentage(value: string) {
  return Math.min(100, nonNegative(value));
}

function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export function LandedCostCalculator() {
  const [supplier, setSupplier] = useState("8");
  const [freight, setFreight] = useState("150");
  const [units, setUnits] = useState("100");
  const [packaging, setPackaging] = useState("1.5");
  const [fulfilment, setFulfilment] = useState("3");
  const [processing, setProcessing] = useState("3");
  const [retail, setRetail] = useState("24");
  const [shippingSubsidy, setShippingSubsidy] = useState("0");

  const calc = useMemo(() => {
    const unitCount = Math.max(1, nonNegative(units));
    const retailValue = nonNegative(retail);
    const inbound = nonNegative(freight) / unitCount;
    const base =
      nonNegative(supplier) +
      inbound +
      nonNegative(packaging) +
      nonNegative(fulfilment);
    const payment = retailValue * (percentage(processing) / 100);
    const total = base + payment + nonNegative(shippingSubsidy);
    const contribution = retailValue - total;
    const margin = retailValue > 0 ? (contribution / retailValue) * 100 : 0;
    return { inbound, total, contribution, margin };
  }, [supplier, freight, units, packaging, fulfilment, processing, retail, shippingSubsidy]);

  const fields = [
    { label: "Supplier unit cost", value: supplier, setter: setSupplier, step: "0.01" },
    { label: "Inbound freight per shipment", value: freight, setter: setFreight, step: "0.01" },
    { label: "Units in shipment", value: units, setter: setUnits, step: "1" },
    { label: "Packaging per unit", value: packaging, setter: setPackaging, step: "0.01" },
    { label: "Fulfilment per unit", value: fulfilment, setter: setFulfilment, step: "0.01" },
    { label: "Payment processing %", value: processing, setter: setProcessing, step: "0.1", max: "100" },
    { label: "Retail price", value: retail, setter: setRetail, step: "0.01" },
    { label: "Shipping subsidy per order/unit", value: shippingSubsidy, setter: setShippingSubsidy, step: "0.01" },
  ];

  return (
    <div className="calculator">
      <div className="calculator-fields">
        {fields.map(({ label, value, setter, step, max }) => (
          <label key={label}>
            <span>{label}</span>
            <input
              type="number"
              min="0"
              max={max}
              step={step}
              inputMode="decimal"
              value={value}
              onChange={(event) => setter(event.target.value)}
            />
          </label>
        ))}
      </div>
      <div className="calculator-result" role="status" aria-live="polite">
        <div><span>Inbound freight / unit</span><b>{money(calc.inbound)}</b></div>
        <div><span>Estimated variable cost / unit</span><b>{money(calc.total)}</b></div>
        <div><span>Contribution before CAC</span><b>{money(calc.contribution)}</b></div>
        <div><span>Contribution margin</span><b>{calc.margin.toFixed(1)}%</b></div>
        <small>Planning model only. Taxes, duties, returns, damage, storage and other costs may still apply.</small>
      </div>
    </div>
  );
}
