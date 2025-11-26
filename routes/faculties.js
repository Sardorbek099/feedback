const router = require("express").Router();
const Faculty = require("../models/Faculty");

// Barchasi
router.get("/", async (req, res) => {
  const list = await Faculty.find();
  res.json(list);
});

// Qo‘shish
router.post("/", async (req, res) => {
  const f = new Faculty(req.body);
  await f.save();
  res.json(f);
});

// O‘chirish
router.delete("/:id", async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
