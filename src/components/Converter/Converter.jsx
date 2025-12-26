import { useState } from "react";
import { useValidatedInput } from "../../hooks/useValidatedInput";
import { useConversion } from "../../hooks/useConversion";
import { useHistory } from "../../hooks/useHistory";
import { getUnitCategory } from "../../utils/units";

import ValueInput from "./ValueInput";
import Result from "./Result";
import History from "./History";
import UnitRow from "./UnitRow";

export default function Converter() {
  const { value, onChange, error } = useValidatedInput();
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");

  const { result } = useConversion(value, fromUnit, toUnit);
  const { history, add, remove } = useHistory();

  const fromCategory = getUnitCategory(fromUnit);

  return (
    <div className="converter-container">
      <h2>Prosty konwerter jednostek</h2>

      <ValueInput value={value} onChange={onChange} error={error} />

      <UnitRow
        fromUnit={fromUnit}
        toUnit={toUnit}
        setFromUnit={setFromUnit}
        setToUnit={setToUnit}
        fromCategory={fromCategory}
      />

      <Result result={result} unit={toUnit} />

      <button
        disabled={!result}
        onClick={() =>
          add({
            fromValue: value,
            fromUnit,
            toValue: result,
            toUnit,
          })
        }
      >
        Dodaj do historii
      </button>

      <History items={history} onRemove={remove} />
    </div>
  );
}
