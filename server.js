const express = require("express");
const cors = require("cors");

const app = express();

// Dinamik port: Render yoki local
const PORT = process.env.PORT || 5000;

// CORS: frontend URL bilan
app.use(cors({ origin: "https://feedback-2-oayz.netlify.app" }));
app.use(express.json());

// LOG each request
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

// In-memory users
const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user1", password: "user123", role: "user" }
];

// Health
app.get("/health", (req, res) => res.send("OK"));

// Auth
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username);
  if (!username || !password) {
    return res.status(400).json({ message: "Username va password kiritilishi shart" });
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Login yoki parol xato" });

  return res.json({ username: user.username, role: user.role, token: "fake-jwt-token" });
});

// Serverni ishga tushirish
app.listen(PORT, () => console.log(`Server running on https://feedback-2-oayz.onrender.com`));
