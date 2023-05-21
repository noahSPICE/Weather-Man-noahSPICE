let allLocations = [];

function getLocationWeather(latitude, longitude) {
    // let coordinates = await getCoordinates();
    // console.log(coordinates);
    console.log(latitude, longitude);
    let requestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&units=imperial&appid=94d5dc1d571fce2fa831058b4c8a959a'

    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            let humidity;
            let wind;
            let temp;
            let date;
            let cityStateWeather = {
                location: document.getElementById('search').value,
                dateInfos: []
            }
            for(i = 0; i < data.list.length; i += 8) {
                let weatherData = data.list[i];
                humidity = weatherData.main.humidity;
                temp = weatherData.main.temp;
                wind = weatherData.wind.speed;
                date = weatherData.dt_txt;
                console.log(date, humidity, temp, wind);
                let dateWeatherInfo = {
                    date: date,
                    temp: temp,
                    humidity: humidity,
                    wind: wind,
                }
                cityStateWeather.dateInfos.push(dateWeatherInfo);
            }

        });
}

function getWeatherData() {
    let location = document.getElementById('search').value;
    let requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + location + ',US&appid=94d5dc1d571fce2fa831058b4c8a959a'
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function(data) {
            let lat = data[0].lat;
            let lon = data[0].lon;
            getLocationWeather(lat, lon);
        })
}