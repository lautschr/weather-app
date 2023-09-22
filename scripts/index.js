let apiKey = "bd3bb6534458ba51b48c49f5155745b6";
let units = "metric";

//Current Day + Time
let now = new Date();
let currentTime = document.querySelector("#currentTime");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentTime.innerHTML = `${day} ${hours}:${minutes}`;

//City Search
function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-input");

  let city = searchInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherData);
}

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSubmit);

//Weather API
//show city
function showWeatherData(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  // show temperature
  let temperature = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#weather-forecast-today-temp");
  tempToday.innerHTML = `${temperature}`;

  // show humidity
  let humidity = Math.round(response.data.main.humidity);
  let humidityToday = document.querySelector(
    "#weather-forecast-today-detail-hum"
  );
  humidityToday.innerHTML = `Humidity: ${humidity}%`;

  // show wind
  let wind = Math.round(response.data.wind.speed);
  let windToday = document.querySelector("#weather-forecast-today-detail-wind");
  windToday.innerHTML = `Wind: ${wind} km/h`;

  // description weather
  let description = response.data.weather[0].description;
  let descriptionToday = document.querySelector("#weather-forecast-today-desc");
  descriptionToday.innerHTML = `${description}`;
}

// Current Location Button
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeatherData);
}

function getCurrentPosition(event) {
  event.preventDefault;
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentPosition);
