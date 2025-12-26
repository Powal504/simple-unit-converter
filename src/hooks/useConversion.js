import { useEffect, useState } from "react";
import { convert } from "../utils/conversions";

export function useConversion(value, from, to) {
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!value) {
      setResult("");
      return;
    }
    try {
      setResult(convert(Number(value), from, to).toFixed(3));
    } catch {
      setResult("");
    }
  }, [value, from, to]);

  return { result };
}
