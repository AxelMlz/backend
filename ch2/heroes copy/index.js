const express = require('express');
const app = express();
const port = 8001;
app.use(express.json());
const mongoose = require("mongoose");
const Heroes = require("../../heroes/src/models/heroesModel")
// let heroes = 
// [
    // {
    //     name: "Iron Man",
    //     power: ["money"],
    //     color: "red",
    //     isAlive: false,
    //     age: 46,
    //     image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
    // },
    // {
    //     name: "Thor",
    //     power: ["electricity", "worthy"],
    //     color: "blue",
    //     isAlive: true,
    //     age: 300,
    // },
    // {
    //     "heroName": "Daredevil",
    //     "power": ["blind"],
    //     "color": "red",
    //     "isAlive": true,
    //     "age": 30
    // },
    // {
    //     name: "Venom",
    //     power: [
    //         "Alien symbiosis",
    //         "king of Klyntars/symbiotes"
    //     ],
    //     color: "black",
    //     isAlive: true,
    //     age: "",
    // }
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
		req.body.name = req.body.name.toLowerCase().replace(" ", "-");
	}
	else if (req.params.name) {
		req.params.name = req.params.name.toLowerCase().replace(" ", "-");
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
		let heroes= await Heroes.find();
		res.json(heroes);
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			message: "An error happened",
		});
	}


 })

 // GET - get a Hero from the list
 app.get ("/heroes/:name", debug, transformName, async (req, res)=>{
    try {
		let heroes = await Heroes.findOne({heroName : req.params.name})
		res.json(heroes)
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			message: "An error happened",
		});
	}
 })

 // POST - Add more Heroes
// app.post ("/heroes", debug, async (req, res)=>{
//     try{ await Heroes.create(req.body)
// 		res.json(Heroes);
// 	}catch{res.status(400).json({
//         message: "An error happened"})
//     }zeh
// 	;
// })

 // POST - Add more Heroes
app.post ("/heroes", debug, async (req, res)=>{
    try{
		await Heroes.create(req.body)
		res.json(Heroes)
	}catch{res.status(400).json({
        message: "An error happened"});
}})
    

// PATCH - Add Powers to a Hero
app.patch ("/heroes/:id", debug, transformName, async (req, res)=>{
    try {
		let heroes = await Heroes.updateOne({_id : req.params.id}, { $push: { power: req.body.power } 
	});
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			message: "An error happened",
		});
	}
    res.send("power added");
})

// DELETE - Delete a Hero
app.delete ("/heroes/:id", debug, async (req, res)=>{
    try {
		let heroes = await Heroes.deleteOne({_id : req.params.id})
		console.log ("Hero blipped");
		res.json(heroes)
} catch (err) {
    console.log(err);

    return res.status(400).json({
        message: "An error happened"
    });
}
})

// GET - Powers from the Name
app.get ("/heroes/:name/powers", debug, async(req, res)=>{
	console.log(req.params.name)
    try {
		let heroes = await Heroes.findOne({ heroName :req.params.name});
		res.json(heroes.power)
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			message: "An error happened",
		});
	}
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