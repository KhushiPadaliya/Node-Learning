// let divs = document.querySelectorAll(".box");
// let idx=1;
// for(div of divs){
//     console.log(div.innerText);
//     div.innerText = `new value ${idx}`;
//     idx++;
// }

let btn = document.createElement("button");
btn.innerText = "click me!!";
//console.log(btn.innerHTML);
// btn.style.color = "white";
// btn.style.backgroundColor = "red";
document.querySelector("body").prepend(btn);

let para = document.querySelector("p");
para.classList.add("newClass");
document.querySelector("body").append(para);



// const http = require('http');
// const fs =  require('fs');
// const { buffer } = require('stream/consumers');

// const server = http.createServer((req,res)=>{
//    if(req.url ==="/"){
//      res.setHeader('Content-Type' , 'text/html');
//     res.write('<html>');
//     res.write('<head><title>Complete Coding </title></head>');
//     res.write('<body><h1>Enter Your Details</h1>');

//    res.write('<form action ="/submit-details" method ="POST">');
//     res.write('<input type="text" name="username" placeholder="enter your name" /><br><br>');

//     res.write('<label for="male">Male</label>');
//     res.write('<input type="radio" id="male" name="gender" value="male" />');

//     res.write('<label for="female">Female</label>');
//     res.write('<input type="radio" id="female" name="gender" value="female" />');

//     res.write('<br><br>');
//     res.write('<input type="submit" value="Submit"/>');
//     res.write('</form>');
//     res.write('</body>');
//     res.write('</html>');
//     return res.end();
    
//    }
//    else if(req.url.toLowerCase() ==="/submit-details" && req.method === "POST")
//     {
//      const body = []; 
//     req.on('data' , (chunk)=>{
//         console.log(chunk);
//          body.push(chunk);
//     });
   
//    req.on('end', ()=>{
//     const fullbody = Buffer.concat(body).toString();
//     console.log(fullbody);
//     const param = new URLSearchParams(fullbody);
//     const Objectbody = {};
//     for (const [key,val] of param.entries()){
//         Objectbody[key] = val;
//     }
//     // const Objectbody = Object.fromEntries(param);
//      console.log(Objectbody);
//      fs.writeFileSync('user.txt', JSON.stringify(Objectbody));
//     res.statusCode = 302;
//     res.setHeader('Location' , '/');
//     return res.end();
//    });
   
   
    
//    }
//     res.setHeader('Content-Type' , 'text/html');
//     res.write('<html>');
//     res.write('<head><title>Complete Coding </title></head>');
//     res.write('<body><h1> Hi There!!!</h1></body>');
//     res.write('</html/>');
//     return res.end();
    
    
//     // console.log(req);
//     // process.exit();
// });

