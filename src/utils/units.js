export const units = {
  długość: [
    { label: "metr (m)", value: "m" },
    { label: "centymetr (cm)", value: "cm" },
    { label: "kilometr (km)", value: "km" },
  ],
  waga: [
    { label: "kilogram (kg)", value: "kg" },
    { label: "gram (g)", value: "g" },
    { label: "funt (lb)", value: "lb" },
  ],
  temperatura: [
    { label: "Celsjusz (°C)", value: "c" },
    { label: "Fahrenheit (°F)", value: "f" },
  ],
};

export const getUnitCategory = (unit) =>
  Object.keys(units).find((k) =>
    units[k].some((u) => u.value === unit)
  );
