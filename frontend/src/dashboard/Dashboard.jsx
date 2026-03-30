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

  // PRINT PREVIEW
  const [previewOpen, setPreviewOpen] = useState(false);

  // WEDDING INFO
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
    if (data) setWedding(data);
  }

  useEffect(() => {
    loadWedding();
  }, []);

  // DRAG&DROP – spremanje id-a gosta
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

      {/* GUMB ZA PRINT PREVIEW */}
      <button
        onClick={() => setPreviewOpen(true)}
        style={{
          background: wedding.theme_color || "#b8860b",
          marginBottom: "20px",
        }}
      >
        Pregled prije ispisa
      </button>

      {/* UNDO GUMB */}
      <UndoButton onUndo={undo} />

      {/* GLAVNI GRID – stolovi lijevo, gosti desno */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "40px",
          marginTop: "40px",
        }}
      >
        {/* STOL + GOSTI */}
        <div>
          <h2>Stolovi i gosti</h2>

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

        {/* LISTA SVIH GOSTIJU */}
        <div>
          <h2>Lista svih gostiju</h2>

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
            (window.location.href = "/.netlify/functions/exportPdf")
          }
        />
      )}
    </div>
  );
}
