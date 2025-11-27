// import { } from "framer-;

export default function Card({ children, darkMode, hoverRotate = 5, style, onClick }) {
  return (
    <div
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, rotate: hoverRotate }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
      style={{
        background: darkMode ? "#222" : "#fafafa",
        borderRadius: 20,
        boxShadow: darkMode
          ? "0 8px 30px rgba(255,255,255,0.05)"
          : "0 8px 30px rgba(0,0,0,0.1)",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        ...style
      }}
    >
      {children}
    </div>
  );
}
