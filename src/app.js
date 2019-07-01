const path = require('path')

const { green } = require('chalk')
const express = require('express')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 3000

const geocoding = require('./utils/geocoding')
const weather = require('./utils/weather')

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

const author = {
    name: 'Marc Backes',
    link: 'https://marc.dev'
}

const appTitle = 'WeatherApp'

// Setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather 🌤",
        author,
        appTitle
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: "About ✨",
        author,
        appTitle
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help ⚓️",
        author,
        appTitle,
        helpText: 'This is a helpful text'
    })
})

app.get('/api/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocoding.requestLocation(address, ({ latitude, longitude, location } = {}, err) => {
        if (err) {
            return res.send({ error: err })
        } else {
            weather.requestWeather(latitude, longitude, (weatherData, err) => {
                if (err) {
                    return res.send({ error: err })
                } else {
                    const { temperature:currentTemperature, icon } = weatherData.currently                    
                    const { temperatureHigh, temperatureLow, precipType, precipProbability, summary } = weatherData.today

                    return res.send({
                        address,
                        location,
                        currentTemperature,
                        temperatureHigh,
                        temperatureLow,
                        precipType,
                        precipProbability,
                        summary,
                        icon
                    })
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Search term must be provided'
        })
    }
    res.send({
        search: req.query.search,
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help ⚓️",
        author,
        appTitle,
        message: 'Help article not found ☹️'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author,
        appTitle,
        message: 'Document not found'
    })
})

app.listen(port, () => {
    console.log(green(`\n > server running on port ${port}\n`))
})