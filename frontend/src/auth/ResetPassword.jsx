import { useState } from "react";
import { supabase } from "../supabaseClient";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  async function handleReset(e) {
    e.preventDefault();
    setMsg("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/update-password",
    });

    if (error) setMsg(error.message);
    else setMsg("Provjerite svoj email za reset lozinke.");
  }

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h1>Reset lozinke</h1>

      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Vaš email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Pošalji link za reset</button>
      </form>

      {msg && <p style={{ marginTop: "15px" }}>{msg}</p>}
    </div>
  );
}
