const mongoose = require("mongoose");

function validateTuitionFee(value) {
  if (value !== null) {
    let parsedValue;
    console.log(value, "TYPE");
    // Check if value is a number or a string with currency symbol
    if (typeof value === "number") {
      parsedValue = value; // Already a number, no need to parse
    } else if (typeof value === "string") {
      // console.log(value, "VALUE");
      // Remove '$' and commas from the value
      const cleanedValue = value.replace(/[$,€]/g, "");

      // Convert cleaned value to a number
      parsedValue = parseFloat(cleanedValue);

      // Validate if parsedValue is a valid number
      if (isNaN(parsedValue)) {
        return false;
      }
    } else {
      return false; // Invalid type
    }

    // Set the field value to the parsed numeric value
    this.tuitionFeeFirstYear = parsedValue;
    return true;
  } else {
    return;
  }
}

const courseSchema = new mongoose.Schema({
  university: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "university",
  },
  universityName: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  courseLink: {
    type: String,
  },
  city: {
    type: String,
  },
  country: {
    type: String,
  },
  level: {
    type: String,
  },
  major: {
    type: String,
  },
  category: {
    type: String,
  },
  tuitionFeeOverallCurrency: {
    type: String,
    default: "INR",
  },
  tuitionFeeOverall: {
    type: String,
    default: "N/A",
  },
  // tuitionFeeFirstYearCurrency: {
  //   type: String,
  //   default: 'INR',
  // },
  tuitionFeeFirstYear: {
    type: Number,
    default: null,
    validate: {
      validator: validateTuitionFee,
      message: "Invalid Tuition Fee Format",
    },
  },
  duration: {
    type: String,
  },

  appFee: {
    type: String,
  },
  scholarShips: {
    type: String,
  },
  collegeRank: {
    type: String,
  },
  ielts: {
    type: String,
  },
  toefl: {
    type: String,
  },
  twelvethScore: {
    type: String,
  },
  UGScore: {
    type: String,
  },
  GRE: {
    type: String,
  },
  satScore: {
    type: String,
  },
  GMAT: {
    type: String,
  },
  dualingo: {
    type: Number,
    default: 0,
  },
  PTE: {
    type: String,
  },
  febDeadline: {
    type: String,
  },
  mayDeadline: {
    type: String,
  },
  augDeadline: {
    type: String,
  },
  janDeadline: {
    type: String,
  },
  juneDeadline: {
    type: String,
  },
  sepDeadline: {
    type: String,
  },
  febOpening: {
    type: String,
  },
  mayOpening: {
    type: String,
  },
  augOpening: {
    type: String,
  },
  janOpening: {
    type: String,
  },
  juneOpening: {
    type: String,
  },
  sepOpening: {
    type: String,
  },
});

module.exports = mongoose.model("course", courseSchema);
