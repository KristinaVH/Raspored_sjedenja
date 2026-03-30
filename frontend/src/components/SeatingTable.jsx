export default function SeatingTable({ table, guests, seating, onDropGuest }) {
  const assigned = seating
    .filter((s) => s.table_id === table.id)
    .map((s) => guests.find((g) => g.id === s.guest_id));

  function allowDrop(e) {
    e.preventDefault();
  }

  return (
    <div
      onDragOver={allowDrop}
      onDrop={() => onDropGuest(table.id)}
      style={{
        padding: "15px",
        border: "3px dashed #b8860b",
        borderRadius: "10px",
        marginBottom: "20px",
        background: "#fff9e6",
      }}
    >
      <h3 style={{ marginTop: 0 }}>Stol {table.name}</h3>

      {assigned.length === 0 && (
        <p style={{ color: "#999", fontStyle: "italic" }}>
          (povucite gosta ovdje)
        </p>
      )}

      {assigned.map((g) => (
        <div
          key={g.id}
          style={{
            padding: "6px 10px",
            border: "1px solid #ddd",
            marginBottom: "6px",
            borderRadius: "6px",
            background: "white",
            fontWeight: "500",
          }}
        >
          {g.first_name} {g.last_name}
        </div>
      ))}
    </div>
  );
}
