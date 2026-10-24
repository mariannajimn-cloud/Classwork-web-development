import express from 'express';
// const express = require('express');
import axios from "axios";


const app = express();
app.use(express.json());  // Middleware

const scientists = [
    { id: 1, name: "Dr. Elena Rostova", department: "Climate", projects: 4 },
    { id: 2, name: "Prof. Marcus Vance", department: "Oceanography", projects: 2 },
    { id: 3, name: "Dr. Aisha Khan", department: "Climate", projects: 7 }
];

const initiatives = [];

app.get('/', (req, res) => {
  res.send(`
  <div class="card-response">
    <h3>¡Registro exitoso!</h3>
    <p>Hemos procesado tu solicitud correctamente. Revisa tu correo electrónico para verificar tu cuenta.</p>
    <span class="status-badge success">Estado: Activo</span>
    </div>);
    `);
});

// greet?name=**&city=**
app.get('/greet', (req, res) => {
    const {name, city } = req.query;
    res.send(`Hello ${name}, how is the weather in ${city}`);
});

// /api/scientists?dept=**
app.get('/api/scientists', (req, res) => {
    const {dept} = req.query;   // way of gettig the values, it is called destructuring
    if(dept){
    /*const result = [];
    for(const scientists of scientists){
      if(scientists.department === dept)
        result.push(scientists);
    }
    return result;*/
    const result = scientists.filter((scientists) => scientists.department.toLowerCase() === dept.toLowerCase());
    if(result && result.length > 0) {
      return res.json({
        deptScientists: result,
        dept,
        count: result.length,
      });
    } else {
      return res.json({errorMsg: `No results for department ${dept}`, dept});
    }
  } 
  return res.json({deptScientists: scientists, count: scientists.length});
});

// /api/scientists/:id
app.get("/api/scientists/:id/profile/:keyword", (req, res) => {
  const scientistsId = parseInt(req.params.id, 10);
  const {keyword} = req.params;
  const scientists = scientists.find((scientists) => scientists.id === scientistsId);
  if(!scientists){
    return res.json({success: false, errorMsg: "No scientist found"});
  }
  res.json({
    success: true,
    data: scientists,
  });
});

app.get("/api/initiatives", (req, res) => {
  res.json({initiatives, status: "OK"});
});

app.post("/api/initiatives", (req, res) => {
  const { title, budget, department } = req.body;
  const initiative = { title, budget, department};
  initiative.push(initiative);
  res.json({title, budget, department, status: "OK"});
});

app.get('/about', (req, res) => {
  res.send('This is my WebApp Class project');
});

app.post('/about', (req, res) => {
  res.send('This is my WebApp Class project, but secure');
});

app.get("/weatherGDL", async (req, res) => {
  const respString = await getWeatherFrom(20.6597)
  const apiUrl= "https://api.open-meteo.com/v1/forecast?latitude=20.6597&longitude=-103.349&current_weather=true";
  const response = await axios(apiUrl);
  const currentWeather = response.data;
  console.log(currentWeather);
  res.send(
    `In Guadalajara, the current temp is ${currentWeather.current_weather.temperature} C`,
  );
});

app.get("/weatherLNS", async (req, res) => {
  const apiUrl= "https://api.open-meteo.com/v1/forecast?latitude=46.52&longitude=-103.349&current_weather=true";
  const response = await axios(apiUrl);
  const currentWeather = response.data;
  console.log(currentWeather);
  res.send(
    `In Guadalajara, the current temp is ${currentWeather.current_weather.temperature} C`,
  );
});

// class 06 oct
app.get("/weatherGDL", async (req, res) => {
  const respString = await getWeatherFrom(20.6597, -103.349, "Guadalajara");
  res.send(respString);
});

app.get("/weatherLSN", async (req, res) => {
  const respString = await getWeatherFrom(46.52, 6.63, "Lausanne");
  res.send(respString);
});

const cities = {
  GDL: { lat: 20.6597, lon: -103.349, name: "Guadalajara" },
  LNS: { lat: 46.52, lon: 6.63, name: "Lausanne" }
};

/*
app.get("/weather/:city", async (req, res) => {
  try {
    const {city} = req.params;
    const {lat, lon} = cities[city];
    const respString = await getWeatherFrom(lat, lon, city);
    res.send(respString);
  } catch (error) {
    console.error(error);
    if(error.message === "City code is required") {
      res.status(400).send("City code is required")};
  }
  res.status(500).send("Unknown error");
});
*/




app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});