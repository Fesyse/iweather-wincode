const apiBaseUrl = "http://api.weatherapi.com/v1"
const apiKey = "5459ea385eb94133b34114341250901"

const searchParams = new URLSearchParams(location.search)
const city = searchParams.get("city")

const locationEl = document.querySelector(".location")
const dateEl = document.querySelector(".date")
const temperature = document.querySelector(".temperature")

const minTemperature = document.querySelector(".temperature-min")
const maxTemperature = document.querySelector(".temperature-max")
const condition = document.querySelector(".condition")

const generateWeather = async () => {
  const response = await fetch(
    `${apiBaseUrl}/forecast.json?q=${city}&key=${apiKey}`
  )
  const { location, current, forecast } = await response.json()

  const currentForecastDay = forecast.forecastday[0]

  locationEl.textContent = `${location.name}, ${location.country}`
  dateEl.textContent = location.localtime
  temperature.textContent = `${current.temp_c}ºc`

  minTemperature.textContent = `${currentForecastDay.day.mintemp_c}ºc`
  maxTemperature.textContent = `${currentForecastDay.day.maxtemp_c}ºc`
  condition.textContent = current.condition.text
}

generateWeather()
