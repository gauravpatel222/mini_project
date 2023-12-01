// mealModel.js
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  mealId: { type: String, required: true },
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  recipeName: { type: String, required: true },
  recipeIngredients: { type: String, required: true },
  recipeInstructions: { type: String, required: true },
  youtubeVideoLink: { type: String, required: true },
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
