export default function ValueInput({ value, onChange, error }) {
  return (
    <label>
      Wartość:
      <input value={value} onChange={onChange} placeholder="np. 12.5" />
      {error && <div style={{ color: "red" }}>{error}</div>}
    </label>
  );
}
