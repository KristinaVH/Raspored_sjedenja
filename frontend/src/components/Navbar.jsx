import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div
      style={{
        width: "100%",
        background: "#b8860b",
        padding: "10px 20px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div
        style={{ fontSize: "20px", fontWeight: "bold", cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        Raspored sjedenja
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <span style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          Početna
        </span>

        <span style={{ cursor: "pointer" }} onClick={() => navigate("/wedding-info")}>
          Podaci o vjenčanju
        </span>

        <span style={{ cursor: "pointer" }} onClick={handleLogout}>
          Odjava
        </span>
      </div>
    </div>
  );
}
