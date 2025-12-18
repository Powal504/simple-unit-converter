import React from "react";
import { units } from "../utils/units";

export default function UnitSelect({ value, onChange, allowedCategory, units }) {
  const categoriesToShow = allowedCategory ? { [allowedCategory]: units[allowedCategory] } : units;

  return (
    <select value={value} onChange={onChange}>
      {Object.entries(categoriesToShow).map(([category, unitsArray]) =>
        unitsArray.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))
      )}
    </select>
  );
}
