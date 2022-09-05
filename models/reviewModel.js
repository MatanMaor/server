const mongoose = require("mongoose");

const reviewScema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  createdAt: {
    type: Date,
    defult: Date.now(),
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  reviewer: {
    type: mongoose.Schema.ObjectId,
    ref: "user",
    required: true,
  },
});

const Review = mongoose.model("reviews", reviewScema);
module.exports = Review;
