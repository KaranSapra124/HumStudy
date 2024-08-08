const mongoose = require("mongoose");

const supportSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    replies: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("supportSchema", supportSchema);
