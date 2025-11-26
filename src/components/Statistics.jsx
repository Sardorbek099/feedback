import { useEffect, useState } from "react";
import faculties from "../data/faculties";
// faculties
// import { faculties } from "../data/faculties";
// faculties

function Statistics() {
  const totalFaculties = faculties.length;
  const totalCafedras = faculties.reduce((acc, f) => acc + f.cafedras.length, 0);

  const totalFeedbacks = Object.keys(localStorage)
    .filter(key => key.includes("-") && key.endsWith("-feedback") || /^\d+-\d+-feedback$/.test(key))
    .length;

  const statsData = [
    { label: "Fakultetlar soni", value: totalFaculties, color: "#6a11cb" },
    { label: "Kafedralar soni", value: totalCafedras, color: "#ff416c" },
    { label: "Umumiy feedbacklar soni", value: totalFeedbacks, color: "#1dd1a1" },
  ];

  const [counts, setCounts] = useState(new Array(statsData.length).fill(0));

  useEffect(() => {
    const intervals = statsData.map((stat, index) => {
      return setInterval(() => {
        setCounts(prev => {
          const newCounts = [...prev];
          if (newCounts[index] < stat.value) {
            newCounts[index] += 1;
          }
          return newCounts;
        });
      }, 100);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: 20,
      marginTop: 30
    }}>
      {statsData.map((s, i) => (
        <div key={i} style={{
          textAlign: "center",
          background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}80 100%)`,
          padding: 20,
          borderRadius: 15,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          minHeight: 120,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          transition: "all 0.3s ease",
          color: "#fff"
        }}>
          <h2 style={{ fontSize: 36, margin: "0 0 10px 0" }}>{counts[i]}</h2>
          <p style={{ fontWeight: "bold", margin: 0 }}>{s.label}</p>
        </div>
      ))}
    </div>
  );
}

export default Statistics;
