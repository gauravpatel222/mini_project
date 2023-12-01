const express = require("express");
// const isAuthenticated = require("./isAuthenticated");
const Meal = require('../models/recipe_schema');
const router = express.Router();
// router.use(isAuthenticated);
const isLoggedIn=require('../middleware');


router.get('/create' ,isLoggedIn,(req, res) => {
  res.render("create")
});

// routes.js


// Display the form to create a n
// Handle the form submission to create a new meal
router.post('/create',isLoggedIn, async (req, res) => {
  const { mealId, userName, userId, recipeName, recipeIngredients, recipeInstructions, youtubeVideoLink } = req.body;

  try {
    const newMeal = new Meal({
      mealId,
      userName,
      userId,
      recipeName,
      recipeIngredients,
      recipeInstructions,
      youtubeVideoLink,
    });

    await newMeal.save();
    res.redirect('/home'); // Redirect to a page showing all meals or wherever you want
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;


module.exports = router;
