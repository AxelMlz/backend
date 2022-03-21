const express = require('express');
const app = express();
const port = 8000;
const dotenv = require("dotenv");
dotenv.config({
	path: "./config.env",
});
const { Pool } = require("pg");

var authors = [
    {
        name: "Lawrence Nowell",
        nationality: "UK",
        books: ["Beowulf"]
    },
    {
        name: "William Shakespeare",
        nationality: "UK",
        books: ["Hamlet", "Othello", "Romeo and Juliet", "MacBeth"]
    },
    {
        name: "Charles Dickens",
        nationality: "US",
        books: ["Oliver Twist", "A Christmas Carol"]
    },
    {
        name: "Oscar Wilde",
        nationality: "UK",
        books: ["The Picture of Dorian Gray", "The Importance of Being Earnest"]
    },
]

app.get ("/" &&"/authors",(req,res)=> {
    res.send("Authors API")
})

app.get ("/authors/:id",(req,res)=> {
    const id = authors[parseInt(req.params.id)-1];
   let whoAuthors= res.json( `the author is ${id.name}, from ${id.nationality}`);

if(!id){
    res.json({message:`this author do not exist`})
}
res.send(whoAuthors);
})

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