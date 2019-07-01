const request = require('request')
const token = '96294f5dc0cf914185c0e058374c6fca'

const weatherIconMap = {
    'clear-day': 'fal fa-sun',
    'clear-night': 'fal fa-moon',
    'rain': 'fal fa-cloud-rain',
    'snow': 'fal fa-cloud-snow',
    'sleet': 'fal fa-cloud-showers-heavy',
    'wind': 'fal fa-wind',
    'fog': 'fal fa-fod',
    'cloudy': 'fal fa-clouds',
    'partly-cloudy-day': 'fal fa-cloud-sun',
    'partly-cloudy-night': 'fal fa-cloud-moon'
}

const getURL = (latitude, longitude) => {
    return `https://api.darksky.net/forecast/${token}/${latitude},${longitude}?units=si`
}
const requestWeather = (latitude, longitude, callback) => {

    request({ url: getURL(latitude, longitude), json: true }, (err, { body }) => {
        if (err) {
            callback(undefined, err)
        } else if (body.error) {
            callback(undefined, '️️Unable to find location')
        } else {            
            const currently = body.currently
            const today = body.daily.data[0]
            currently.icon = weatherIconMap[currently.icon]
            
            callback({ currently, today })
        }
    })
}

module.exports = { requestWeather }