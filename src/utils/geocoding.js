const request = require('request')
const token = 'pk.eyJ1IjoidGhlbWFyY2JhIiwiYSI6ImNqeGQxeDR6MDA5cDYzcm9jOTJ1MnZvOGUifQ.wcrOEQNNEYMc0RbYL0x6qA'
const limit = 1
const getURL = location => {
    return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=${token}&limit=${limit}`
}
const requestLocation = (location, callback) => {
    request({ url: getURL(location), json: true }, (err, { body }) => {
        if (err) {
            callback(undefined, 'Error trying to reach the geolocation service')
        } else if (body.features.length === 0) {
            callback(undefined, '️️Unable to find location')
        } else {
            const city = body.features[0]
            const location = city.place_name
            const latitude = city.center[1]
            const longitude = city.center[0]
            callback({ latitude, longitude, location })
        }
    })
}

module.exports = { requestLocation }