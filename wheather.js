const weather = document.querySelector(".js-weather");
const API_KEY = "946c9b7aa4da842d4c5c7f402bd3a6fc";
const COORDS = "coords";
function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const description = json.weather[0].description;
      const temperature = json.main.temp;
      const place = json.name;
      let weatherIcon = "";
      switch (description) {
        case "clear sky":
          weatherIcon = "🌞";
          break;
        case "few clouds":
          weatherIcon = "🌤";
          break;
        case "scattered clouds":
          weatherIcon = "🌥";
          break;
        case "broken clouds":
          weatherIcon = "🌥";
          break;
        case "shower rain":
          weatherIcon = "🌧";
          break;
        case "rain":
          weatherIcon = "🌧";
          break;
        case "thunderstorm":
          weatherIcon = "🌩";
          break;
        case "snow":
          weatherIcon = "🌨";
          break;
        case "snow":
          weatherIcon = "🌫";
          break;
        default:
          break;
      }
      weather.innerText = `${weatherIcon} ${temperature}℃ @ ${place}`;
    });
}
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("Can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
