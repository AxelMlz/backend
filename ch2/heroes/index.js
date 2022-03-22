const express = require('express');
const app = express();
const port = 8001;
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });
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
		heroes = await Postgres.query("SELECT * FROM heroes");
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			message: "An error happened",
		});
	}

	res.json(heroes.rows);
 })

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

 // POST - Add more Heores
app.post ("/heroes", debug, transformName, async (req, res)=>{
    try {heroes = await Postgres.query("INSERT INTO heroes(name, power, color, living, age) VALUES($1, $2, $3, $4, $5)");
} catch (err) {
    console.log(err);

    return res.status(400).json({
        message: "An error happened",
    });
}
    console.log("hero added")
    res.json(heroes.rows);
})

app.get ("/heroes/:name/powers", debug, (req, res)=>{
    try {heroes = await Postgres.query("SELECT name FROM heroes WHERE LOWER(name)=$1", [req.params.name]);
} catch (err) {
    console.log(err);

    return res.status(400).json({
        message: "An error happened",
    });
}
res.json(heroes.rows.powers)
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