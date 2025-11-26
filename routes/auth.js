const router = require("express").Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  const user = await User.findOne({ username, password });
  if (!user) return res.status(401).json({ message: "Xato login yoki parol" });

  res.json({
    username: user.username,
    role: user.role
  });
});

module.exports = router;
