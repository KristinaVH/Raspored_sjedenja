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
        border: "2px solid #b8860b",
        borderRadius: "10px",
        marginBottom: "20px",
        background: "white",
      }}
    >
      <h3>Stol {table.name}</h3>

      {assigned.length === 0 && <p style={{ color: "#888" }}>(prazno)</p>}

      {assigned.map((g) => (
        <div
          key={g.id}
          style={{
            padding: "5px 10px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            marginBottom: "4px",
          }}
        >
          {g.first_name} {g.last_name}
        </div>
      ))}
    </div>
  );
}
