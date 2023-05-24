function getLocationWeather(latitude, longitude) {
  let cityStateWeather = {
    location: document.getElementById("search").value,
    dateInfos: [],
  };

  let currentWeatherURL =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=imperial&appid=94d5dc1d571fce2fa831058b4c8a959a";
  fetch(currentWeatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      cityStateWeather.currentTemp = data.main.temp;
      cityStateWeather.currentHumidity = data.main.humidity;
      cityStateWeather.currentWind = data.wind.speed;
      cityStateWeather.currentDate = new Date();
    });

  let requestURL =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=imperial&appid=94d5dc1d571fce2fa831058b4c8a959a";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      let humidity;
      let wind;
      let temp;
      let date;

      for (i = 0; i < data.list.length; i += 8) {
        let weatherData = data.list[i];
        humidity = weatherData.main.humidity;
        temp = weatherData.main.temp;
        wind = weatherData.wind.speed;
        date = weatherData.dt_txt;
        let dateWeatherInfo = {
          date: date,
          temp: temp,
          humidity: humidity,
          wind: wind,
        };
        cityStateWeather.dateInfos.push(dateWeatherInfo);
      }
      storeLocationWeather(cityStateWeather);
    });
}

function getWeatherData() {
  let location = document.getElementById("search").value;
  let requestURL =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    location +
    ",US&appid=94d5dc1d571fce2fa831058b4c8a959a";
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let lat = data[0].lat;
      let lon = data[0].lon;
      getLocationWeather(lat, lon);
    });
}

function storeLocationWeather(cityStateWeather) {
  console.log(cityStateWeather);
  if (localStorage.getItem(cityStateWeather.location.toUpperCase())) {
    alert("NO NO NO!!!");
    return;
  }
  localStorage.setItem(
    cityStateWeather.location.toUpperCase(),
    JSON.stringify(cityStateWeather)
  );
  // add a button
  let newListItem = document.createElement("li");
  let newButton = document.createElement("button");
  newButton.setAttribute("onClick", "updateWeatherSection(this)");
  newButton.textContent = cityStateWeather.location;
  newListItem.appendChild(newButton);
  document.getElementById("historyList").appendChild(newListItem);

  // update main weather div EXAMPLE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
document.getElementById("location").textContent = 
"Current weather conditions in " + cityStateWeather.location;

  document.getElementById("currentTemp").textContent =
    "Current temperature is " + cityStateWeather.currentTemp + " °F";

  document.getElementById("currentWind").textContent =
    "Current wind speed is " + cityStateWeather.currentWind + " mph";

  document.getElementById("currentHumidity").textContent =
  "Current humidity is " + cityStateWeather.currentHumidity + '%';
}

function updateWeatherSection(button) {
  console.log("updateWeatherSection");
  // called when clicking one of the buttons
  let cityStateWeather = JSON.parse(
    localStorage.getItem(button.textContent.toUpperCase())
  );
  console.log(cityStateWeather);

  document.getElementById("location").textContent = 
"Current weather conditions in " + cityStateWeather.location;

  document.getElementById("currentTemp").textContent =
    "Current temperature is " + cityStateWeather.currentTemp + " °F";

  document.getElementById("currentWind").textContent =
    "Current wind speed is " + cityStateWeather.currentWind + " mph";

  document.getElementById("currentHumidity").textContent =
  "Current humidity is " + cityStateWeather.currentHumidity + '%';
  // Grab main weather div and update with weatherData properties (location, date info, etc.)
}

function loadPage() {
  // const cityStateWeathers = {...localStorage};
  const cityStateWeathers = Object.values(localStorage);
  console.log(cityStateWeathers);
  for (i = 0; i < cityStateWeathers.length; i++) {
    let cityStateWeather = JSON.parse(cityStateWeathers[i]);
    let newListItem = document.createElement("li");
    let newButton = document.createElement("button");
    newButton.setAttribute("onClick", "updateWeatherSection(this)");
    newButton.textContent = cityStateWeather.location;
    newListItem.appendChild(newButton);
    document.getElementById("historyList").appendChild(newListItem);
  }
  // document.getElementById('weatherContainer').innerHTML = '<h2>Please select a city or search for a new one</h2>';
}

loadPage();
