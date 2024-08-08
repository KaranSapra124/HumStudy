const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  dateOfTravel: {
    type: Date,
    required: true,
  },
  returnDate: {
    type: Date,
    required: true,
  },
  purpose: {
    type: String,
    enum: ["Business", "Vocations", "Study & Medical"],
    required: true,
  },
  fromFlight: {
    type: String,
    required: true,
  },
  toFlight: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Flight", flightSchema);
