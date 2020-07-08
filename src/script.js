// Get date

let now = new Date();

let hour = now.getHours();
let minutes = now.getMinutes();

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

//Get current temperature

function displayTemp(response) {
  document.querySelector("#newCity").innerHTML = response.data.name;
  document.querySelector("#grades").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
}

function travel(event) {
  event.preventDefault();

  let cityTemp = document.querySelector("#placeGo").value;
  let apiKey = "e6856ff2f5d9372cd1a6c88b5d4e00fa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityTemp}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemp);
}

let change = document.querySelector("#cityChange");
change.addEventListener("submit", travel);
