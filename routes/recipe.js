

const express=require('express');
// const list=require('../models/food.js');
const router=express.Router();
// const fetch = require('node-fetch');
const isLoggedIn=require('../middleware');

// const isAuthenticated = require('./isAuthenticated');
const cookieParser = require('cookie-parser');
const app = express();
const user=require("../models/user");
app.use(cookieParser());

const jwt = require('jsonwebtoken');

// router.use(isAuthenticated)
router.get('/home',isLoggedIn, async (req, res) => {
  try {
      let apiUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("home")
      // console.log('User information before rendering view:', res.locals.user);
      res.render('home', {data});
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});






router.post('/home',isLoggedIn, async (req, res) => {
  try {
    const { search } = req.body;

    // Fetch data from the API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
    const data = await response.json();

    // Render the 'home' view with the fetched data
    res.render('home', { data });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/home/:id',isLoggedIn, async (req, res) => {
  const id = req.params.id;

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ID ${id}`);
    }

    const data = await response.json();

    // Ensure that meals array and the first item exist before accessing properties
    if (data.meals && data.meals[0]) {
      console.log(data.meals[0].strMeal);
      res.render("recipe", { data });
    } else {
      throw new Error(`No data found for ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).render("error", { error });
  }
});

const Favorite = require("../models/favourite");


router.get("/favourites/:id",isLoggedIn, async (req, res) => {
  const recipeId = req.params.id;
  // const userId = req.user._id;
  // console.log(userId);

  try {
    // Fetch recipe details from the external API
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ID ${recipeId}`);
    }

    const data = await response.json();

    // Ensure that meals array and the first item exist before accessing properties
    if (data.meals && data.meals[0]) {
      const fetchedRecipe = data.meals[0];

      // Check if the recipe is already in favorites
      const existingFavorite = await Favorite.findOne({ mealId: fetchedRecipe.idMeal });

      if (existingFavorite) {
        // Recipe is already in favorites, send a message or handle it accordingly
        return res.status(200).json({ message: 'Recipe already in favorites' });
      }

      // Create a new favorite record in the database
      const newFavorite = new Favorite({
        mealId: fetchedRecipe.idMeal,
        mealName: fetchedRecipe.strMeal,
        mealImage: fetchedRecipe.strMealThumb,
      });

      await newFavorite.save();

      console.log(`Recipe "${fetchedRecipe.strMeal}" added to favorites`);
       // Fetch all favorite recipes from the database
    const favoriteRecipes = await Favorite.find();

    res.render('favourite', { favoriteRecipes }); 
      // res.status(200).json({ message: `Recipe added to favorites successfully` });
    } else {
      throw new Error(`No data found for ID ${recipeId}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});





router.get("/favourite", async (req, res) => {
  try {
    // Fetch all favorite recipes from the database
    const favoriteRecipes = await Favorite.find();

    res.render('favourite', { favoriteRecipes }); // Assuming you are using a view engine like EJS or Pug
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;







