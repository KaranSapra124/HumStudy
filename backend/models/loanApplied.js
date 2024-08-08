const mongoose = require("mongoose");

const loanAppliedSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  loanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Loan",
  },
  loanStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
});

module.exports = mongoose.model("loanApplied", loanAppliedSchema);
