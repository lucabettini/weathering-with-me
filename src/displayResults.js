import { getWeatherByCoordinates, getWeatherByLocation } from './getWeather.js';


///////////// FUNCTIONS TO REDESIGN PAGE STRUCTURE  ///////////////

// Easy custom tool to manipulate the DOM
function changeClass(elementId, cssClassToRemove, cssClassToAdd) {
  let element = document.getElementById(elementId);
  if (cssClassToRemove != null) {
    element.classList.remove(cssClassToRemove);
  }
  if (cssClassToAdd != null) {
    element.classList.add(cssClassToAdd);
  }
}

function changeCSS() {
  // Change Header
  changeClass('title', 'title--big', 'title--small');
  changeClass('title-icons', null, 'hide');

  // Change searchbar
  changeClass('searchbar', 'searchbar-center', null); 
  let width = document.documentElement.clientWidth;
  if (width > 990) {
    changeClass('location-searchbar', 'form-control-lg', 'form-control-md');
    changeClass('location-btn', null, 'btn-md');
    changeClass('latitude-searchbar', 'form-control-lg', 'form-control-md');
    changeClass('longitude-searchbar', 'form-control-lg', 'form-control-md');
    changeClass('coordinates-btn', 'btn-lg', 'btn-md');
  } else {
    changeClass('location-searchbar', 'form-control-lg', 'form-control-sm');
    changeClass('location-btn', null, 'btn-sm');
    changeClass('latitude-searchbar', 'form-control-lg', 'form-control-sm');
    changeClass('longitude-searchbar', 'form-control-lg', 'form-control-sm');
    changeClass('coordinates-btn', 'btn-lg', 'btn-sm');
  }

  // Display div containers for rendering data
  changeClass('current-container', 'hide', null);
  changeClass('forecast-container', 'hide', null);
}


///////////// FUNCTION TO DISPLAY CURRENT WEATHER  ///////////////
// This function changes the data inside current-container, 
// taking as parameter the parsed result of the API call


function currentWeather(result) {
  document.getElementById(
    'current-location'
  ).textContent = `Weather near ${result[0]}`;

  function showIcons(path) {
    let iconCode = path.replace(/["]+/g, ''); 
    if (iconCode.charAt(1) === '3' || iconCode.charAt(1) === '4' || iconCode.charAt(0) === '5') {
      if (iconCode.charAt(2) === "d") {
        iconCode = '02d'; 
      } else {
        iconCode = '02n'; 
      }
    }
    return `./img/${iconCode}.svg`;
  }
  let img = document.getElementById('current-icon');
  img.src = showIcons(result[1].current.icon);

  document.getElementById('current-temperature').textContent = `${Math.round(
    result[1].current.temp
  )}° C`;

  let weather = result[1].current.weather;
  document.getElementById('current-weather').textContent = `${
    weather.charAt(0).toUpperCase() + weather.slice(1)
  }`;
  document.getElementById(
    'current-humidity'
  ).textContent = `Humidity: ${result[1].current.humidity}%`;
  document.getElementById(
    'current-wind'
  ).textContent = `Wind speed: ${result[1].current.windSpeed} m/s`;
}

///////////// FUNCTION TO DISPLAY WEATHER FORECAST  ///////////////
// This function changes the data inside forecast-container, 
// taking as parameter the parsed result of the API call


function addForecast(result) {
  let dayDate = document.getElementsByClassName('forecast-data');
  let day = document.getElementsByTagName('tr');

  for (let i = 0; i < 5; i++) {
    let dateString = result[1].daily[i].timestamp;
    dateString = dateString.replace(/["]+/g, '');
    dateString = dateString.substring(0, 5);
    if (dateString[dateString.length - 1] === '/') {
      dateString = dateString.substring(0, 4);
    }
    dayDate[i].innerHTML = '';
    dayDate[i].innerHTML = dateString;

    let temp = `${Math.round(result[1].daily[i].temp.day)}°`;
    let weather = result[1].daily[i].weather;
    let humidity = `${result[1].daily[i].humidity}%`;
    let windSpeed = `${result[1].daily[i].windSpeed}`;

    let tempElem = day[i + 1].getElementsByTagName('td')[0];
    tempElem.innerHTML = '';
    tempElem.innerHTML = temp;

    let weatherElem = day[i + 1].getElementsByTagName('td')[1];
    weatherElem.innerHTML = '';
    weatherElem.innerHTML = weather;

    let humidityElem = day[i + 1].getElementsByTagName('td')[2];
    humidityElem.innerHTML = '';
    humidityElem.innerHTML = humidity;

    let windSpeedElem = day[i + 1].getElementsByTagName('td')[3];
    windSpeedElem.innerHTML = '';
    windSpeedElem.innerHTML = windSpeed;
  }
}


// Wrapper function 
function displayResults(result) {
  changeCSS();
  currentWeather(result);
  addForecast(result);
}


///////////// EXPORTED FUNCTIONS, USED IN index.js  ///////////////


export function displayResultsByLocation() {
  let userRequest = document.getElementById('location-searchbar').value;
  getWeatherByLocation(userRequest).then((result) => {
    displayResults(result);
  });
}

export function displayResultsByCoordinates() {
  let latitude = document.getElementById('latitude-searchbar').value;
  let longitude = document.getElementById('longitude-searchbar').value;
  getWeatherByCoordinates(latitude, longitude).then((result) => {
    displayResults(result);
  });
}
