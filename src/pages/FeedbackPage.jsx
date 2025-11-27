import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../config";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Rating,
  IconButton,
  Stack
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { FaClock, FaRegHourglass } from "react-icons/fa";

export default function FeedbackPage() {
  const { fid, did } = useParams();
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [timer, setTimer] = useState(0);

  const userId = "demoUser";

  const loadData = () => {
    fetch(`${API}/feedbacks?fid=${fid}&did=${did}`)
      .then(res => res.json())
      .then(setFeedbacks);
  };

  useEffect(loadData, [fid, did]);

  const userFeedback = feedbacks.find(fb => fb.userId === userId);
  const remainingTime = userFeedback
    ? Math.max(0, 15 * 60 - Math.floor((new Date() - new Date(userFeedback.date)) / 1000))
    : 0;

  useEffect(() => {
    if (!userFeedback) return;
    setTimer(remainingTime);
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [userFeedback]);

  const handleEdit = fb => {
    setEditingId(fb.id);
    setComment(fb.comment);
    setRating(fb.rating);
  };

  const handleDelete = id => {
    fetch(`${API}/feedbacks/${id}`, { method: "DELETE" }).then(loadData);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!comment || rating === 0) return;

    const payload = {
      fid: Number(fid),
      did: Number(did),
      userId,
      rating,
      comment,
      date: new Date()
    };

    if (editingId) {
      fetch(`${API}/feedbacks/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(() => {
        setEditingId(null);
        setComment("");
        setRating(0);
        loadData();
      });
    } else {
      fetch(`${API}/feedbacks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }).then(() => {
        setComment("");
        setRating(0);
        loadData();
      });
    }
  };

  const formatTime = t => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return { m, s };
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: 2,
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "#f5f5f7", // Hi-Tech oq asos
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={4} sx={{ textAlign: "center", color: "#ff6600ff", textShadow: "0 0 15px rgba(255,102,0,0.6)" }}>
        Kafedra Feedbacklari
      </Typography>

      {/* Feedback Form */}
      {!userFeedback || editingId ? (
        <Card sx={{ width: "100%", maxWidth: 500, mb: 4, p: 3, backdropFilter: "blur(10px)", bgcolor: "rgba(255,255,255,0.1)", border: "1px solid #ff6600ff" }}>
          <Typography variant="h6" mb={2} sx={{ color: "#ff6600ff" }}>
            {editingId ? "Izohni tahrirlash" : "Yangi Feedback Qo'shish"}
          </Typography>

          {userFeedback && !editingId && timer > 0 && (
            <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
              <FaClock style={{ color: "#ff6600ff" }} />
              <Typography sx={{ color: "#ff6600ff" }}>{formatTime(timer).m.toString().padStart(2, "0")}</Typography>
              <FaRegHourglass style={{ color: "#007aff" }} />
              <Typography sx={{ color: "#007aff" }}>{formatTime(timer).s.toString().padStart(2, "0")}</Typography>
            </Box>
          )}

          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <Rating value={rating} onChange={(e, val) => setRating(val)} size="large" sx={{ color: "#ff6600ff" }} />
            <TextField
              label="Izoh"
              fullWidth
              multiline
              minRows={2}
              value={comment}
              required
              onChange={e => setComment(e.target.value)}
              sx={{
                "& label": { color: "#ff6600ff" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ff6600ff" },
                  "&:hover fieldset": { borderColor: "#ff6600ff" },
                  "&.Mui-focused fieldset": { borderColor: "#ff6600ff" },
                }
              }}
            />
            <Button variant="contained" type="submit" sx={{ bgcolor: "#ff6600ff", "&:hover": { bgcolor: "#ff8533" } }}>
              {editingId ? "Tahrirlash" : "Yuborish"}
            </Button>
          </Stack>
        </Card>
      ) : (
        <Button
          variant="outlined"
          onClick={() => navigate(`/feedback/${fid}/${did}`)}
          sx={{ borderColor: "#ff6600ff", color: "#ff6600ff", "&:hover": { borderColor: "#ff8533", color: "#ff8533" } }}
        >
          Siz allaqachon ovoz berdingiz — tahrirga o'tish
        </Button>
      )}

      {/* Feedback list */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 3, width: "100%", maxWidth: 1200 }}>
        {feedbacks.map(fb => {
          const remTime = Math.max(0, 15 * 60 - Math.floor((new Date() - new Date(fb.date)) / 1000));
          const editable = fb.userId === userId && (editingId === fb.id || remTime > 0);
          const time = formatTime(remTime);

          return (
            <Card key={fb.id} sx={{ p: 2, position: "relative", backdropFilter: "blur(10px)", bgcolor: "rgba(255,255,255,0.1)", border: "1px solid #ff6600ff" }}>
              <CardContent>
                <Typography variant="subtitle2" sx={{ color: "#ff6600ff" }}>
                  {fb.userId} - {new Date(fb.date).toLocaleDateString()} {new Date(fb.date).toLocaleTimeString()}
                </Typography>
                <Rating value={fb.rating} readOnly sx={{ color: "#ff6600ff" }} />
                <Typography sx={{ color: "#0a0a0a" }}>{fb.comment}</Typography>

                {editable && (
                  <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 1 }}>
                    <IconButton onClick={() => handleEdit(fb)} sx={{ color: "#ff6600ff" }}>
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(fb.id)} sx={{ color: "#ff6600ff" }}>
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                )}

                {fb.userId === userId && remTime > 0 && !editingId && (
                  <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1, justifyContent: "flex-end" }}>
                    <FaClock style={{ color: "#ff6600ff" }} />
                    <Typography sx={{ color: "#ff6600ff" }}>{time.m.toString().padStart(2, "0")}</Typography>
                    <FaRegHourglass style={{ color: "#007aff" }} />
                    <Typography sx={{ color: "#007aff" }}>{time.s.toString().padStart(2, "0")}</Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
}
