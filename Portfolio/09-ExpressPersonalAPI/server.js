const express = require("express");
const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// we tell express in wich file we save the views/html
app.set("views", __dirname + '/html');

// Middleware to read de data from the forms(for post and get)
app.use(express.urlencoded({ extended: true }));

// array to greet every user
let namesList = [];

//GET METHODS
// root path to return the index.html file provided | add namesList 
app.get('/', (req, res) => {
    res.render('index', { 
        error: null, 
        name: null,
        names: namesList,
        tasks: taskList
    });
});

//Configure the form at index.html to connect to the GET method of the /greet 
// endpoint and retrieve the value from the form and log the value to console.
// route get for greet - capture the value of the form and show it in console
app.get('/greet', (req, res) => {
    const userName = req.query.name;    // we read the value with query from the url or form
    console.log(userName);

    if(userName){       // save the user names in the arrray
        namesList.push(userName);
        
    }

    res.render('index', { 
        error: null, 
        name: userName, 
        names: namesList, 
        tasks: taskList
    });
});

// route to show the wazzup view
app.get('/wazzup', (req, res) => {
    const selectedName = req.query.name;
    res.render('wazzup', { name: selectedName });
});

// POST METHODS

let taskList = [];

app.post('/task', (req, res) => {
    const newTask = req.body.name;
    if(newTask){
        taskList.push(newTask);     // add the new task to the task list
    }

    res.render('index', {
        error: null,
        name: null,
        names: namesList,
        tasks: taskList
    });
});

// return registered tasks in a json file
app.get('/task', (req, res) => {
    res.json(tasksList);
});

app.listen(3000, () => {
    console.log("Server listening port 3000 ");
});