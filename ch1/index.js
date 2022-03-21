const express = require('express');
const app = express();
const port = 8000;
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});
const { Pool } = require("pg");
const Postgres = new Pool({ ssl: { rejectUnauthorized: false } });

// var authors = [
//     {
//         name: "Lawrence Nowell",
//         nationality: "UK",
//         books: ["Beowulf"]
//     },
//     {
//         name: "William Shakespeare",
//         nationality: "UK",
//         books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"]
//     },
//     {
//         name: "Charles Dickens",
//         nationality: "US",
//         books: ["Oliver Twist", "A Christmas Carol"]
//     },
//     {
//         name: "Oscar Wilde",
//         nationality: "UK",
//         books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"]
//     },
// ]

app.get ("/authors", async (req,res)=> {
    let authors;
	try {
		authors = await Postgres.query("SELECT * FROM authors");
	} catch (err) {
		console.log(err);

		return res.status(400).json({
			message: "An error happened",
		});
	}

	res.json(authors.rows);
});

app.get ("/authors/:id", async (req,res)=> {
    // const id = authors[parseInt(req.params.id)-1];
    let authors;
    try {
        authors = await Postgres.query(
			`SELECT * FROM authors WHERE authors.author_id=$1`,
			[req.params.id]
		);
	} catch (err) {
		return res.status(400).json({
			message: "An error happened. Bad data received.",
		});
	}
    res.json(authors.rows)})

    // authors = await Postgres.query(
    //     "SELECT * FROM authors WHERE authors.author_id=$1", [req.params.id]
    //     );
    //     console.log (authors);
//    let whoAuthors= res.json( `the author is ${id.name}, from ${id.nationality}`);

// if(!req.params.id){
//     res.json({message:`this author do not exist`})
// }})
// res.send(whoAuthors);
// 

app.get ("/authors/:id/books",(req,res)=> {
    const id = authors[parseInt(req.params.id)-1];
    if(id.books.length > 1){
     let whichBook = res.json( `the books are ${id.books}`)
    }else {let whichBook =res.json( `the book is ${id.books}`)};
if(!id){
    return res.json(`this book/s do not exist`)
}
res.send(whichBook)
})

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});