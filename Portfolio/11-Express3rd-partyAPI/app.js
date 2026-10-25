const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const axios = require("axios");
const FormData = require("form-data");

const app = express();

// configuration api
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set("views", __dirname);
app.use(express.urlencoded({ extended: true }));

const API_KEY = "a2a44672a7de63b98059938c3fa7661c";

/*
// https get
app.get("/", (req, res) => {
  var url = "https://placekitten.com/g/300/300";
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data", (data) => {
      res.write(data);
      res.send();
    });
  });
});

// https post
app.get("/dictionary", (req, res) => {
  var url = "https://api.toys/api/check_dictionary";
  const form_data = new FormData();
  form_data.append("text", "marry");
  const options = {
    method: "POST",
    headers: form_data.getHeaders(),
  };
  var soapRequest = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      response
        .on("data", (data) => {
          var jsonResp = JSON.parse(data);
          console.log(jsonResp);
          res.send("Success");
        })
        .on("error", (e) => {
          res.send("Error ${e.message}");
        });
    } else {
      res.send("Error");
    }
  });
  form_data.pipe(soapRequest);
});

// axios post
app.get("/temp", (req, res) => {
  var url = "https://api.toys/api/check_dictionary";
  const form_data = new FormData();
  form_data.append("text", "marry");
  axios
    .post(url, form_data, { headers: form_data.getHeaders() })
    .then((response) => {
      var data = response.data;
      console.log(data);
      if (!data.hasOwnProperty("error")) {
        console.log("no error");
        res.send("Success");
      } else {
        console.log("Fail");
        res.send("Fail");
      }
    })
    .catch((err) => {
      console.log(err.code + ": " + err.message);
      console.log(err.stack);
      res.send("Fail error");
    });
});
*/

// weather api routhes
app.get("/", (req, res) => {
  res.render("index", { error: null });
});

// --- Handle the form post, grab weather data, and show results ---
app.post("/weather", (req, res) => {
  const cityName = req.body.cityName;

  //  check if the user typed something
  if (!cityName) {
    return res.render("index", { error: "Oops! Please type a city name." });
  }

  // Build the OpenWeatherMap URL 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`;

  // Hit the external API using good old https.get
  https.get(url, (response) => {
    let rawData = "";

    response.on("data", (chunk) => {
      rawData += chunk;
    });

    // Stream is done, parse the JSON and display everything
    response.on("end", () => {
      try {
        const weatherData = JSON.parse(rawData);

        // Check if the API threw an error (like a wrong city name or bad key)
        if (weatherData.cod !== 200) {
          return res.render("index", { 
            error: `Oopsie: ${weatherData.message || "Couldn't grab the weather data"}` 
          });
        }

        // Pulling out the temperature, description, and icon code
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const iconCode = weatherData.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Render a  response page with celsius temp, icon, description, and a back link
        res.send(`
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <title>Weather in ${weatherData.name}</title>
          </head>
          <body>
              <h1>Weather in ${weatherData.name}</h1>
              <h2>Temperature: ${temp} °C</h2>
              <p>Description: <strong>${description}</strong></p>
              <img src="${iconUrl}" alt="${description}">
              <br><br>
              <a href="/">Back to Home</a>
          </body>
          </html>
        `);

      } catch (err) {
        res.render("index", { error: "Yikes, failed to parse the weather data." });
      }
    });

  }).on("error", (e) => {
    res.render("index", { error: "Network glitch connecting to OpenWeatherMap." });
  });
});


app.listen(3000, () => {
  console.log("Listening to port 3000");
});
