const mongoose = require("mongoose");

const heroesSchema = new mongoose.Schema({
    heroName: {
        type: String,
        required: true,
        unique: true,
        maxLength: 30,
    },
    power: {
        type: Array,
        required: true,
    },
    color: {
        type: String,
        required: true,
        maxLength: 30,
    },
    isAlive: Boolean,
    age: Number,
})

const Heroes = mongoose.model("Heroes", heroesSchema);

// exporter le modèle
module.exports = Heroes;