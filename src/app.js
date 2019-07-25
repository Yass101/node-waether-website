const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require('./utlis/geoCode')
const forecast = require('./utlis/forecast')

const app = express();

const publicFolderPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
app.use(express.static(publicFolderPath));
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Yass"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help page",
        name: "Yass"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About page",
        name: "Yass"
    });
});

app.get("/help/*", (req, res) => {
    res.render("generic", {
        title: "404",
        name: "Yass",
        errorMassege: "Help articales not found bitch"
    });
});

app.get('/weather', (req, res) => {
    // console.log(req.query.city);
    if (!req.query.city) {
        return res.send({
            error: "you must provide a city asshole"
        });
    }

    geoCode(req.query.city, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            res.send({
                error
            })
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send({
                        error
                    })
                } else {
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.city
                    })
                }
            })
        }
    })
    // res.send({
    //     forecast: "it's raining ",
    //     location: "Auckland",
    //     address: req.query.city
    // })
})

app.get("*", (req, res) => {
    res.render("generic", {
        title: "404",
        errorMassege: "Page not found deal with it bitch",
        name: "Yass"
    });
});

app.listen(3000, () => {
    console.log("Server Started");
});