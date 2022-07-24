var currentDate = document.querySelector(".date-container");
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
      fetchCurrentWeather(data[0].lat, data[0].lon);
      fetchForecast(data[0].lat, data[0].lon);
    })
    .catch((err) => {
      console.log(err);
    });
}

searchForm.addEventListener("submit", getLatandLon);

function fetchCurrentWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
  )
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function fetchForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
  )
    .then((result) => result.json())
    .then((data) => {
      // console.log(data.list);
      for (let i = 5; i < data.list.length; i += 8) {
        console.log(data.list[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// function weatherData() {
//   navigator.geolocation.getCurrentPosition((success) => {
//     let { latitude, longitude } = success.coords;

//     fetch(
//       `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=imperial&appid=${API_KEY}`
//     )
//       .then(result.json())
//       .then((data) => {
//         console.log(data);
//         displayWeatherData(data);
//       });
//   });
// }

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
<div>${window.moment(sunrise * 1000).format("HH:mm a")}</<div>
<div class="weather-item">
<div>Sunset</div>
<div>${window.moment(sunset * 1000).format("HH:mm a")}</<div>
<div class="weather-item">
<div>Wind Speed</div>
<div>${wind_speed}</<div>
`;
}
