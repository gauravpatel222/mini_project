const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    mealId: { type: String, required: true },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  feedback: {
    type: String,
    required: true,
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
