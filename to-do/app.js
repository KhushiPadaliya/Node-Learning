const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

var list = [];
//app.use(express.json());

app.get("/",(req,res)=>{
    res.send(`
        <h1>TO-DO LIST</h1>
        <h4>Enter your task</h4>
        <form action = "/add" method = "POST">
        <input type = "text" name ="task" placholder = "enter task"/><br><br>
        <input type = "submit"/>
        </form>
        `);
});

app.post("/add",(req,res)=>{
    console.log(req.body);
    var take = req.body.task;
    if(take == ""){
        res.send("empty, add task");
    }
    else{
        list.push(take);
        console.log(list);
        res.send(`
            <h3>Task added successfully!!!!!!!</h3>
            `);
    }
});
app.get("/show",(req,res)=>{
    res.send(list);
})





const PORT = 3000;
app.listen(PORT,() =>{
    console.log(`server is running on http://localhost:${PORT}`);
})
