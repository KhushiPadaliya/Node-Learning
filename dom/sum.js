const sumRequestHandler = (req,res)=>{
    console.log("in sum request handler",req.url);
    const body = [];
    req.on('data' , chunk =>{
        console.log(chunk);
        body.push(chunk); 
    });
    req.on('end' , ()=>{
        const bodyStr = Buffer.concat(body).toString();
        console.log(bodyStr);
        const param = new URLSearchParams(bodyStr);
       // const bodyObj = {};
      //  for()
       const bodyObj = Object.fromEntries(param);
        const result = parseInt(bodyObj.num1) + parseInt(bodyObj.num2);
        console.log(bodyObj);
        console.log(result);
        if(result>=0){
              res.setHeader('Content-Type' , 'text/html');
              res.write(`
                <html>
                <body>
                <h1>the resul is ${result}</h1>
                </body>
                </html>
                `);
        }
        res.end();
    });
}
module.exports = sumRequestHandler;