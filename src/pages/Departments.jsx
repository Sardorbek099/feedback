import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import Card from "../components/Card";


export default function DepartmentsPage({ darkMode }) {
  const { fid } = useParams(); // Tanlangan fakultet ID sini olamiz
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // const API = import.meta.env.VITE_API_URL;


useEffect(() => {
  fetch(`https://feedback-2-oayz.onrender.com/faculties`)
    .then(res => res.json())
    .then(data => {
      const selected = data.find(f => f.id.toString() === fid);
      setFaculty(selected || null);
    })
    .catch(() => setFaculty(null))
    .finally(() => setLoading(false));
}, [fid, API]);

  if (loading)
    return (
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

  if (!faculty) return <p style={{ textAlign: "center" }}>Fakultet topilmadi</p>;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 20 }}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        onClick={() => navigate(-1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          cursor: "pointer",
          marginBottom: 20,
          color: darkMode ? "#ffd700" : "#0077b6",
          fontWeight: "bold"
        }}
      >
        <FaArrowLeft /> Ortga
      </motion.div>

      <h2 style={{ textAlign: "center", marginBottom: 30 }}>{faculty.title} kafedralari</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 25
        }}
      >
        {faculty.cafedras?.length > 0 ? (
          faculty.cafedras.map((dep, j) => (
            <Card
              key={dep.id}
              darkMode={darkMode}
              hoverRotate={j % 2 === 0 ? 5 : -5}
              onClick={() => navigate(`/feedback/${faculty.id}/${dep.id}`)}
              style={{ cursor: "pointer" }}
            >
              <motion.div whileHover={{ rotate: 15 }} style={{ marginBottom: 15 }}>
                <FaChalkboardTeacher size={40} style={{ color: darkMode ? "#ffd700" : "#0077b6" }} />
              </motion.div>
              <h3 style={{ textAlign: "center" }}>{dep.title}</h3>
            </Card>
          ))
        ) : (
          <p style={{ textAlign: "center" }}>Bu fakultetda kafedra mavjud emas</p>
        )}
      </div>
    </div>
  );
}
