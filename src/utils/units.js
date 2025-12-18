export const units = {
  długość: [
    { label: "metr (m)", value: "m" },
    { label: "centymetr (cm)", value: "cm" },
    { label: "kilometr (km)", value: "km" },
    { label: "milimetr (mm)", value: "mm" },
  ],
  waga: [
    { label: "kilogram (kg)", value: "kg" },
    { label: "gram (g)", value: "g" },
    { label: "funt (lb)", value: "lb" },
    { label: "uncja (oz)", value: "oz" },
  ],
  temperatura: [
    { label: "Celsjusz (°C)", value: "c" },
    { label: "Fahrenheit (°F)", value: "f" },
    { label: "Kelwin (K)", value: "k" },
  ],
};


export const getUnitCategory = (unit) => {
  for (const category in units) {
    if (units[category].some((u) => u.value === unit)) return category;
  }
  return null;
};
