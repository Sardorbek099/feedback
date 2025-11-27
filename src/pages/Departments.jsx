import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../config";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ScienceIcon from '@mui/icons-material/Science';
import { Card, CardContent, Typography } from '@mui/material';

export default function DepartmentsPage({ darkMode }) {
  const { fid } = useParams();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(null);

  useEffect(() => {
    fetch(`${API}/faculties?_embed=cafedras`)
      .then(res => res.json())
      .then(data => {
        const f = data.find(f => f.id.toString() === fid);
        setFaculty(f || null);
      });
  }, [fid]);

  if (!faculty) return <p style={{ textAlign: "center", marginTop: 50 }}>Fakultet topilmadi</p>;

  const icons = [<MenuBookIcon />, <ScienceIcon />]; 

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: darkMode ? "#1a1a1a" : "#ffffff" // Hi-Tech oq asos
      }}
    >
      {/* Background video */}
      <iframe
        src="https://www.youtube.com/embed/mGnHR-bgEfkQ?autoplay=1&mute=1&loop=1&playlist=mGnHR-bgEfkQ"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: -1,
          opacity: 0.3
        }}
        frameBorder="0"
        allow="autoplay; fullscreen"
        allowFullScreen
      />

      {/* Title */}
      <Typography
        variant="h3"
        sx={{
          color: "#ff6600ff", // iPhone 17 neon orange
          fontWeight: 800,
          marginBottom: 30,
          textShadow: "0 0 15px rgba(255,102,0,0.7)",
          textAlign: "center"
        }}
      >
        {faculty.title} kafedralari
      </Typography>

      {/* Departments cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20,
          width: "100%",
          maxWidth: 1200
        }}
      >
        {faculty.cafedras.map((dep, i) => (
          <Card
            key={dep.id}
            onClick={() => navigate(`/feedback/${fid}/${dep.id}`)}
            sx={{
              cursor: "pointer",
              transition: "transform 0.3s, box-shadow 0.3s",
              bgcolor: darkMode ? "#222" : "rgba(255,255,255,0.1)",
              color: darkMode ? "#ff6600ff" : "#222",
              border: darkMode ? "1px solid rgba(255,102,0,0.4)" : "1px solid rgba(255,102,0,0.5)",
              backdropFilter: "blur(10px)",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: `0 0 20px #ff6600ff, 0 4px 20px rgba(0,0,0,0.2)`,
                bgcolor: darkMode ? "#333" : "rgba(255,102,0,0.05)"
              },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 2
            }}
          >
            <div style={{ fontSize: 50, marginBottom: 10, color: "#ff6600ff" }}>
              {icons[i % icons.length]}
            </div>
            <Typography variant="h6" sx={{ textAlign: "center", color: darkMode ? "#ff6600ff" : "#222" }}>
              {dep.title}
            </Typography>
          </Card>
        ))}
      </div>
    </div>
  );
}
