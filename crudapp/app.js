const express = require("express")
const user = require('./user');

const app = express()
app.use(express.urlencoded({ extended: true }));
//app.use(express.json())
let list = [];
app.get('/get_user_by_id/:id',(req,res)=>{
   const id = req.params.id;
    
   for(let i=0; i<list.length; i++){
    console.log(list[i].get())
     if(list[i].get().id == id){
        res.send(list[i].get());
     }
   }
   res.send(`user not found with this ${id}`);
})

app.get("/",(req,res)=>{
    res.send(`<form action="add_user" method= "POST" >
        <input name="name"  placeholder="name" /><br>
         <input name="email"  placeholder="email" /><br>
          <input name="id"  placeholder="id" /><br>
          <input type = "submit"/>
        </form>`)
})
app.post('/add_user' , (req,res)=>{
    const body = req.body;
    list.push(new user(body.name , body.email , body.id));
    res.send(`${body.name + " " + body.email + " " + body.id}  is added successfully`);
})





app.listen(3000,()=>{
    console.log("server started at PORT 3000")
})