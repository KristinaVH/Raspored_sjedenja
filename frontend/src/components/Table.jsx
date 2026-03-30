export default function Table({ table, children }) {
  return (
    <div
      style={{
        padding: "12px",
        border: "1px solid #aaa",
        borderRadius: "8px",
        marginBottom: "10px",
        background: "white",
      }}
    >
      <h3>Stol {table.name}</h3>

      <div style={{ marginTop: "10px" }}>{children}</div>
    </div>
  );
}
