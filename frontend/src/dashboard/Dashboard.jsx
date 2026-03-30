import TableList from "../components/TableList";
import GuestList from "../components/GuestList";

export default function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Raspored stolova — Upravljačka ploča</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {/* Tablice */}
        <div>
          <h2>Stolovi</h2>
          <TableList />
        </div>

        {/* Gosti */}
        <div>
          <h2>Gosti</h2>
          <GuestList />
        </div>
      </div>
    </div>
  );
}
``
