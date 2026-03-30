import useSeating from "../hooks/useSeating";
import SeatingTable from "../components/SeatingTable";
import DraggableGuest from "../components/DraggableGuest";
import UndoButton from "../components/UndoButton";

export default function Dashboard() {
  const {
    tables,
    guests,
    seating,
    loading,
    moveGuest,
    undo,
  } = useSeating();

  const handleDragStart = (guestId) => {
    localStorage.setItem("drag-guest", guestId);
  };

  const handleDrop = (tableId) => {
    const guestId = localStorage.getItem("drag-guest");
    if (guestId) {
      moveGuest(Number(guestId), tableId);
      localStorage.removeItem("drag-guest");
    }
  };

  if (loading) return <h2>Učitavanje...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Raspored stolova</h1>

      <UndoButton onUndo={undo} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
          marginTop: "30px",
        }}
      >
        {/* TABLICA STOLOVA */}
        <div>
          <h2>Stolovi</h2>
          {tables.map((t) => (
            <SeatingTable
              key={t.id}
              table={t}
              guests={guests}
              seating={seating}
              onDropGuest={handleDrop}
            />
          ))}
        </div>

        {/* POPIS GOSTIJU */}
        <div>
          <h2>Gosti</h2>
          {guests.map((g) => (
            <DraggableGuest
              key={g.id}
              guest={g}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
