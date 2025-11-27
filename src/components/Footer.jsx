import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import LoginModal from "./LoginModal";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const { user, setUser } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => setUser(null);

  return (
    <footer
      style={{
        textAlign: "center",
        padding: "30px 20px",
        borderTop: "1px solid rgba(0,122,255,0.5)",
        marginTop: 50,
        background: "#0a0a0a",
        color: "#007aff",
        position: "relative",
        zIndex: 1
      }}
    >
      {/* Neon glowing admin/user info */}
      {user?.role === "admin" ? (
        <>
          <p style={{ color: "#007aff", fontWeight: 600, marginBottom: 10 }}>
            Admin sifatida kirilgan: <strong>{user.name}</strong>
          </p>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "none",
              background: "#007aff",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(0,122,255,0.6)"
            }}
          >
            Chiqish
          </button>
        </>
      ) : (
        <>
          <p style={{ color: "#007aff", fontWeight: 500, marginBottom: 10 }}>
            Admin kirish uchun
          </p>
          <button
            onClick={() => setShowLogin(true)}
            style={{
              padding: "10px 20px",
              borderRadius: 8,
              border: "none",
              background: "#007aff",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 0 15px rgba(0,122,255,0.6)"
            }}
          >
            Admin Kirish
          </button>
          {showLogin && <LoginModal close={() => setShowLogin(false)} />}
        </>
      )}

      {/* Kontaktlar va ijtimoiy tarmoqlar */}
      <div
        style={{
          marginTop: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap"
        }}
      >
        <div style={{ color: "#007aff" }}>📧 info@odti.uz</div>
        <div style={{ color: "#007aff" }}>📞 +998 71 123 45 67</div>
        <div style={{ display: "flex", gap: 15 }}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: "#007aff", fontSize: 18 }}>
            <FaFacebookF />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "#007aff", fontSize: 18 }}>
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: "#007aff", fontSize: 18 }}>
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "#007aff", fontSize: 18 }}>
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <p style={{ marginTop: 20, fontSize: 12, color: "#aaa" }}>
        &copy; {new Date().getFullYear()} ODTI Fakultetlar Faoliyatini Baholash Platformasi. Barcha huquqlar himoyalangan.
      </p>

      {/* Subtle neon glow effect */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle at center, rgba(0,122,255,0.2), transparent 70%)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />
    </footer>
  );
}
