//const http = require('http');
//const serverHandler = require('./contact');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// app.use(bodyParser.urlencoded());
app.use((req,res,next)=>{
    console.log('first middleware is running', req.url, req.method);
    next();
});
app.use((req,res,next) =>{
    console.log('second middleware is running', req.url, req.method);
    next();
});

app.get("/",(req,res,next)=>{
    console.log('handling / for GET', req.url, req.method);
     res.send(`<p>welcome home </p>`);
    next();
});

app.get("/contact-us",(req,res,next)=>{
    console.log('please is give your details', req.url, req.method);
     res.send(`
        <html>
        <head>
        <body>
        <h1>ENTER DETAILS </h1>
        <form action = "/contact-us" method="POST">
        <input type="text" name="username" placeholder="enter your name"/>
         <input type="text" name="email" placeholder="enter your mail"/>
         <input type="submit" value="submit"/>
         </form>
         </body>
         </head>
         </html>
        `);
    
});
app.post("/contact-us",(req,res,next)=>{
    console.log(' contact first middleware', req.url, req.method, req.body);
     //res.send(`<p>thank you for submission</p>`);
   next();
});

app.use(bodyParser.urlencoded());

app.post("/contact-us",(req,res,next)=>{
    console.log('contact handling / for GET / for contact-us', req.url, req.method, req.body);
     res.send(`<p>thank you for submission</p>`);
   // next();
});



//const server = http.createServer(app);
const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});
