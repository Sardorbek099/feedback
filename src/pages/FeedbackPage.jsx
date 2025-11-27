import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../config";
import '../index.css';


export default function FeedbackPage() {
  const { fid, did } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const userId = "demoUser";

  const loadData = () => {
    fetch(`${API}/feedbacks?fid=${fid}&did=${did}`)
      .then(res => res.json())
      .then(setFeedbacks);
  };

  useEffect(loadData, [fid, did]);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`${API}/feedbacks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fid: Number(fid), did: Number(did), userId, rating, comment, date: new Date() })
    }).then(loadData);
  };

  return (
    <div>
      <h2>Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input value={comment} onChange={e => setComment(e.target.value)} placeholder="Izoh" />
        <input type="number" value={rating} onChange={e => setRating(Number(e.target.value))} />
        <button type="submit">Yuborish</button>
      </form>

      <ul>
        {feedbacks.map(f => (
          <li key={f.id}>{f.userId}: {f.rating} ⭐ - {f.comment}</li>
        ))}
      </ul>
    </div>
  );
}
