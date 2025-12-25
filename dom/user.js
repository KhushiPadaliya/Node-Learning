const http = require('http');
const express = require('express');
const requestHandler = require('./app');
const app = express();
app.use((req,res,next)=>{
    console.log("came in first middleware", req.url , req.method);
    next();
})

app.use((req,res,next)=>{
    console.log("came in second middleware", req.url , req.method);
    res.send("<p>right</p>");
})

//const server = http.createServer(app);


const PORT = 3001;
server.listen(PORT , ()=>{
    console.log(`server running on address http://localhost:${PORT}`);
});  