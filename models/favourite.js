const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
    mealId: { type: String, required: true }, // Assuming mealId is a string
    mealName: { type: String, required: true },
    mealImage: { type: String, required: true },

});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
