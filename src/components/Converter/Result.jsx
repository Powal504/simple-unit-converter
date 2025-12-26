export default function Result({ result, unit }) {
  if (!result) return null;

  return (
    <div className="result">
      <strong>Wynik:</strong> {result} {unit}
    </div>
  );
}
