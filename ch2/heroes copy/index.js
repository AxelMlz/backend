const express = require('express');
const app = express();
const port = 8001;
app.use(express.json());
const mongoose = require("mongoose");
const Heroes = require("./models/heroesModel")
// let heroes = 
// [
//     {
//         name: "Iron Man",
//         power: ["money"],
//         color: "red",
//         isAlive: false,
//         age: 46,
//         image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
//     },
//     {
//         name: "Thor",
//         power: ["electricity", "worthy"],
//         color: "blue",
//         isAlive: true,
//         age: 300,
//         image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
//     },
//     {
//         name: "Daredevil",
//         power: ["blind"],
//         color: "red",
//         isAlive: true,
//         age: 30,
//         image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
//     },
//     {
//         name: "Venom",
//         power: [
//             "Alien symbiosis",
//             "king of Klyntars/symbiotes"
//         ],
//         color: "black",
//         isAlive: true,
//         age: "",
//         image: "none"
//     }
// ]

mongoose
	.connect(
		"mongodb+srv://axel_mlz:pMAywTH8XDi7JUf@database-backend.4wob9.mongodb.net/database-backend?retryWrites=true&w=majority",
		{
			useNewUrlParser: true,
		}
	)
	.then(() => console.log("Connected to MongoDB"));


// Middleware activated by every request
function debug( req, res, next){
    console.log("requête reçue");
    next()
}
// Middleware to lowercase
function transformName(req, _res, next) {
	if (req.body.name) {
		req.body.name = req.body.name.toLowerCase();
	}
	next();
}
// Middleware 
function findHero(req, _res, next) {
	const hero = superHeros.find((hero) => {
		// Iron Man -> iron man -> iron-man
		return (
			req.params.name.toLowerCase().replace(" ", "-") ===
			hero.name.toLowerCase().replace(" ", "-")
		);
	});
    req.hero = hero;
	next();
}

// Get - Name of the API
app.get ("/",debug, transformName,(req,res)=> {
    res.send("Heroes API")
})
// GET - Display the list of Heroes
app.get ("/heroes", debug, transformName, async (req,res)=> {
	try {
		heroes = await Heroes;
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			message: "An error happened",
		});
	}

	res.json(heroes);
 })

 // GET - get a Hero from the list
 app.get ("/heroes/:name", debug, transformName, async (req, res)=>{
    try {heroes = await Postgres.query("SELECT * FROM heroes WHERE LOWER(name)=$1", [req.params.name]);
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			message: "An error happened",
		});
	}
    res.json(heroes.rows)
 })

 // POST - Add more Heroes
app.post ("/heroes", debug, async (req, res)=>{
    try{ await Heroes.create(req.body)
		res.json(Heroes);
	}catch{res.status(201).json({
        message: "User created",
    })};
})
    

// PATCH - Add Powers to a Hero
app.patch ("/heroes/:name", debug, transformName, async (req, res)=>{
    try {heroes = await Postgres.query("INSERT INTO heroes (powers) VALUES($1)", [req.body.power], [req.params.name]);
} catch (err) {
    console.log(err);

    return res.status(400).json({
        message: "An error happened",
    });
}
    console.log()
    res.send("power added");
})

// GET - Powers from the Name
app.get ("/heroes/:name/powers", debug, transformName, async(req, res)=>{
    try {heroes = await Postgres.query("SELECT * FROM heroes WHERE LOWER(name)=$1", [req.params.name]);
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			message: "An error happened",
		});
	}
    res.json(heroes.rows[0].power)
 })

// app.get ("/heroes/:name/powers", debug, transformName, (req, res)=>{
//     const powers = req.params.power
//     let matchHeroes = heroes.find(()=>{
//         return(
           
//             req.params.name.toLocaleLowerCase()
//             === matchHeroes.name.toLocaleLowerCase()
//             // res.send(heroes)
//         );
//     });
//     if (!matchHeroes) {
//         return res.json({
//           message: "This hero does not exist",
//         });
//       }
//     res.json(hero.power);
//       res.send("Power added!");
//     });
    
 

// app.patch (`/heroes/:name/powers`, debug, transformName, (req, res)=>{
//    let matchHeroes = heroes.find(()=>{
//        return(
//         req.params.name.toLocaleLowerCase()
//         === matchHeroes.name.toLocaleLowerCase()
           
//        )
//    })
//    if (!matchHeroes) {
//     return res.json({
//       message: "This hero does not exist",
//     });
//   }
//   heroes.power.push(req.body.power);
//   res.send("Power added!");
// });

app.get("*", (req, res) => {
    res.status(404).send("Did not found the info");
  });

 app.listen(port, () => {
    console.log('Server started on port: ' + port);
  });