const sumRequestHandler = require('./sum');
const requestHandlers = ((req, res)=>{
     console.log(req.url , req.method);
      if(req.url ==="/")
    {
        res.setHeader('Content-Type' , 'text/html');
        res.write('<html>');
        res.write('<body>');
        //res.write('<title>CALCULATOR</title>');
        res.write('<h1>WELCOME HOME</h1>');
        res.write('<nav>');
        res.write('<li><a href = "/calculator">Calculator Page </a></li>');
        res.write('</nav>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    else if(req.url.toLowerCase()==="/calculator"){
        console.log("welcome to calculator page");
        res.setHeader("Content-Type", "text/html");
        res.write('<html>');
        res.write('<body>');
        res.write('<h1>WELCOME CALCULATOR PAGE</h1>');
        res.write('<h2>ADD TWO NUMBERS</h2>');
        res.write('<form action = "calculate-result" method="POST">');
        res.write('<input type = "text" name = "num1" placeholder = "enter a first number"<br><br><br>');
        res.write('<input type = "text" name = "num2" placeholder = "enter a second number"<br><br><br>');
        //res.write('<button onclick = "addNumbers()">ADD</button>');
        res.write('<input type="submit" value="sum"/>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }
   
    else if(req.url.toLowerCase()==="/calculate-result" && req.method==='POST'){
        return sumRequestHandler(req , res);
     
    }
    else{
        res.setHeader('Content-Type' , 'text/html');
        res.write('<html>');
        res.write('<body>');
        res.write('<h2>something is going wrong</h2>');
        res.write('<a href = "/">GO BACK</a>');
        res.write('</body>');
        res.write('</html>');
    }
   
});

module.exports = requestHandlers;

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`server running on http://localhost:${PORT}`);
// });

// const http = require("http");

// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method);

//     if (req.url === "/calculator") {
//         //console.log("Welcome to calculator page");
//         res.setHeader("Content-Type", "text/html");
//         res.write("<html>");
//         res.write("<body>");
//         res.write("<h1>Welcome to Calculator Page</h1>");
//         res.write("</body>");
//         res.write("</html>");
//         return res.end();
//     }

//     if (req.url === "/") {
//         res.setHeader("Content-Type", "text/html");
//         res.write("<html>");
//         res.write("<body>");
//         res.write("<h1>WELCOME HOME</h1>");
//         res.write("<nav>");
//         res.write('<li><a href="/calculator">Calculator Page</a></li>');
//         res.write("</nav>");
//         res.write("</body>");
//         res.write("</html>");
//         return res.end();
//     }

//     res.end("404 Page Not Found");
// });

// const PORT = 3000;
// server.listen(PORT, () => {
//     console.log(`server running on http://localhost:${PORT}`);
// });
