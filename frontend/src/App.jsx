import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./auth/Login";
import ResetPassword from "./auth/ResetPassword";
import UpdatePassword from "./auth/UpdatePassword";
import Dashboard from "./dashboard/Dashboard";
import WeddingInfo from "./wedding/WeddingInfo";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Router>

      {/* NAVBAR – vidi se uvijek kada je korisnik prijavljen */}
      <Navbar />

      <Routes>
        {/* JAVNE STRANICE */}
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        {/* ZAŠTIĆENE STRANICE */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wedding-info"
          element={
            <ProtectedRoute>
              <WeddingInfo />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
