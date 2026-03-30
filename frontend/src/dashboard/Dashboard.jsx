import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import useSeating from "../hooks/useSeating";
import SeatingTable from "../components/SeatingTable";
import DraggableGuest from "../components/DraggableGuest";
import UndoButton from "../components/UndoButton";
import PrintPreview from "../pdf/PrintPreview";

export default function Dashboard() {
  const {
    tables,
    guests,
    seating,
    loading,
    moveGuest,
    undo,
  } = useSeating();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [wedding, setWedding] = useState({
    couple_names: "",
    wedding_date: "",
    theme_color: "#b8860b",
    logo_url: "",
  });

  async function loadWedding() {
    const token = supabase.auth.getSession().data?.session?.access_token;

    const res = await fetch("/.netlify/functions/weddingInfo", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setWedding(data);
  }

  useEffect(() => {
    loadWedding();
  }, []);

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

  if (loading) return <h2>Učitavanje podataka...</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Raspored sjedenja</h1>

      <button
        onClick={() => setPreviewOpen(true)}
        style={{
          background: wedding.theme_color || "#b8860b",
          marginBottom: "20px",
        }}
      >
        Pregled prije ispisa
      </button>

      <UndoButton onUndo={undo} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "30px",
          marginTop: "30px",
        }}
      >
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
