"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Feel = "soft" | "firm" | "aroma" | "unsure";

export function WhiskFinder() {
  const [experience, setExperience] = useState("new");
  const [feel, setFeel] = useState<Feel>("unsure");
  const [compare, setCompare] = useState("yes");

  const result = useMemo(() => {
    if (compare === "yes" || feel === "unsure") {
      return {
        name: "Discovery Trio",
        copy: "Compare birch, oak and eucalyptus side by side instead of guessing your preference.",
        href: "/shop/discovery-trio",
      };
    }
    if (feel === "firm") {
      return {
        name: "Baltic Oak",
        copy: "Oak is the clearest choice when you want a broader, denser and firmer whisk.",
        href: "/shop/baltic-oak",
      };
    }
    if (feel === "aroma") {
      return {
        name: "Eucalyptus",
        copy: "Eucalyptus is the aroma-led choice in the planned core assortment.",
        href: "/shop/eucalyptus",
      };
    }
    return {
      name: "Baltic Birch",
      copy: experience === "new"
        ? "Birch is the classic first reference point: softer, leafy and easy to understand."
        : "Birch remains the traditional benchmark when you prefer a softer whisk.",
      href: "/shop/baltic-birch",
    };
  }, [experience, feel, compare]);

  return (
    <div className="finder">
      <div className="finder-question">
        <span>01</span>
        <h2>How experienced are you?</h2>
        <div>
          <button type="button" className={experience === "new" ? "selected" : ""} onClick={() => setExperience("new")}>New to whisks</button>
          <button type="button" className={experience === "experienced" ? "selected" : ""} onClick={() => setExperience("experienced")}>Used them before</button>
        </div>
      </div>

      <div className="finder-question">
        <span>02</span>
        <h2>What matters most?</h2>
        <div>
          {[
            ["soft", "Soft / traditional"],
            ["firm", "Firm / substantial"],
            ["aroma", "Strong aroma"],
            ["unsure", "Not sure yet"],
          ].map(([value, label]) => (
            <button
              type="button"
              key={value}
              className={feel === value ? "selected" : ""}
              onClick={() => setFeel(value as Feel)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="finder-question">
        <span>03</span>
        <h2>Do you want to compare materials?</h2>
        <div>
          <button type="button" className={compare === "yes" ? "selected" : ""} onClick={() => setCompare("yes")}>Yes</button>
          <button type="button" className={compare === "no" ? "selected" : ""} onClick={() => setCompare("no")}>No</button>
        </div>
      </div>

      <div className="finder-result" aria-live="polite">
        <p>WORKING RECOMMENDATION</p>
        <h2>{result.name}</h2>
        <span>{result.copy}</span>
        <Link className="button button-light" href={result.href}>View recommendation</Link>
      </div>
    </div>
  );
}
