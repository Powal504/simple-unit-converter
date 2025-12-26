export const convert = (v, f, t) => {
  if (f === t) return v;

  const map = {
    m: { cm: v * 100, km: v / 1000 },
    cm: { m: v / 100 },
    km: { m: v * 1000 },
    kg: { g: v * 1000, lb: v * 2.20462 },
    g: { kg: v / 1000 },
    lb: { kg: v / 2.20462 },
    c: { f: (v * 9) / 5 + 32 },
    f: { c: ((v - 32) * 5) / 9 },
  };

  if (!map[f] || map[f][t] === undefined)
    throw new Error("Brak konwersji");

  return map[f][t];
};
