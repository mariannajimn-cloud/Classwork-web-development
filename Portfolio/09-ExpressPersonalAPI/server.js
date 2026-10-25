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
        tasks: tasksList
    });
});


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
        tasks: tasksList
    });
});

// ROUTE WITH ERROR HANDLING AND 'NEXT':
// Route to show the wazzup view profile
// If invalid, calls next() to render the index page with an error message.
app.get('/wazzup', (req, res, next) => {
    const index = parseInt(req.query.index);
    
    // Check if index is within valid range
    if (!isNaN(index) && index >= 0 && index < namesList.length) {
        const selectedName = namesList[index];
        res.render('wazzup', { name: selectedName });
    } else {
        next(); // Forward to the error handler middleware below
    }
}, (req, res) => {
    // Error handler: outputs error message in the index page
    res.render('index', { 
        error: "Error: Index out of range!", 
        name: null, 
        names: namesList, 
        tasks: tasksList 
    });
});

// POST METHOD

let tasksList = [];

app.post('/task', (req, res) => {
    const newTask = req.body.task;
    if(newTask){
        tasksList.push(newTask);     // add the new task to the task list
    }
    res.redirect('/');

});

// receives a name as a parameter in the URL, adds it to the list, and returns JSON response
// postman
app.put('/greet/:name', (req, res) => {
    const nameParam = req.params.name;
    if (nameParam) {
        namesList.push(nameParam);
    }
    res.json(namesList);
});

// return registered tasks in a json file
app.get('/task', (req, res) => {
    res.json(tasksList);
});

// routhe to delete item
app.get('/task/delete', (req, res) => {
    const index = parseInt(req.query.index);
    if (!isNaN(index) && index >= 0 && index < tasksList.length) {
        tasksList.splice(index, 1); // deletes one element in the posisicon index
    }
    res.redirect('/');
});

//nota - isNaN: evaluates if is NOT a number
// routhe to move task up
app.get('/task/up', (req, res) => {
    const index = parseInt(req.query.index);
    if (!isNaN(index) && index > 0 && index < tasksList.length) {
        // swap the elements with the one on the top
        const temp = tasksList[index];
        tasksList[index] = tasksList[index - 1];
        tasksList[index - 1] = temp;
    }
    res.redirect('/');
});

// routhe to move task down
app.get('/task/down', (req, res) => {
    const index = parseInt(req.query.index);
    if (!isNaN(index) && index >= 0 && index < tasksList.length - 1) {
        // swap with the task below
        const temp = tasksList[index];
        tasksList[index] = tasksList[index + 1];
        tasksList[index + 1] = temp;
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server listening port 3000 ");
});