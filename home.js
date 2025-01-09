const form = document.querySelector(".weather-form")

form.addEventListener("submit", ev => {
  ev.preventDefault()

  const input = ev.target.querySelector(".input")

  const baseUrl = window.location.origin
  const value = input.value

  window.location.href = `${baseUrl}/weather.html?city=${value}`
})
