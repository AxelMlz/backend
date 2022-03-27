const express = require("express");
const router = express.Router();
const Joi = require("Joi");

const schema = Joi.object({
    username: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    age: Joi.number().min(10).required(),
    city: Joi.string().required(),
})
res.send((req, res)=>{

})
const users = [
    {
        username: "Axel",
        email: "Axel_m@gmail.com",
        age: 22,
        city: "Paris",
    }
]