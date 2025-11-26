import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUniversity, FaChalkboardTeacher } from "react-icons/fa";
import { motion } from "framer-motion";
import Card from "../components/Card"
import { UserContextProvider } from "../context/UserContext";

export default function FacultyList({ darkMode }) {
  const auth = useContext(UserContextProvider);
  const user = auth?.user; // Admin foydalanuvchini tekshirish uchun
  const navigate = useNavigate();

  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/faculties")
      .then(res => res.json())
      .then(data => setFaculties(data))
      .catch(() => setFaculties([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
        style={{
          width: 50,
          height: 50,
          border: `5px solid ${darkMode ? "#ffd700" : "#0077b6"}`,
          borderTop: "5px solid transparent",
          borderRadius: "50%",
          margin: "0 auto"
        }}
      />
      <p style={{ marginTop: 15 }}>Yuklanmoqda...</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <h2 style={{ textAlign: "center", marginBottom: 30 }}>Fakultetlar</h2>

      {user?.role === "admin" ? (
        // ADMIN uchun jadval ko'rinishi
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", padding: 10 }}>ID</th>
              <th style={{ border: "1px solid #ccc", padding: 10 }}>Fakultet</th>
              <th style={{ border: "1px solid #ccc", padding: 10 }}>Kafedralar</th>
              <th style={{ border: "1px solid #ccc", padding: 10 }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {faculties.map(f => (
              <tr key={f.id}>
                <td style={{ border: "1px solid #ccc", padding: 10 }}>{f.id}</td>
                <td style={{ border: "1px solid #ccc", padding: 10 }}>{f.title}</td>
                <td style={{ border: "1px solid #ccc", padding: 10 }}>
                  {f.cafedras.map(c => c.title).join(", ")}
                </td>
                <td style={{ border: "1px solid #ccc", padding: 10 }}>
                  <button onClick={() => navigate(`/departments/${f.id}`)}>Ko‘rish</button>
                  <button style={{ marginLeft: 5 }}>Tahrirlash</button>
                  <button style={{ marginLeft: 5, color: "red" }}>O‘chirish</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        // Oddiy foydalanuvchi uchun Card ko'rinishi
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 25
          }}
        >
          {faculties.map((f, i) => (
            <Card
              key={f.id}
              darkMode={darkMode}
              hoverRotate={i % 2 === 0 ? 5 : -5}
              onClick={() => navigate(`/departments/${f.id}`)}
            >
              <motion.div whileHover={{ rotate: 15 }} style={{ marginBottom: 15 }}>
                <FaUniversity size={50} style={{ color: darkMode ? "#ffd700" : "#0077b6" }} />
              </motion.div>
              <h3 style={{ textAlign: "center", marginBottom: 15 }}>{f.title}</h3>

              {f.cafedras?.length > 0 && (
                <div style={{ width: "100%" }}>
                  {f.cafedras.map(dep => (
                    <motion.div
                      key={dep.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/feedback/${f.id}/${dep.id}`);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "12px 15px",
                        marginBottom: 10,
                        borderRadius: 12,
                        background: darkMode ? "#333" : "#e0e0e0",
                        color: darkMode ? "#fff" : "#000",
                        cursor: "pointer"
                      }}
                    >
                      <FaChalkboardTeacher />
                      <span>{dep.title}</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
