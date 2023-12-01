const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const express=require("express")
// const app = express();

// Use cookie-parser middleware
// app.use(cookieParser());


// const isAuthenticated=async (req, res,next) =>{
//     try{
//     const token = req.cookies.jwt;
//     console.log("gaurav")

//    const verifyUser=jwt.verify(token,"123456789GauravPatel12345")
//     console.log(verifyUser);
//     next();
//     }
//     catch(error){
//         res.status(401).send(error);
//     }
// next();
    
   
// }
// app.use(isAuthenticated)
module.exports = isAuthenticated;
