var currentDate = document.querySelector(".date");
var currentTime = document.querySelector(".time");
var searchForm = document.querySelector("#search-form");
var API_KEY = "533d85454b838c8602df5b7476173c44";

var cityName = "Atlanta";

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
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
