const express = require("express");
const path = require("path");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const weather_stack = require("./utils/weather_stack.js");

const app = express();
const port = process.env.PORT || 3000;

console.log(__dirname);

const publicdirectorypath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const PartialPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(PartialPath);

app.use(express.static(publicdirectorypath));

app.get("", (req, res) => {
  res.render("index", {
    name: "Parikshit",
    Detail: "Weather-Fly",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Parikshit",
    title: "About",
  });
});

// app.get("", (req, res) => {
//   res.send("Hello There!");
// });

// app.get("/help", (req, res) => {
//   res.send("<h1>Help Page!</h1>");
// });

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      message: "You must provide the address",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      weather_stack(latitude, longitude, (error, weather_response) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location: location,
          forecast: weather_response,
        });
      });
    }
  );
});

app.get("/about/*", (req, res) => {
  res.render("error", {
    type: "Not extension of about page",
    name: "Parikshit",
    title: "Error",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    type: "404 Page Not Found",
    name: "Parikshit",
    title: "Error",
  });
});

app.listen(port, () => {
  console.log("Server is up at port: " + port);
});
