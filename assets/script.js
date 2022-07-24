var currentDate = document.querySelector(".date");
var currentTime = document.querySelector(".time");
var searchForm = document.querySelector("#search-form");
var API_KEY = "533d85454b838c8602df5b7476173c44";
var currentWeatherItemsEl = document.getElementById("current-weather-item");
var cityName = "San Diego";

currentDate.textContent = new Date().toLocaleString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

currentTime.textContent = `${new Date().toLocaleTimeString("en-US", {
  hour12: true,
  hour: "numeric",
  minute: "numeric",
})}`;

function getLatandLon(e) {
  e.preventDefault();
  fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      //console log the lat
      console.log(data[0].lat);
      //console log the lon
      console.log(data[0].lon);
      fetchWeather(data[0].lat, data[0].lon);
    })
    .catch((err) => {
      console.log(err);
    });
}

searchForm.addEventListener("submit", getLatandLon);

function fetchWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function weatherData() {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`
    )
      .then(result.json())
      .then((data) => {
        console.log(data);
        displayWeatherData(data);
      });
  });
}

function displayWeatherData() {
  let { humidity, pressure, sunrise, sunset, wind_speed } = data.current;
  currentWeatherItemsEl.innerHTML = ` <div class="weather-item">
<div>Humidity</div>
<div>${humidity}%</<div>
 <div class="weather-item">
<div>Pressure</div>
<div>${pressure}</<div>
<div class="weather-item">
<div>Sunrise</div>
<div>${window.moment(sunrise * 1000).format('HH:mm a')}</<div>
<div class="weather-item">
<div>Sunset</div>
<div>${window.moment(sunset * 1000).format('HH:mm a')}</<div>
<div class="weather-item">
<div>Wind Speed</div>
<div>${wind_speed}</<div>
`;
}
