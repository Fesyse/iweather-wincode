const smartSearchApiBaseUrl = "https://countriesnow.space/api/v0.1"

const form = document.querySelector(".weather-form")
const input = document.querySelector(".input")
const smartSearchCities = document.querySelector(".smart-search-cities")

const country = "russia"
const cities = []

// On submit redirect to weather main page
form.addEventListener("submit", ev => {
  ev.preventDefault()

  const input = ev.target.querySelector(".input")

  const baseUrl = window.location.origin
  const value = input.value

  window.location.href = `${baseUrl}/weather.html?city=${value}`
})

// On first focus fetch all cities
input.addEventListener("focus", async () => {
  if (cities.length > 0) return

  const response = await fetch(`${smartSearchApiBaseUrl}/countries/cities`, {
    method: "POST",
    headers: {
      // Says to server that we accept only json
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      country,
    }),
  })
  const countryCities = (await response.json()).data

  countryCities.map(city => cities.push(city))
})

input.addEventListener("input", e => {
  const value = e.target.value

  if (value.length < 3) {
    smartSearchCities.innerHTML = ""
    smartSearchCities.classList.remove("active")
    return
  }

  smartSearchCities.classList.add("active")
  smartSearchCities.innerHTML = ""

  const similarCities = cities.filter(city => {
    return city.includes(value)
  })

  if (similarCities.length === 0) {
    smartSearchCities.classList.remove("active")
    return
  }

  for (const similarCity of similarCities) {
    const cityNode = document.createElement("li")
    cityNode.classList.add("smart-search-city")
    cityNode.innerText = similarCity

    smartSearchCities.appendChild(cityNode)
  }
})

let activeCityElementIndex = -1

window.addEventListener("keydown", e => {
  const key = e.key

  if (
    (key === "ArrowUp" || key === "ArrowDown") &&
    smartSearchCities.classList.contains("active")
  ) {
    if (key === "ArrowUp") {
      activeCityElementIndex--
    } else {
      activeCityElementIndex++
    }

    const cityElement = smartSearchCities.children.item(activeCityElementIndex)

    if (cityElement === null) {
      activeCityElementIndex = -1
      cityValue.value = ""
      return
    }

    smartSearchCities.childNodes.forEach(node => {
      node.classList.remove("focused")
    })

    cityElement.classList.add("focused")

    const cityValue = cityElement.innerText
    input.value = cityValue
  }
})
