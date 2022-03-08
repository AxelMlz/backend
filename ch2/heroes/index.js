const express = require('express');
const app = express();
const port = 8000;

// var students = [
//     {
//         name: "Lawrence",
//         lastname: "Nowell",
//         nationality: "UK",
//     },
//     {
//         name: "William",
//         lastname: "Shakespeare",
//         nationality: "UK",
//     },
//     {
//         name: "Charles",
//         lastname: "Dickens",
//         nationality: "US",
//     },
//     {
//         name: "Oscar",
//         lastname: "Wilde",
//         nationality: "UK",
//     },
// ]

// app.get ("/" &&"/students",(req,res)=> {
//     res.send("Students API")
// })

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});