const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("index", { author: "Ramin Shamsi", title: "Weather" });
});

app.get("/about", (req, res) => {
  res.render("about", { author: "Ramin Shamsi", title: "About" });
});

app.get("/help", (req, res) => {
  res.render("help", { author: "Ramin Shamsi", title: "Help" });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "Please provide an address" });
  }

  geocode(req.query.address, (error, geocodeData) => {
    if (error) {
      return res.send({ error });
    }
    forecast(
      geocodeData.longitude,
      geocodeData.latitude,
      (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location: geocodeData.location,
          address: req.query.address,
          temperature: forecastData.temperature,
        });
      }
    );
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    error: "Page not found",
    author: "Ramin Shamsi",
    title: "404",
  });
});
app.listen(3000, () => console.log("Server running..."));
