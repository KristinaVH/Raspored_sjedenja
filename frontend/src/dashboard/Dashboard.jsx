import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
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
      <h1>Raspored sjedenja</h1>

      {/* PDF download bez previewa */}
      <button
        onClick={() =>
          (window.location.href = "/.netlify/functions/exportPdf")
        }
        style={{
          background: wedding.theme_color || "#b8860b",
          marginBottom: "20px",
          padding: "10px 14px",
          borderRadius: "6px",
          color: "white",
          border: "none",
          fontWeight: "bold"
        }}
      >
        Preuzmi PDF
      </button>

      <UndoButton onUndo={undo} />

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

        {/* LISTA GOSTIJU */}
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
    </div>
  );
}
