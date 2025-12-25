const http = require('http');
const server = http.createServer((req,res)=>{
        console.log(req.url , req.method);


        if(req.url === '/home'){
            res.write('<h1>welcome to home </h1>')
        }
        else if(req.url === '/men'){
            res.write('<h1>Men collection</h1>');
        }
        else if(req.url ==='/women'){
            res.write('<h1>Women collection</h1>');
        }
        else if (req.url ==='/kid'){
            res.write('<h1>Kid collection </h1>');
        }
        else{
        res.setHeader('context-type' , 'text-html');
        res.write('<html>');
        res.write('<body>');
        res.write('<nav>');
        res.write('<ul>');
        res.write('<li><a href = "/home">Home</a></li>');
        res.write('<li><a href = "/men">Men</a></li>');
        res.write('<li><a href = "/women">Women</a></li>');
        res.write('<li><a href = "/kid">kid </a></li>');
        res.write('</ul>');
        res.write('</nav>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
        }
  
});
const PORT = 3001;
server.listen(PORT, ()=>{
    console.log(`server running on address http://localhost:${PORT}`);

});