const mongoose = require("mongoose");

const major = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  level: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("major", major);
