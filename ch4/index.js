const express = require('express');
const app = express();
const port = 8000;

var heroes = 
[
    {
        name: "Iron Man",
        power: ["money"],
        color: "red",
        isAlive: false,
        age: 46,
        image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
    },
    {
        name: "Thor",
        power: ["electricity", "worthy"],
        color: "blue",
        isAlive: true,
        age: 300,
        image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
    },
    {
        name: "Daredevil",
        power: ["blind"],
        color: "red",
        isAlive: true,
        age: 30,
        image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
    }
]
//Middleware activated by every request
function debug( req, res, next){
    console.log("requête reçue");
    next()
}
//Name of the API
app.get ("/",debug,(req,res)=> {
    res.send("Heroes API")
})

app.get ("/heroes", debug,(req,res)=> {
    res.json(heroes);
 })

 app.get ("/heroes/:name", debug, (req, res)=>{
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