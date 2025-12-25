const http = require('http');
//const fs = require('fs');
const express = require('express');
const serverHandle = require('./server');
const app = express();
app.use((req , res , next )=>{
    console.log("came in first middleware" , req.url , req.method);
    next();
});

app.use((req , res , next )=>{
    console.log("came in second middleware" , req.url , req.method);
    res.send("<p>welcome to complete coding</p>");
});
const server = http.createServer(serverHandle);
const PORT = 3001;
server.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
});
