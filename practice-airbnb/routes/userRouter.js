
const path = require('path');
const express = require('express');
const userRouter = express.Router();


userRouter.get("/",(req,res,next)=>{
    console.log(req.url , req.method);
    let pat = path.join(__dirname,'../','views','home.html');
    res.sendFile(pat);
});
module.exports = userRouter;