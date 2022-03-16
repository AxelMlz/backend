const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();
const upload = multer({ dest: "public" });
const port = 8000;

app.use(express.json());
app.use(express.static("public"));

app.use((_req, _res, next) => {
  console.log("Request received.");
  next()
});

app.post ('/user', upload.single(), (req, res) =>{

})

 app.listen(port, () => {
    console.log('Server started on port: ' + port);
  });