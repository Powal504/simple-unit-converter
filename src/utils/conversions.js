// Długość
export const metersToCentimeters = (m) => m * 100;
export const centimetersToMeters = (cm) => cm / 100;
export const metersToKilometers = (m) => m / 1000;
export const kilometersToMeters = (km) => km * 1000;

// Waga
export const kilogramsToGrams = (kg) => kg * 1000;
export const gramsToKilograms = (g) => g / 1000;
export const kilogramsToPounds = (kg) => kg * 2.20462;
export const poundsToKilograms = (lb) => lb / 2.20462;

// Temperatura
export const celsiusToFahrenheit = (c) => (c * 9) / 5 + 32;
export const fahrenheitToCelsius = (f) => ((f - 32) * 5) / 9;

// Główna funkcja konwersji
export const convert = (value, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return value;

  if (fromUnit === "m" && toUnit === "cm") return metersToCentimeters(value);
  if (fromUnit === "cm" && toUnit === "m") return centimetersToMeters(value);
  if (fromUnit === "m" && toUnit === "km") return metersToKilometers(value);
  if (fromUnit === "km" && toUnit === "m") return kilometersToMeters(value);

  if (fromUnit === "kg" && toUnit === "g") return kilogramsToGrams(value);
  if (fromUnit === "g" && toUnit === "kg") return gramsToKilograms(value);
  if (fromUnit === "kg" && toUnit === "lb") return kilogramsToPounds(value);
  if (fromUnit === "lb" && toUnit === "kg") return poundsToKilograms(value);

  if (fromUnit === "C" && toUnit === "F") return celsiusToFahrenheit(value);
  if (fromUnit === "F" && toUnit === "C") return fahrenheitToCelsius(value);

  throw new Error(`Konwersja z ${fromUnit} na ${toUnit} nie jest obsługiwana.`);
};
