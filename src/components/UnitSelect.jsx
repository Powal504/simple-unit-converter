export default function UnitSelect({ value, onChange, units }) {
  return (
    <select value={value} onChange={onChange}>
      {Object.values(units).flat().map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
