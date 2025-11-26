import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import LoginModal from "./LoginModal";

export default function Footer() {
  const { user, setUser } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => setUser(null);

  return (
    <footer style={{ textAlign: "center", padding: 20, borderTop: "1px solid #ccc", marginTop: 50 }}>
      {user?.role === "admin" ? (
        <>
          <p>Admin sifatida kirilgan: <strong>{user.name}</strong></p>
          <button onClick={handleLogout} style={{ padding: "8px 15px", borderRadius: 5, border: "none", background: "#dc3545", color: "#fff", cursor: "pointer" }}>
            Chiqish
          </button>
        </>
      ) : (
        <>
          <p>Admin kirish uchun</p>
          <button onClick={() => setShowLogin(true)} style={{ padding: "8px 15px", borderRadius: 5, border: "none", background: "#0077b6", color: "#fff", cursor: "pointer" }}>
            Admin Kirish
          </button>
          {showLogin && <LoginModal close={() => setShowLogin(false)} />}
        </>
      )}
    </footer>
  );
}
