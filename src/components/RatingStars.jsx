import { useState } from "react";

function RatingStars({ value, onChange }) {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: "flex", gap: 10 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{
            cursor: "pointer",
            fontSize: 30,
            color: (hover || value) >= star ? "#ffb400" : "#bbb"
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default RatingStars;
