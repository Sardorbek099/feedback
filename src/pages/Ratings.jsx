import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaComments, FaUniversity, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function RatingsPage() {
  const [faculties, setFaculties] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/faculties").then(res => res.json()),
      fetch("http://localhost:5000/feedbacks").then(res => res.json())
    ])
    .then(([fData, fbData]) => {
      setFaculties(fData);
      setFeedbacks(fbData);
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false));
  }, []);

  if (loading) return <p style={{ textAlign: "center", marginTop: 50 }}>Yuklanmoqda...</p>;
  if (!faculties.length) return <p style={{ textAlign: "center", marginTop: 50 }}>Fakultetlar topilmadi</p>;

  const totalUsers = [...new Set(feedbacks.map(fb => fb.userId))].length;
  const totalFeedbacks = feedbacks.length;
  const totalFaculties = faculties.length;

  const facultiesWithAvg = faculties.map(f => {
    const allRatings = f.cafedras.flatMap(c =>
      feedbacks
        .filter(fb => Number(fb.fid) === Number(f.id) && Number(fb.did) === Number(c.id))
        .map(fb => fb.rating)
    );
    const avg = allRatings.length ? allRatings.reduce((a,b)=>a+b,0)/allRatings.length : 0;
    return { ...f, avg };
  });

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      padding: 20,
      fontFamily: "Arial, sans-serif",
      background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      <h1 style={{ marginBottom: 30 }}>Platformaning Umumiy Statistikasi</h1>

      {/* TOP CARDS */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center", marginBottom: 50 }}>
        <AnimatedCard icon={<FaUsers size={40} color="#0077b6" />} label="Foydalanuvchilar" value={totalUsers} color="#a0c4ff" />
        <AnimatedCard icon={<FaComments size={40} color="#ff8c00" />} label="Fikrlar" value={totalFeedbacks} color="#ffd6a5" />
        <AnimatedCard icon={<FaUniversity size={40} color="#28a745" />} label="Fakultetlar" value={totalFaculties} color="#caffbf" />
      </div>

      {/* Facultetlar reyting cardlari */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center" }}>
        {facultiesWithAvg.map((f, idx) => (
          <motion.div
            key={idx}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: idx*0.1, type:"spring", stiffness:120 }}
            style={{
              background: "white",
              borderRadius: 20,
              width: 220,
              height: 150,
              padding: 20,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <h3 style={{ textAlign: "center" }}>{f.title}</h3>
            <div style={{ display:"flex", alignItems:"center", gap:5, marginTop:10 }}>
              {renderStars(f.avg)}
            </div>
            <motion.p style={{ fontSize:24, fontWeight:"bold", marginTop:10 }}
              initial={{ scale:0 }}
              animate={{ scale:1 }}
              transition={{ delay:0.2 }}
            >
              {f.avg.toFixed(1)}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Animated card component
function AnimatedCard({ icon, label, value, color }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / 60;
    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      style={{
        background: color,
        borderRadius: 20,
        width: 180,
        height: 150,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 18,
        color: "#333",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        cursor: "pointer"
      }}
    >
      {icon}
      <motion.p style={{ fontSize:32, margin:10 }} initial={{ scale:0 }} animate={{ scale:1 }}>
        {count}
      </motion.p>
      <p>{label}</p>
    </motion.div>
  );
}

// Helper function: render stars with half star support
function renderStars(avg) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (avg >= i + 1) {
      stars.push(<FaStar key={i} color="#ffcd3c" />);
    } else if (avg > i && avg < i + 1) {
      stars.push(<FaStarHalfAlt key={i} color="#ffcd3c" />);
    } else {
      stars.push(<FaStar key={i} color="#ddd" />);
    }
  }
  return stars;
}
