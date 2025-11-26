import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { FaStar, FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";

function FeedbackPage({ darkMode }) {
  const { fid, did } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const viewMode = new URLSearchParams(location.search).get("view") === "true";
  const userId = user?.id || "demoUser";

  const [faculty, setFaculty] = useState(null);
  const [department, setDepartment] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [editing, setEditing] = useState(false);
  const [feedbackId, setFeedbackId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ma’lumotlarni yuklash
  const loadData = () => {
    setLoading(true);
    // Faculties va departments
    fetch("http://localhost:5000/faculties")
      .then((res) => res.json())
      .then((data) => {
        const f = data.find((f) => f.id.toString() === fid);
        setFaculty(f || null);
        if (f) {
          const d = f.cafedras.find((c) => c.id.toString() === did);
          setDepartment(d || null);
        }
      });

    // Feedbacks
    fetch(`http://localhost:5000/feedbacks?fid=${fid}&did=${did}`)
      .then((res) => res.json())
      .then((data) => {
        setFeedbacks(data);

        const own = data.find((f) => f.userId === userId);
        if (own) {
          setAlreadyVoted(true);
          setRating(own.rating);
          setComment(own.comment);
          setFeedbackId(own.id);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(loadData, [fid, did, userId]);

  // Admin – delete
  const deleteFeedback = async (id) => {
    if (!window.confirm("Rostdan ham o‘chirasizmi?")) return;
    await fetch(`http://localhost:5000/feedbacks/${id}`, {
      method: "DELETE",
    });
    loadData();
  };

  // User → o‘z fikrini yuboradi
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      fid: Number(fid),
      did: Number(did),
      userId,
      rating,
      comment,
      date: new Date().toISOString(),
    };

    const url = editing
      ? `http://localhost:5000/feedbacks/${feedbackId}`
      : "http://localhost:5000/feedbacks";

    fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      setEditing(false);
      loadData();
    });
  };

  if (loading) return <p style={{ textAlign: "center" }}>Yuklanmoqda...</p>;

  // Admin panel
  if (user?.role === "admin") {
    return (
      <div style={{ maxWidth: 900, margin: "40px auto", padding: 20 }}>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          {faculty?.title} – {department?.title} (Admin Panel)
        </h2>

        {feedbacks.length === 0 ? (
          <p style={{ textAlign: "center" }}>Hozircha izohlar yo‘q</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: darkMode ? "#222" : "#fff",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <thead>
              <tr
                style={{
                  background: darkMode ? "#333" : "#0077b6",
                  color: "#fff",
                }}
              >
                <th style={{ padding: 10 }}>Foydalanuvchi</th>
                <th style={{ padding: 10 }}>Reyting</th>
                <th style={{ padding: 10 }}>Izoh</th>
                <th style={{ padding: 10 }}>Sana</th>
                <th style={{ padding: 10 }}>Amallar</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((f) => (
                <tr
                  key={f.id}
                  style={{
                    borderBottom: "1px solid #ccc",
                    background: darkMode ? "#1a1a1a" : "#f9f9f9",
                  }}
                >
                  <td style={{ padding: 10 }}>{f.userId}</td>
                  <td style={{ padding: 10 }}>{f.rating} ⭐</td>
                  <td style={{ padding: 10 }}>{f.comment}</td>
                  <td style={{ padding: 10 }}>
                    {new Date(f.date).toLocaleString()}
                  </td>
                  <td style={{ padding: 10 }}>
                    <button
                      onClick={() => deleteFeedback(f.id)}
                      style={{
                        padding: "6px 12px",
                        background: "#d00000",
                        border: "none",
                        borderRadius: 6,
                        color: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <FaTrash /> O‘chirish
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div
          style={{
            marginTop: 25,
            textAlign: "center",
            cursor: "pointer",
            color: darkMode ? "#ffd700" : "#0077b6",
            fontWeight: "bold",
          }}
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Ortga
        </div>
      </div>
    );
  }

  // Oddiy user
  if (!faculty || !department)
    return <p style={{ textAlign: "center" }}>Ma’lumot topilmadi</p>;

  const canEdit = !viewMode && (!alreadyVoted || editing);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: 500,
        margin: "50px auto",
        padding: 20,
        borderRadius: 15,
        background: darkMode ? "#1a1a1a" : "#fff",
        boxShadow: darkMode
          ? "0 5px 25px rgba(255,255,255,0.05)"
          : "0 5px 25px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        {faculty.title} – {department.title}
      </h2>
      <form onSubmit={handleSubmit}>
        <label>Reyting:</label>
        <div style={{ display: "flex", gap: 5, margin: "10px 0" }}>
          {[1, 2, 3, 4, 5].map((num) => (
            <motion.span
              key={num}
              whileHover={{ scale: canEdit ? 1.2 : 1 }}
              onClick={() => canEdit && setRating(num)}
              style={{
                cursor: canEdit ? "pointer" : "not-allowed",
                color: num <= rating ? "#ffd700" : "#ccc",
              }}
            >
              <FaStar />
            </motion.span>
          ))}
        </div>

        <label>Izoh:</label>
        <textarea
          value={comment || ""}
          onChange={(e) => canEdit && setComment(e.target.value)}
          rows="5"
          style={{
            width: "100%",
            marginTop: 5,
            padding: 10,
            borderRadius: 10,
            border: "1px solid #ccc",
            background: darkMode ? "#1a1a1a" : "#fdfdfd",
            color: darkMode ? "#fff" : "#000",
          }}
        />

        <motion.button
          type="submit"
          disabled={!canEdit || rating === 0}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            marginTop: 20,
            padding: "10px 20px",
            border: "none",
            borderRadius: 10,
            background: "#28a745",
            color: "#fff",
            fontWeight: "bold",
            width: "100%",
            cursor: canEdit ? "pointer" : "not-allowed",
          }}
        >
          {editing ? "O‘zgartirishni saqlash" : "Yuborish"}
        </motion.button>

        {alreadyVoted && !editing && (
          <div style={{ marginTop: 20 }}>
            <motion.button
              onClick={() => setEditing(true)}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: "8px 12px",
                borderRadius: 8,
                background: "#ffc107",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
                marginBottom: 10,
              }}
            >
              <FaEdit /> Tahrirlash
            </motion.button>
          </div>
        )}
      </form>

      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{
          marginTop: 20,
          textAlign: "center",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 5,
          fontWeight: "bold",
        }}
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft /> Ortga
      </motion.div>
    </motion.div>
  );
}

export default FeedbackPage;
