import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

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

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: 50, color: "#ff6600ff" }}>
        Yuklanmoqda...
      </p>
    );

  // Facultetlar bilan feedbacklarni birlashtirib, o'rtacha rating va sonini hisoblash
  const dataForChart = faculties.map(f => {
    const ratings = f.cafedras.flatMap(c =>
      feedbacks
        .filter(fb => Number(fb.fid) === Number(f.id) && Number(fb.did) === Number(c.id))
        .map(fb => fb.rating)
    );
    const avg = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;
    return {
      name: f.title,
      avg: Number(avg.toFixed(1)),
      feedbacks: ratings.length
    };
  });

  return (
    <Box
      sx={{
        p: 4,
        width: "100%",
        minHeight: "100vh",
        background: "#f4f6f8",
        color: "#ff6600ff" // barcha matnlar rangini default qiladi
      }}
    >
      <Typography variant="h4" mb={4} textAlign="center">
        Kafedralar Umumiy Statistikasi
      </Typography>

      {/* Bar Chart */}
      <Box sx={{ width: "100%", height: 350, mb: 6 }}>
        <ResponsiveContainer>
          <BarChart data={dataForChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#ff6600ff" />
            <YAxis stroke="#ff6600ff" />
            <Tooltip
              contentStyle={{ backgroundColor: "#f4f6f8", borderColor: "#ff6600ff", color: "#ff6600ff" }}
            />
            <Bar dataKey="avg" fill="#1976d2" name="O'rtacha Reyting" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fff3e0" }}> {/* engil fon */}
              <TableCell sx={{ color: "#ff6600ff", fontWeight: "bold" }}>Fakultet</TableCell>
              <TableCell align="right" sx={{ color: "#ff6600ff", fontWeight: "bold" }}>O'rtacha Reyting</TableCell>
              <TableCell align="right" sx={{ color: "#ff6600ff", fontWeight: "bold" }}>Feedbacklar soni</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataForChart.map(row => (
              <TableRow key={row.name}>
                <TableCell sx={{ color: "#ff6600ff" }}>{row.name}</TableCell>
                <TableCell align="right" sx={{ color: "#ff6600ff" }}>{row.avg}</TableCell>
                <TableCell align="right" sx={{ color: "#ff6600ff" }}>{row.feedbacks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </Box>
  );
}
