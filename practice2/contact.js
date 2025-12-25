const serverHandler = ((req,res)=>{
    console.log(req.url , req.method);
    if(req.url == "/"){
        res.setHeader('context-type', 'text/html');
        res.write(`
            <html>
            <head>
            <body>
            <h1>hello</h1>
            </body>
            </head>
            </html>
            `);
            res.end();
    }
    else{
        res.write(`
            <html>
            <head>
            <body>
            <h1>error</h1>
            </body>
            </head>
            </html>
            `);
    }

});
module.exports = serverHandler;