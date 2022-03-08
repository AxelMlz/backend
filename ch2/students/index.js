const express = require('express');
const app = express();
app.use(express.json());
const port = 8000;

var students = [
    {
        firstname: "Lawrence",
        lastname: "Nowell",
        nationality: "UK",
    },
    {
        firstname: "William",
        lastname: "Shakespeare",
        nationality: "UK",
    },
    {
        firstname: "Charles",
        lastname: "Dickens",
        nationality: "US",
    },
    {
        firstname: "Oscar",
        lastname: "Wilde",
        nationality: "UK",
    },
]

app.get ("/",(req,res)=> {
    res.send("Students API")
})

app.get ("/students",(req,res)=> {
    res.json(students);
 })

// if(!id){
//     res.json({message:`this student do not exist`})
// }
//
app.post ("/students",(req, res) =>{
    students.push({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        nationality: req.body.nationality,
    })
res.send(students)
})

app.listen(port, () => {
  console.log('Server started on port: ' + port);
});