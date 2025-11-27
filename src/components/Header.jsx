import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaStar, FaBars } from "react-icons/fa";
import { motion } from "framer-motion";
import Logo from "../assets/images/logo1.svg"; // Institut logosi

function Header({ darkMode, setDarkMode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const bgColor = darkMode ? "#1c1c1e" : "#ffffff"; // Hi-tech oq asos
  const textColor = darkMode ? "#ffffff" : "#0a0a0a"; // qora matn yoki oqga mos

  const buttonBg = darkMode ? "#2c2c2e" : "#f5f5f7"; // tugma fonlari
  const buttonColor = darkMode ? "#0ff" : "#007aff"; // neon/iPhone 17 blue

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
        flexWrap: "wrap",
        boxShadow: darkMode
          ? "0 2px 10px rgba(0,255,255,0.2)"
          : "0 2px 15px rgba(0,122,255,0.15)",
      }}
    >
      {/* Chap tomon: Logo + Hamburger */}
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        <motion.img
          src={Logo}
          alt="ODTI Logo"
          style={{ width: 50, cursor: "pointer" }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          onClick={() => navigate("/")}
        />
        <div style={{ cursor: "pointer" }} onClick={() => setOpen(!open)}>
          <FaBars size={22} color={buttonColor} />
        </div>
      </div>

      {/* Markazdagi matn */}
      <h1
        style={{
          margin: 0,
          textAlign: "center",
          fontSize: 22,
          fontWeight: 800,
          letterSpacing: 1.2,
          lineHeight: 1.3,
          cursor: "default",
          background: "linear-gradient(90deg, #007aff, #5ac8fa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          flex: 1,
        }}
      >
        ODTI Fakultetlar Faoliyatini Baholash Platformasi
      </h1>

      {/* O'ng tomon: tools */}
      <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
        {/* Reytinglar tugmasi */}
        <motion.div
          whileHover={{ scale: 1.05, boxShadow: "0 0 10px #007aff" }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 12px",
            borderRadius: 12,
            background: buttonBg,
            color: buttonColor,
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: darkMode
              ? "0 2px 10px rgba(0,255,255,0.2)"
              : "0 2px 10px rgba(0,122,255,0.2)",
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
          {darkMode ? (
            <FaSun size={20} color="#ffd60a" />
          ) : (
            <FaMoon size={20} color="#007aff" />
          )}
        </motion.div>
      </div>
    </header>
  );
}

export default Header;
