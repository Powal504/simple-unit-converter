import React, { useState, useEffect } from "react";
import UnitSelect from "./UnitSelect";
import { convert } from "../utils/conversions";
import { getUnitCategory, units as defaultUnits } from "../utils/units";

export default function Converter() {
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("cm");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [sortNewestFirst, setSortNewestFirst] = useState(true);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("conversionHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const units = defaultUnits;

  const isValidInput = (val) => /^-?\d*\.?\d*$/.test(val);

  const handleValueChange = (e) => {
    const val = e.target.value;
    if (isValidInput(val)) {
      setValue(val);
      setError("");
    } else {
      setError("Nieprawidłowa wartość (tylko liczby, '-' i '.' są dozwolone)");
    }
  };

  const fromCategory = getUnitCategory(fromUnit) || Object.keys(units)[0];

  useEffect(() => {
    const toCategory = getUnitCategory(toUnit);
    if (fromCategory && toCategory !== fromCategory) {
      const fromUnits = units[fromCategory].map((u) => u.value);
      const firstOtherUnit = fromUnits.find((u) => u !== fromUnit);
      if (firstOtherUnit) setToUnit(firstOtherUnit);
    }
  }, [fromUnit, units]);

  useEffect(() => {
    if (value === "" || value === "-" || value === ".") {
      setResult("");
      return;
    }
    try {
      const res = convert(Number(value), fromUnit, toUnit);
      setResult(res.toFixed(3));
      setError("");
    } catch (e) {
      setResult("");
      setError("Błąd konwersji");
    }
  }, [value, fromUnit, toUnit]);

  useEffect(() => {
    localStorage.setItem("conversionHistory", JSON.stringify(history));
  }, [history]);

  const getUnitLabel = (unitValue) => {
    for (const category in units) {
      const found = units[category].find((u) => u.value === unitValue);
      if (found) return found.label;
    }
    return unitValue;
  };

  const addToHistory = () => {
    if (result === "" || isNaN(Number(result))) return;
    const newEntry = {
      id: Date.now(),
      fromValue: value,
      fromUnit,
      toValue: result,
      toUnit,
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [newEntry, ...prev]);
  };

  const removeFromHistory = (id) => {
    setHistory((prev) => prev.filter((entry) => entry.id !== id));
  };

  const resetForm = () => {
    setValue("");
    setResult("");
    setError("");
  };

  const sortedHistory = [...history].sort((a, b) => {
    if (sortNewestFirst) return new Date(b.timestamp) - new Date(a.timestamp);
    else return new Date(a.timestamp) - new Date(b.timestamp);
  });

  return (
    <div className="converter-container">
      <h2>Prosty konwerter jednostek</h2>

      <label>
        Wartość:
        <input
          type="text"
          value={value}
          onChange={handleValueChange}
          placeholder="np. 12.5"
        />
      </label>
      {error && <div style={{ color: "red", marginTop: "0.3rem" }}>{error}</div>}

      <div className="units-row">
        <label>
          Z:
          <UnitSelect
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            allowedCategory={null}
            units={units}
          />
        </label>
        <label>
          Na:
          <UnitSelect
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            allowedCategory={fromCategory}
            units={units}
          />
        </label>
      </div>

      <div className="result">
        <strong>Wynik:</strong>{" "}
        {result !== "" ? `${result} ${getUnitLabel(toUnit)}` : ""}
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <button
          onClick={addToHistory}
          disabled={result === "" || isNaN(Number(result))}
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Dodaj do historii
        </button>
        <button
          onClick={resetForm}
          style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Resetuj
        </button>
      </div>

      {history.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Historia konwersji</h3>
          <label style={{ fontWeight: "normal", fontSize: "0.9rem" }}>
            Sortuj od:
            <select
              value={sortNewestFirst ? "new" : "old"}
              onChange={(e) => setSortNewestFirst(e.target.value === "new")}
              style={{ marginLeft: "0.5rem" }}
            >
              <option value="new">najnowszych</option>
              <option value="old">najstarszych</option>
            </select>
          </label>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              maxHeight: "200px",
              overflowY: "auto",
              marginTop: "0.5rem",
            }}
          >
            {sortedHistory.map(
              ({ id, fromValue, fromUnit, toValue, toUnit }) => (
                <li
                  key={id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    padding: "0.5rem 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontSize: "0.9rem",
                  }}
                >
                  <span>
                    {fromValue} {getUnitLabel(fromUnit)} → {toValue}{" "}
                    {getUnitLabel(toUnit)}
                  </span>
                  <button
                    onClick={() => removeFromHistory(id)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#d33",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                    }}
                    aria-label="Usuń z historii"
                  >
                    &times;
                  </button>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
