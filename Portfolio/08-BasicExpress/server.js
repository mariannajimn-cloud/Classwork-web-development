const express = require("express");

const app = express();
// receive information from incoming requests: request body
// body-parser
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Make the root path to return the index.html file
//route get: when you enter to the root "/" from browser, we sent the index
app.get('/', (req, res) =>{
    res.sendFile(__dirname + "/index.html");    // give us the path to the local root
});

// 4. route post: when the user click calculate, we will capture the info here
app.post('/', (req, res) => {
    // convert text to number data
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);

    //  BMI formula
    var bmi = (weight / (height * height)) * 10000;

    // response the final result; toFixed 2 decimals
    res.send(`Your BMI is: ${bmi.toFixed(2)}`);
});

app.listen(3000, ()=>{
    console.log("App listening to port 3000");
});

