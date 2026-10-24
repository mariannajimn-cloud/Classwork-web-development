// Hello world
console.log("Hello World")

// 'require' tool
const sw = require("star-wars-quotes");
console.log("Star Wars Quotes: ", sw());

// Multiple calls
const superheroes = require("superheroes");
const supervillains = require("supervillains");

const hero = superheroes.randomSuperhero();
const villain = supervillains.randomSupervillain();
console.log(`Epic battle - ${hero} vs ${villain}`);

// read file
const fs = require("fs")
fs.readFile('data/input.txt', 'utf-8', (err, data)=>{
    if(err){    // it catch the error
        console.error("Error reading file: ", err);
        return;
    }
    console.log("Secret message: ", data);
});