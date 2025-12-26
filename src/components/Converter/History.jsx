export default function History({ items, onRemove }) {
  if (!items.length) return null;

  return (
    <>
      <h3>Historia</h3>
      <ul>
        {items.map(({ id, fromValue, fromUnit, toValue, toUnit }) => (
          <li key={id}>
            {fromValue} {fromUnit} → {toValue} {toUnit}
            <button onClick={() => onRemove(id)}>×</button>
          </li>
        ))}
      </ul>
    </>
  );
}
