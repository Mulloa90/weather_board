var currentDate = document.querySelector(".date-container");
var searchForm = document.querySelector("#search-form");
var weatherForecast = document.querySelector("#weather-forecast");
var API_KEY = "533d85454b838c8602df5b7476173c44";
var currentWeatherItemsEl = document.getElementById("current-weather-item");

var searchedCityNames = JSON.parse(localStorage.getItem("searchedCity")) || [];
console.log(searchedCityNames);

currentDate.textContent = new Date().toLocaleString("en-US", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
//fectching geographic location to get coordinates
function getLatandLon(cityName) {
  fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
  )
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      if (!searchedCityNames.includes(data[0].name)) {
        searchedCityNames.push(data[0].name);
        console.log(searchedCityNames);
        localStorage.setItem("searchedCity", JSON.stringify(searchedCityNames));
        renderSearchHistory();
      } // turn coordinates into city names
      fetchCurrentWeather(data[0].lat, data[0].lon);
      fetchForecast(data[0].lat, data[0].lon);
    })
    .catch((err) => {
      console.log(err);
    });
}

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var cityName = document.getElementById("search-input").value;
  getLatandLon(cityName);
});

function fetchCurrentWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
  )
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      displayCurrentWeather(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
// fetch weather and display on page using inner html
function fetchForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
  )
    .then((result) => result.json())
    .then((data) => {
      // console.log(data.list);
      weatherForecast.innerHTML = "";
      for (let i = 5; i < data.list.length; i += 8) {
        //generate a forecast-item and append it
        var forecastCard = document.createElement("section");
        forecastCard.classList.add("forecast-item");
        forecastCard.innerHTML = `<section class="day">${new Date(
          data.list[i].dt * 1000
        ).toLocaleString("en-US", {
          weekday: "short",
        })}</section>
         <img src="https://openweathermap.org/img/wn/${
           data.list[i].weather[0].icon
         }@2x.png" alt="weather icon" class="w-icon">
        <p>Temp: ${data.list[i].main.temp}° F</p>
        <p>Wind Speed: ${data.list[i].wind.speed} mph</p>
        <p>Humidity: ${data.list[i].main.humidity}%</p>
   
        `;

        weatherForecast.append(forecastCard);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

renderSearchHistory();
// city search history & save to local storage
function renderSearchHistory() {
  //fetch search history from local storage
  var arrayFromStorage = JSON.parse(localStorage.getItem("searchedCity")) || [];
  console.log(arrayFromStorage);
  //clear out the UL
  document.getElementById("search-ul").innerHTML = "";
  //loop over the array
  arrayFromStorage.forEach((name) => {
    //create a button for each name
    var listItem = document.createElement("li");
    var button = document.createElement("button");
    button.textContent = name;
    button.addEventListener("click", function () {
      getLatandLon(name);
    });
    listItem.append(button);
    //append it to the UL
    document.getElementById("search-ul").append(listItem);
  });
}
function displayCurrentWeather(data) {
  //displaying current weather
  document.querySelector(".currentWeather").innerHTML = `
  <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
  <p>Temp: ${data.main.temp} ° F</p>
  <p>Humidity: ${data.main.humidity}%</p>
  <p>Wind speed: ${data.wind.speed} mph</p>
  `;
}
