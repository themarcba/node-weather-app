const addressInput = document.querySelector('input#address')
// const submitButton = document.querySelector('div#submit-button')
const weatherForm = document.querySelector('form#weather')

let weather = document.querySelector('.weather')
let errors = document.querySelector('.errors')
let icon = document.querySelector('.icon i')
let summary = document.querySelector('.summary')
let currentTemperature = document.querySelector('.current-temperature')
let minTemperature = document.querySelector('.min-temperature')
let maxTemperature = document.querySelector('.max-temperature')
let precipProbability = document.querySelector('.precip-probability')
let precipType = document.querySelector('.precip-type')


const fetchWeatherInformation = () => {
    const address = document.getElementById('address').value
    fetch(`/api/weather?address=${address}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                errors.textContent = data.error
                errors.style.display = 'block'
                weather.style.display = 'none'
            } else {
                errors.style.display = 'none'
                weather.style.display = 'block'                
                icon.className = data.icon
                addressInput.value = data.location
                summary.textContent = data.summary
                currentTemperature.textContent = Math.floor(data.temperatureHigh)
                maxTemperature.textContent = Math.floor(data.temperatureHigh)
                minTemperature.textContent = Math.floor(data.temperatureLow)
                precipType.textContent = data.precipType
                precipProbability.textContent = Math.floor(data.precipProbability * 100)
            }
        })
    })
}
weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    fetchWeatherInformation()
})
submitButton.addEventListener('click', fetchWeatherInformation)

// addressInput.addEventListener('click', function () { this.select() })