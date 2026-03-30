import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleUpdate(e) {
    e.preventDefault();
    setMsg("");

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setMsg(error.message);
    } else {
      setMsg("Lozinka je uspješno promijenjena! Preusmjeravam…");
      setTimeout(() => navigate("/"), 1500);
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h1>Postavljanje nove lozinke</h1>

      <form onSubmit={handleUpdate}>
        <input
          type="password"
          placeholder="Nova lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Spremi novu lozinku</button>
      </form>

      {msg && <p style={{ marginTop: "15px" }}>{msg}</p>}
    </div>
  );
}
