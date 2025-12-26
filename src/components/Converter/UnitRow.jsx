import UnitSelect from "../UnitSelect";
import { units } from "../../utils/units";

export default function UnitRow({
  fromUnit,
  toUnit,
  setFromUnit,
  setToUnit,
  fromCategory,
}) {
  return (
    <div className="units-row">
      <label>
        Z:
        <UnitSelect
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          units={units}
        />
      </label>

      <label>
        Na:
        <UnitSelect
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          units={{ [fromCategory]: units[fromCategory] }}
        />
      </label>
    </div>
  );
}
