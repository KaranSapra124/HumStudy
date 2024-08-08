const mongoose = require("mongoose");

const visaSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  fullName: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  purpose: {
    type: String,
    enum: [
      "Study",
      "Resident Visa",
      "Travel",
      "Emergency Visa",
      "Work",
      "Visa Booking",
      "Study Loan",
      "Flight Ticket",
      "Accommodation",
    ],
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  counsellingSlot: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

module.exports = mongoose.model("visa", visaSchema);
