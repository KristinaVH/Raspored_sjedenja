import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMsg(error.message);
    } else {
      navigate("/dashboard");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "80px auto" }}>
      <h1>Prijava</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email adresa"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Prijavi se</button>

        {msg && <p style={{ color: "red" }}>{msg}</p>}
      </form>

      <p style={{ marginTop: "15px" }}>
        <a href="/reset-password">Zaboravljena lozinka?</a>
      </p>
    </div>
  );
}
