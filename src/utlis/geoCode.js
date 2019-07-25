const request = require("request");


const geoCode = (city, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(city)}.json?access_token=pk.eyJ1Ijoiam9obm5ueTAwNyIsImEiOiJjanh6ZDJiZ2cwMXFxM25vYTd2ZjJvYTlyIn0.JNZyYY5cgJq7ya40UXgxNg&limit=1`;

    request({
        // obbject shorthand
        url,
        //url:url,
        json: true
    }, (error, response) => {

        if (error) {
            callback("Unable to connect to location Services", undefined)
        } else if (response.body.features.length === 0) {
            callback("Unable to find location, Try another Search", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode;