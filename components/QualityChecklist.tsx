"use client";

import { useMemo, useState } from "react";

const items = [
  "Material / botanical group is identified",
  "Origin is documented or honestly marked unknown",
  "Condition is clear: dried, fresh, frozen or preserved",
  "Handle is comfortable and free of awkward protrusions",
  "Tie remains secure after preparation",
  "Leaves become flexible after correct preparation",
  "Leaf shedding is reasonable during normal use",
  "Preparation instructions produce a repeatable result",
];

export function QualityChecklist() {
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false));
  const count = useMemo(() => checked.filter(Boolean).length, [checked]);

  return (
    <div className="quality-tool">
      <div className="quality-score">
        <span>{count}/{items.length}</span>
        <p>checks complete</p>
        <button onClick={() => setChecked(items.map(() => false))}>Reset</button>
      </div>
      <div className="quality-items">
        {items.map((item, index) => (
          <label key={item}>
            <input
              type="checkbox"
              checked={checked[index]}
              onChange={(event) => {
                const next = [...checked];
                next[index] = event.target.checked;
                setChecked(next);
              }}
            />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <b>{item}</b>
          </label>
        ))}
      </div>
    </div>
  );
}
