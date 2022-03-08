const express = require('express');
const app = express();
const port = 8000;

var students = [
    {
        name: "Lawrence",
        lastname: "Nowell",
        nationality: "UK",
    },
    {
        name: "William",
        lastname: "Shakespeare",
        nationality: "UK",
    },
    {
        name: "Charles",
        lastname: "Dickens",
        nationality: "US",
    },
    {
        name: "Oscar",
        lastname: "Wilde",
        nationality: "UK",
    },
]

app.get ("/" &&"/students",(req,res)=> {
    res.send("Students API")
})

app.get ("/authors/:id",(req,res)=> {
    const id = authors[parseInt(req.params.id)-1];
   let whoAuthors= res.json( `the author is ${id.name}, from ${id.nationality}`);

if(!id){
    res.json({message:`this student do not exist`})
}
res.send(whoAuthors);
})

res.send(whichBook)


app.listen(port, () => {
  console.log('Server started on port: ' + port);
});