import { useEffect, useState } from "react";

export default function TableList() {
  const [tables, setTables] = useState([]);

  async function loadTables() {
    const res = await fetch("/.netlify/functions/tables", {
      headers: { Authorization: `Bearer ${localStorage.getItem("sb-token")}` },
    });

    const data = await res.json();
    setTables(data);
  }

  useEffect(() => {
    loadTables();
  }, []);

  return (
    <div>
      {tables.length === 0 && <p>Nema još stolova.</p>}

      {tables.map((t) => (
        <div
          key={t.id}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            marginBottom: "10px",
            borderRadius: "6px",
          }}
        >
          <strong>Stol {t.name}</strong>
        </div>
      ))}
    </div>
  );
}
