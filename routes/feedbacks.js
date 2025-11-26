const router = require("express").Router();
const Feedback = require("../models/Feedback");

// List
router.get("/", async (req, res) => {
  const list = await Feedback.find();
  res.json(list);
});

// Create
router.post("/", async (req, res) => {
  const fb = new Feedback(req.body);
  await fb.save();
  res.json(fb);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Feedback.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
