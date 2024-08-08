const mongoose = require("mongoose");

const uniSchema = new mongoose.Schema({
  universityName: {
    type: String,
    required: true,
    unique: true,
  },
  universityLogo: {
    type: String,
  },
  city: {
    type: String,
    default: "New York",
  },
  country: {
    type: String,
    default: "USA",
  },
  intakes: {
    type: String,
  },
  applicationFeesCurrency: {
    type: String,
    default: "USD",
  },
  applicationFees: {
    type: String,
    default: 0,
  },
  securityPercentage: {
    type: String,
    default: 0,
  },
  livingExpensesCurrency: {
    type: String,
    default: "USD",
  },
  livingExpenses: {
    type: String,
    default: 0,
  },
  collegeRank: {
    type: String,
    default: "N/A",
  },
  qsWorldRanking: {
    type: String,
    default: "N/A",
  },
  timeHigherRanking: {
    type: String,
    default: "N/A",
  },
  usNewsRanking: {
    type: String,
    default: "N/A",
  },
  ukRanking: {
    type: String,
    default: "N/A",
  },
  scholarships: {
    type: [String],
    default: [],
  },
  
  aboutUni: {
    type: [String],
    default: [],
  },
  aboutLocation: {
    type: [String],
    default: [],
  },
});

uniSchema.pre("insertMany", function (next, documents) {
  documents.forEach((doc) => {
    ["scholarships", "aboutUni", "aboutLocation"].forEach((key) => {
      if (doc[key] && typeof doc[key] === "string") {
        doc[key] = doc[key]
          .split("*")
          .map((s) => s.trim())
          .filter(Boolean);
      }
    });
  });

  next();
});

module.exports = mongoose.model("university", uniSchema);
