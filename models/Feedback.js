const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  text: String,
  facultyId: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
