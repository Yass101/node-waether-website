const request = require('request');

// function takes 3 arguments 
const forecast = (latitude, longitude, callback) => {

    const url = `https://api.darksky.net/forecast/0705617a0b20eef50a0790833960b463/${latitude},${longitude}?units=si&lang=es`

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback("Unable to connect to waether Services", undefined)
        } else if (response.body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, `It's is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipIntensity}% chance of rain. With ${response.body.currently.humidity} humidity`)
        }
    })
}

module.exports = forecast;