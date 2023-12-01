// Assuming you have express and mongoose set up
const express = require('express');
const mongoose = require('mongoose');
const isLoggedIn=require('../middleware');

const app = express();
app.use(express.json());

const Review=require("../models/review");

// Route to get all reviews
app.get('/Review/:id',isLoggedIn, async (req, res) => {
  try {
    const recipeId = req.params.id;
    const reviews = await Review.find({ mealId: recipeId });  
      res.render("review",{reviews});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/gaurav',isLoggedIn, async (req, res) => {
  const { mealId, name, rating, feedback } = req.body;
  try {
    const newReview = new Review({ mealId, name, rating, feedback });
    await newReview.save();
    // res.status(201).json({ message: 'Review added successfully' });
    const recipeId = req.params.id;
    const reviews = await Review.find({ mealId: recipeId });  
    req.flash('success',"review added sucessfully bero");
      res.render("review",{reviews});
   
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server

module.exports=app;