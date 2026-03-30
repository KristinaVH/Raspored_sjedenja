import { useEffect, useState } from "react";

export default function GuestList() {
  const [guests, setGuests] = useState([]);

  async function loadGuests() {
    const res = await fetch("/.netlify/functions/guests", {
      headers: { Authorization: `Bearer ${localStorage.getItem("sb-token")}` },
    });

    const data = await res.json();
    setGuests(data);
  }

  useEffect(() => {
    loadGuests();
  }, []);

  return (
    <div>
      {guests.length === 0 && <p>Nema gostiju.</p>}

      {guests.map((g) => (
        <div
          key={g.id}
          style={{
            padding: "8px",
            border: "1px solid #ddd",
            marginBottom: "8px",
            background: "white",
            borderRadius: "6px",
          }}
        >
          {g.first_name} {g.last_name}
        </div>
      ))}
    </div>
  );
}
