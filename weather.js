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

function transformLocaleDateString(dateString) {
	const splittedDateString = dateString.split(".");

	const year = splittedDateString[2];
	const month = splittedDateString[1];
	const day = splittedDateString[0];

	return `${year}-${month}-${day}`;
}

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

const generateFutureDays = async () => {
	const currentDateString = transformLocaleDateString(
		new Date().toLocaleDateString()
	);

	const afterDate = new Date();
	afterDate.setDate(afterDate.getDate() + 5);
	const afterDateString = transformLocaleDateString(
		afterDate.toLocaleDateString()
	);

	const futureDaysResponse = await fetch(
		`${apiBaseUrl}/history.json?dt=${currentDateString}&end_dt=${afterDateString}&q=${city}&key=${apiKey}`
	);
	const futureDaysData = await futureDaysResponse.json();

	const futureDays = futureDaysData.forecast.forecastday;

	console.log(futureDays);
};

generateWeather();
generateFutureDays();
