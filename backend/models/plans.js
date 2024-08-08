const mongoose = require("mongoose");
const contentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  
});

const knowMoreSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [contentSchema],
    required: true,
  },
  notes: {
    type: [String],
    required: true,
  },
  terms:{
    type: [String],
    required: true,
  }
  ,refundConditions: {
    type: [String],
    required: true,
  },
});

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  featuresIncluded: {
    type: [String],
    required: true,
  },
  featuresNotIncluded: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  knowMore: {
    required: true,
    type: knowMoreSchema,
  },
  
 
  });

const Plans = mongoose.model("Plan", Schema);
module.exports = Plans;
