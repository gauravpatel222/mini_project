const mongoose = require('mongoose');
const Recipe=require("./recipe_schema");
const passportLocalMongoose = require('passport-local-mongoose') ;

const user = new mongoose.Schema({
    
    email:{
        type:String,
        trim:true
    },

    
    favorite_Recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    create_Recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],


})

user.plugin(passportLocalMongoose) ;

const user_model = mongoose.model('register', user);
module.exports = user_model;