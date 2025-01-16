const apiBaseUrl = "http://api.weatherapi.com/v1";
const apiKey = "5459ea385eb94133b34114341250901";

const searchParams = new URLSearchParams(location.search);
const city = searchParams.get("city");

const locationEl = document.querySelector(".location");
const dateEl = document.querySelector(".date");
const temperature = document.querySelector(".temperature");

const minTemperature = document.querySelector(".temperature-min");
const maxTemperature = document.querySelector(".temperature-max");
const condition = document.querySelector(".condition");

// Detail Weather elements

const detailWeatherMinTemp = document.querySelector(".detail-weather-min-temp");
const detailWeatherChanceOfRain = document.querySelector(
	".detail-weather-chance-of-rain"
);
const detailWeatherWindKmh = document.querySelector(".detail-weather-wind-kmh");
const detailWeatherHumidity = document.querySelector(
	".detail-weather-humidity"
);
const detailWeatherUv = document.querySelector(".detail-weather-uv");

const getDetailWeather = async ({ forecast, current }) => {
	const currentForecastDay = forecast.forecastday[0].day;
	const dailyChanceOfRain = currentForecastDay.daily_chance_of_rain;
	const minTemp = currentForecastDay.mintemp_c;
	const windKph = current.wind_kph;
	const airHudimiti = current.humidity;
	const uvIndex = current.uv;
	return { dailyChanceOfRain, windKph, airHudimiti, uvIndex, minTemp };
};

const generateDetailWeather = async ({ forecast, current }) => {
	const { dailyChanceOfRain, windKph, airHudimiti, uvIndex, minTemp } =
		await getDetailWeather({ forecast, current });

	detailWeatherMinTemp.textContent = `${minTemp}ºc`;
	detailWeatherChanceOfRain.textContent = `${dailyChanceOfRain}%`;
	detailWeatherWindKmh.textContent = `${windKph} км/ч`;
	detailWeatherHumidity.textContent = `${airHudimiti}%`;
	detailWeatherUv.textContent = `${uvIndex}`;
};

const generateWeather = async () => {
	const response = await fetch(
		`${apiBaseUrl}/forecast.json?q=${city}&key=${apiKey}`
	);
	const totalResponse = await response.json();

	const { location, current, forecast } = totalResponse;

	const currentForecastDay = forecast.forecastday[0];
	generateDetailWeather({ forecast, current });
	locationEl.textContent = `${location.name}, ${location.country}`;
	dateEl.textContent = location.localtime;
	temperature.textContent = `${current.temp_c}ºc`;

	minTemperature.textContent = `${currentForecastDay.day.mintemp_c}ºc`;
	maxTemperature.textContent = `${currentForecastDay.day.maxtemp_c}ºc`;
	condition.textContent = current.condition.text;
};

generateWeather();
