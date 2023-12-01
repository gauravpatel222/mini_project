const express=require('express');
const router=express.Router();
const app=express();
const path = require('path');
const mongoose = require('mongoose');
const seedb=require('./seed');
const recipe_routes=require('./routes/recipe');
const review_routes=require('./routes/review');
const login_routes=require('./routes/login_register');
const User=require('./models/user');
const recipe_schema=require('./models/recipe_schema');
const favourite_schema=require("./models/favourite");
const review_schema=require("./models/review");
const flash = require('connect-flash');


// const protected_routes=require("./

const jwt = require('jsonwebtoken');
// const cookieParser = require("cookie-parser");

const passport = require('passport') ;
const LocalStrategy = require('passport-local')
const session = require('express-session')

// app.use(cookieParser());
mongoose.set('strictQuery' , true); 
mongoose.connect('mongodb://127.0.0.1:27017/miniproject') 
.then(()=>{console.log("DB CONNECTED")})
.catch((err)=>{console.log("error in DB" , err)})
// const isAuthenticated=require('./routes/isAuthenticated');
// app.use(isAuthenticated);

app.set('view engine' , 'ejs')
app.set('views' , path.join(__dirname , 'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true})) 

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true ,
   // cookie : {
     //   httpOnly: true ,
      //  expires : Date.now() + 24*60*60*7*1000,
      //  maxAge : 24*60*60*7*1000
   // }
}))
app.use(flash());

app.use(passport.initialize()) ;
app.use(passport.session()) ;
passport.serializeUser(User.serializeUser()) ;
passport.deserializeUser(User.deserializeUser()) ;


// // middleware for every page
// app.use((req,res,next)=>{
//     res.locals.currentUser = req.user;
//     // res.locals.success = req.flash('success');
//     // res.locals.error = req.flash('error');
//     next();
// })
// middleware for every page
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
     res.locals.success = req.flash('success');
     res.locals.error = req.flash('error');
    next();
})

// passport middleware
passport.use(new LocalStrategy(User.authenticate()));

// app.use(methodOverride('_method'))
const seedDB = require('./seed');
// app.use(recipe_schema);
const protected_routes=require("./routes/protectedroute");
seedDB();
app.use(protected_routes);
app.use(recipe_routes);
app.use(login_routes);
app.use(review_routes);
// app.use(user_authentication)





app.get('/',(req,res)=>{
    console.log('called');
    res.render("first");
});




const port=8080;
app.listen(port,()=>{
    console.log(`server connected at ${port}`);
})          