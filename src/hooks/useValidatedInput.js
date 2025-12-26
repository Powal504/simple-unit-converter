import { useState } from "react";

const isValid = (v) => /^-?\d*\.?\d*$/.test(v);

export function useValidatedInput(initial = "") {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const v = e.target.value;
    if (isValid(v)) {
      setValue(v);
      setError("");
    } else {
      setError("Nieprawidłowa wartość");
    }
  };

  return { value, onChange, error };
}
