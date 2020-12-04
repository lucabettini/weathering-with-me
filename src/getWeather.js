////////// FUNCTIONS CALLED BY getWeatherByLocation ///////////////

// This function takes a string with the location's name, makes an API call to 
// Geocodeapi, which returns a promise of the object with the exact coordinates 
// of that location
async function geoCode(string) {
  const response = await fetch(
    `https://app.geocodeapi.io/api/v1/search?apikey=${process.env.GEO_CODE_KEY}&text=${encodeURIComponent(
      string
    )}&size=1`,
    { mode: 'cors' }
  );
  const data = await response.json();
  const coordinates = {
    location: data.features[0].properties.label,
    lat: data.features[0].geometry.coordinates[1],
    long: data.features[0].geometry.coordinates[0],
  };
  return coordinates;
}

// This function awaits geoCode an then makes the API call to Open Weather Map; 
// returns a promise of the object containing weather data. 

async function openWeatherLocation(location) {
  const coordinates = await geoCode(location);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&appid=${process.env.OPEN_WEATHER_KEY}`,
    { mode: 'cors' }
  );
  const data = await response.json();
  let result = [coordinates.location, data];
  return result;
}

////////// FUNCTIONS CALLED BY getWeatherByCoordinates ////////////

// When the user provides coordinates instead of a location's name, this function
// immediately performs the API call to Open Weather Map, returning a promise
// of the object containing weather data. 

async function openWeatherCoordinates(lat, long) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${process.env.OPEN_WEATHER_KEY}`,
    { mode: 'cors' }
  );
  const data = await response.json();
  let result = [`${lat}°, ${long}°`, data];
  return result;
}


/////////////////// FUNCTIONS THAT PARSE DATA /////////////////////

function Weather(temp, humidity, windSpeed, weather, icon, timestamp) {
  this.temp = temp;
  this.humidity = humidity;
  this.windSpeed = windSpeed;
  this.weather = weather;
  this.icon = icon;
  this.timestamp = timestamp;
}

function addDays(object) {
  let daysArray = [];
  for (let i = 1; i < 6; i++) {
    let timestamp = new Date(object.daily[i].dt * 1000);
    timestamp = timestamp.toLocaleDateString();
    let weather = new Weather(
      object.daily[i].temp,
      object.daily[i].humidity,
      object.daily[i].wind_speed,
      object.daily[i].weather[0].description,
      object.daily[i].weather[0].icon,
      timestamp
    );
    daysArray.push(weather);
  }
  return daysArray;
}

function parseWeather(object) {
  let parsedWeather = {};
  let timestamp = new Date(object.current.dt * 1000);
  timestamp = timestamp.toLocaleString();
  parsedWeather.current = new Weather(
    object.current.temp,
    object.current.humidity,
    object.current.wind_speed,
    object.current.weather[0].description,
    object.current.weather[0].icon,
    timestamp
  );
  parsedWeather.daily = addDays(object);
  return parsedWeather;
}


///////// EXPORTED FUNCTIONS, USED IN displayResults.js ///////////

export async function getWeatherByLocation(location) {
  const data = await openWeatherLocation(location);
  let results = [data[0], parseWeather(data[1])];
  return results;
}

export async function getWeatherByCoordinates(lat, long) {
  const data = await openWeatherCoordinates(lat, long);
  let results = [data[0], parseWeather(data[1])];
  return results;
}
