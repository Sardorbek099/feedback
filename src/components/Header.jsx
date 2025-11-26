import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaStar, FaUniversity, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "../assets/images/logo1.svg"; // Institut logosi

function Header({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const bgColor = darkMode ? "#1a1a1a" : "#0a66c2";
  const textColor = "#fff";

  return (
    <header
      style={{
        background: bgColor,
        color: textColor,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        flexWrap: "wrap"
      }}
    >
      {/* Chap tomon: Logo + Hamburger */}
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        {/* Logo */}
        <motion.img
          src={Logo}
          alt="ODTI Logo"
          style={{ width: 50, cursor: "pointer" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          onClick={() => navigate("/")}
        />
        {/* Hamburger */}
        <div style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
          <FaBars size={20} />
        </div>
      </div>

      {/* Matn markazda */}
      <h1
        style={{
          margin: 0,
          textAlign: "center",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 1.2,
          lineHeight: 1.3,
          color: "#fff",
          textShadow: "2px 2px 8px rgba(0,0,0,0.3)",
          flex: 1,
          cursor: "default",
          background: "linear-gradient(90deg, #ffdd00, #00c3ff)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        ODTI Fakultetlar Faoliyatini Baholash Platformasi
      </h1>

      {/* O'ng tomon: tools */}
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        {/* Reytinglar tugmasi */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 12,
            background: darkMode ? "#333" : "#fff",
            color: darkMode ? "#ffd700" : "#0077b6",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: darkMode
              ? "0 2px 10px rgba(255,215,0,0.3)"
              : "0 2px 10px rgba(0,119,182,0.3)"
          }}
          onClick={() => navigate("/ratings")}
        >
          <FaStar /> Reytinglar
        </motion.div>

        {/* Dark mode toggle */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          style={{ cursor: "pointer" }}
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </motion.div>

        {/* Institut icon */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 5,
            cursor: "default",
            fontWeight: 600
          }}
        >
        </motion.div>
      </div>
    </header>
  );
}

export default Header;
