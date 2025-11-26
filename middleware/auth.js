const jwt = require("jsonwebtoken");
const SECRET = "SUPER_SECRET_KEY";

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    next();
  }
}

function isAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Huquq yo‘q" });
  }
  next();
}

module.exports = { auth, isAdmin, SECRET };
