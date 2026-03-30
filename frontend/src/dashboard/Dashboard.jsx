import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import useSeating from "../hooks/useSeating";
import SeatingTable from "../components/SeatingTable";
import DraggableGuest from "../components/DraggableGuest";
import UndoButton from "../components/UndoButton";
import PrintPreview from "../pdf/PrintPreview";

export default function Dashboard() {
  // Seating data & actions
  const {
    tables,
    guests,
    seating,
    loading,
    moveGuest,
    undo,
  } = useSeating();

  // UI state
  const [previewOpen, setPreviewOpen] = useState(false);

  // Wedding info
  const [wedding, setWedding] = useState({
    couple_names: "",
    wedding_date: "",
    theme_color: "#b8860b",
    logo_url: "",
  });

  // Load wedding info from backend
  async function loadWedding() {
    const token = supabase.auth.getSession().data?.session?.access_token;

    const res = await fetch("/.netlify/functions/weddingInfo", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (data) setWedding(data);
  }

  useEffect(() => {
    loadWedding();
  }, []);

  // Drag handling
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

      {/* PRINT PREVIEW BUTTON */}
      <button
        onClick={() => setPreviewOpen(true)}
        style={{
          background: wedding.theme_color || "#b8860b",
          marginBottom: "20px",
        }}
      >
        Print Preview
      </button>

      {/* UNDO BUTTON */}
      <UndoButton onUndo={undo} />

      {/* MAIN LAYOUT */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
          marginTop: "30px",
        }}
      >
        {/* TABLES SECTION */}
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

        {/* GUEST LIST */}
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

      {/* PRINT PREVIEW MODAL */}
      {previewOpen && (
        <PrintPreview
          wedding={wedding}
          tables={tables}
          guests={guests}
          seating={seating}
          onClose={() => setPreviewOpen(false)}
          onDownload={() =>
            window.location.href = "/.netlify/functions/exportPdf"
          }
        />
      )}
    </div>
  );
}
