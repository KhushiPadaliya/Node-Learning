const path = require('path');
const express = require('express');
const hostRouter = express.Router();

hostRouter.get("/add-home" ,(req,res,next)=>{
    console.log(req.url , req.method);

    // res.send(`
    //     <h1>REGISTER YOUR HOME</h1>
    //     <form action = "/host/add-home" method="POST">
    //     <input type = "text" name="housename" placeholder="enter name of house"/>
    //     <input type = "submit"/>
    //     </form>
    //     `);
    const pat = path.join(__dirname , '../','views','addHome.html');
    res.sendFile(pat);
});
hostRouter.post("/add-home", (req,res,next)=>{
    console.log(req.url , req.method);
    console.log(req.body);
    res.send(`
        <h1>your registered home name is :  ${req.body.housename + ' and price is : ' + req.body.price} </h1>
        <a href = "/">go home</a>
        `)
})

module.exports = hostRouter;