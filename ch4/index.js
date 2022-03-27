const express = require('express');
const app = express();
const port = 8000;


//Middleware activated by every request
function debug( req, res, next){
    console.log("requête reçue");
    next()
}

//Router
const usersRouter = require("./routers/usersRouter")

//Name of the API
app.get ("/",debug,(req,res)=> {
    res.send("Validation")
})

app.post ("/users", debug,(req,res)=> {
    res.json(heroes);
 })

 app.get ("/users/:username", debug, (req, res)=>{
    const hero = heroes.find((supes) =>{
        return supes.name === req.params.name
    })
    res.send(hero)
 })

app.get ("/heroes/:name/powers", debug, (req, res)=>{
    const powers = 
    // res.json(`${heroes.power}`)
    res.send(powers)
})

 app.listen(port, () => {
    console.log('Server started on port: ' + port);
  });