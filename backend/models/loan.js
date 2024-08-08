const mongoose = require("mongoose");

const rangeSchema = new mongoose.Schema({
  from: {
    type: Number,
    required: true,
  },
  to: {
    type: Number,
    required: true,
  },
});

const rangeWithTypeSchema = new mongoose.Schema({
  percentage: rangeSchema,
  number: rangeSchema,
});

const loanSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["below-average", "average", "good", "mediocre", "not-eligible"],
  },
  bankName: {
    type: String,
    // required: true,
  },
  bankImage: {
    type: String,
  },
  expectedInterestRate: {
    type: rangeSchema,
    // required: true,
  },
  processingFee: {
    type: {
      type: String,
      enum: ["percentage", "number"],
    },
    from: {
      type: Number,
      default: 0,
    },
    to: {
      type: Number,
      default: 0,
    },
    withGST: {
      type: Boolean,
      default: false,
    },
  },
  aptitudeExams: {
    GRE: {
      subject: { type: String, default: "GRE" },
      min: { type: Number, default: 250 },
      max: { type: Number, default: 300 },
    },
    GMAT: {
      subject: { type: String, default: "GMAT" },
      min: { type: Number, default: 400 },
      max: { type: Number, default: 500 },
    },
    SAT: {
      subject: { type: String, default: "SAT" },
      min: { type: Number, default: 1000 },
      max: { type: Number, default: 1200 },
    },
    na: {
      type: Boolean,
      default: true,
    },
  },
  academicScore: {
    from: {
      percent: {
        type: Number,
        default: 0,
      },
      cgpa: {
        type: Number,
        default: 0,
      }
    },
    to: {
      percent: {
        type: Number,
        default: 0,
      },
      cgpa: {
        type: Number,
        default: 0,
      },
    },
  },
  englishProficiencyScore: {
    ielts: rangeSchema,
    pte: rangeSchema,
    toefl: rangeSchema,
  },
  salary: rangeSchema,
  cibilScore: rangeSchema,
  universityWorldRank: rangeSchema,
  withCollateral: {
    eligible: {
      type: String,
      default: false,
    },
    minAmount: {
      type: Number,
      default: 0,
    },
  },
  withoutCollateral: {
    eligible: {
      type: Boolean,
      default: false,
    },
    minAmount: {
      type: Number,
      default: 0,
    },
  },
});

module.exports = mongoose.model("Loan", loanSchema);
