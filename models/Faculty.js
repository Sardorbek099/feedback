const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  title: String,
  score: Number
});

module.exports = mongoose.model("Faculty", facultySchema);
