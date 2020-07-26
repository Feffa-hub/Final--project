// Get date

let now = new Date();

let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

function buildHours(timestamp) {
  let now = new Date(timestamp);

  let hour = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

let dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = dayList[now.getDay()];

daytime.innerHTML = `${day} ${hour}:${minutes}`;

//Current temperature in Catania

function dataCatania(response) {
  celsiusTemperature = response.data.main.temp;
  let gradeElement = document.querySelector("#grades");
  let humElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let imgElement = document.querySelector("#icon-now");

  gradeElement.innerHTML = Math.round(response.data.main.temp);
  humElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  imgElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=Catania&appid=e6856ff2f5d9372cd1a6c88b5d4e00fa&units=metric";

axios.get(apiUrl).then(dataCatania);

//Get current temperature from search engine

function displayTemp(response) {
  celsiusTemperature = response.data.main.temp;
  let iconElement = document.querySelector("#icon-now");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  document.querySelector("#newCity").innerHTML = response.data.name;
  document.querySelector("#grades").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecast = response.data.list[0];

  forecastElement.innerHTML = `
  <div class="col-2">
  <h5>${buildHours(forecast.dt_txt)}</h5>
  <div class="symbol">
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png"width="80" />
  </div>
  <p class="card-text"><strong>${Math.round(
    forecast.main.temp_max
  )}° </strong>${Math.round(forecast.main.temp_min)}°
  </p>
  </div>
  `;

  forecast = response.data.list[1];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h5>${buildHours(forecast.dt_txt)}</h5>
  <div class="symbol">
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png"width="80" />
  </div>
  <p class="card-text"><strong>${Math.round(
    forecast.main.temp_max
  )}° </strong>${Math.round(forecast.main.temp_min)}°
  </p>
  </div>
  `;

  forecast = response.data.list[2];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h5>${buildHours(forecast.dt_txt)}</h5>
  <div class="symbol">
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png"width="80" />
  </div>
  <p class="card-text"><strong>${Math.round(
    forecast.main.temp_max
  )}° </strong>${Math.round(forecast.main.temp_min)}°
  </p>
  </div>
  `;

  forecast = response.data.list[3];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h5>${buildHours(forecast.dt_txt)}</h5>
  <div class="symbol">
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png"width="80" />
  </div>
  <p class="card-text"><strong>${Math.round(
    forecast.main.temp_max
  )}° </strong>${Math.round(forecast.main.temp_min)}°
  </p>
  </div>
  `;

  forecast = response.data.list[4];
  forecastElement.innerHTML += `
  <div class="col-2">
  <h5>${buildHours(forecast.dt_txt)}</h5>
  <div class="symbol">
  <img src="http://openweathermap.org/img/wn/${
    forecast.weather[0].icon
  }@2x.png"width="80" />
  </div>
  <p class="card-text"><strong>${Math.round(
    forecast.main.temp_max
  )}° </strong>${Math.round(forecast.main.temp_min)}°
  </p>
  </div>
  `;
}

function travel(event) {
  event.preventDefault();

  let cityTemp = document.querySelector("#placeGo").value;
  let apiKey = "e6856ff2f5d9372cd1a6c88b5d4e00fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTemp}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityTemp}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

let change = document.querySelector("#cityChange");
change.addEventListener("submit", travel);

//Get current location

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "e6856ff2f5d9372cd1a6c88b5d4e00fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

//Get unit conversion

function fahrenheitTemp(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let temperatureElement = document.querySelector("#grades");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function celsiusTemp(event) {
  event.preventDefault();

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  temperatureElement = document.querySelector("#grades");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsiusTemp);

let celsiusTemperature = null;
