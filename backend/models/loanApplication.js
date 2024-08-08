const mongoose = require("mongoose");

const loanApplicationSchema = new mongoose.Schema({
  countries: {
    type: String,
    enum: [
      "unitedkingdom",
      "unitedstate",
      "europe",
      "australia",
      "canada",
      "other",
    ],
    required: true,
  },
  stateOfAdmission: {
    type: String,
    required: true,
    enum: ["confirmed", "applied", "na"],
  },
  plannedUniversity: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  loanAmount: {
    min: Number,
    max: Number,
  },
  loanType: {
    type: String,
    enum: ["secured", "unsecured"],
  },
  paymentDeadline: {
    type: Date,
  },
  loanBefore: {
    type: String,
    enum: [
      "na",
      "Yes I have Taken",
      "My Mother Taken",
      "My Father Taken",
      "My Sister Taken",
      "My Brother Taken",
    ],
  },
  isLoanActive: {
    type: Boolean,
    default: false,
  },
  cibilOf: {
    type: String,
    enum: ["mother/father", "student"],
  },
  cibilScore: {
    type: Number,
  },
  jobType: {
    type: String,
    enum: ["government", "private", "na"],
  },
  lastExam: {
    type: String,
    enum: ["ug", "pg", "na"],
  },
  lastExamScore: {
    type: Number,
  },
  englishExam: {
    type: String,
    enum: ["toefl", "ielts", "pte", "na"],
  },
  englishExamScore: {
    type: Number,
  },
  academicExam: {
    type: String,
    enum: ["sat", "act", "na"],
  },
  academicExamScore: {
    type: Number,
  },
  touchWithFinancialInstitution: {
    type: String,
    enum: ["yes", "no"],
  },
  status: {
    type: String,
    enum: ["pending", "rejected", "accepted"],
  },
});

module.exports = mongoose.model("loanApplication", loanApplicationSchema);
