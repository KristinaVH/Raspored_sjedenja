import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import LogoUpload from "./LogoUpload";

export default function WeddingInfo() {
  const [info, setInfo] = useState({
    couple_names: "",
    wedding_date: "",
    theme_color: "",
    logo_url: "",
  });
  const [msg, setMsg] = useState("");

  async function loadInfo() {
    const res = await fetch("/.netlify/functions/weddingInfo", {
      headers: {
        Authorization: `Bearer ${
          supabase.auth.getSession().data?.session?.access_token
        }`,
      },
    });

    const data = await res.json();
    if (data) setInfo(data);
  }

  async function saveInfo(e) {
    e.preventDefault();
    setMsg("");

    const res = await fetch("/.netlify/functions/weddingInfo", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${
          supabase.auth.getSession().data?.session?.access_token
        }`,
      },
      body: JSON.stringify(info),
    });

    const data = await res.json();
    setMsg("Podaci spremljeni!");
  }

  useEffect(() => {
    loadInfo();
  }, []);

  return (
    <div style={{ maxWidth: "500px", marginTop: "20px" }}>
      <h2>Informacije o vjenčanju</h2>

      <form onSubmit={saveInfo}>

        <label>Imena para:</label>
        <input
          type="text"
          value={info.couple_names}
          onChange={(e) =>
            setInfo({ ...info, couple_names: e.target.value })
          }
        />

        <label>Datum vjenčanja:</label>
        <input
          type="text"
          placeholder="12. lipnja 2026."
          value={info.wedding_date}
          onChange={(e) =>
            setInfo({ ...info, wedding_date: e.target.value })
          }
        />

        <label>Boja PDF teme (HEX):</label>
        <input
          type="text"
          placeholder="#b8860b"
          value={info.theme_color}
          onChange={(e) =>
            setInfo({ ...info, theme_color: e.target.value })
          }
        />

        <label>Logo:</label>
        <LogoUpload
          logoUrl={info.logo_url}
          onUpload={(url) => setInfo({ ...info, logo_url: url })}
        />

        <button type="submit">Spremi</button>
      </form>

      {msg && <p style={{ marginTop: "10px" }}>{msg}</p>}
    </div>
  );
}
