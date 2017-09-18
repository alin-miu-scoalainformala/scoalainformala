var URL_CURRENT_WEATHER = "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
var URL_FORECAST_WEATHER = "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

var URL_WEATHER_ICON_PREFIX = "http://openweathermap.org/img/w/"; // sufix .png

function getCurrentWeatherAsJson() {
    var oras = document.getElementById("oras").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var json = JSON.parse(res);
            displayWeather(json);
        }
    };
    xhttp.open("GET", URL_CURRENT_WEATHER + oras, true);
    xhttp.send();
}

function displayWeather(json) {
    console.log(json);
    document.getElementById('cer_image').src = URL_WEATHER_ICON_PREFIX + json.weather[0].icon + ".png";
    document.getElementById('cer_label').innerHTML = json.weather[0].description;
    document.getElementById('umiditate').innerHTML = json.main.humidity;
    document.getElementById('presiune').innerHTML = json.main.pressure;
    document.getElementById('temperatura_curenta').innerHTML = json.main.temp;
    document.getElementById('temperatura_min').innerHTML = json.main.temp_min;
    document.getElementById('temperatura_max').innerHTML = json.main.temp_max;

    var lat = json.coord.lat;
    var lon = json.coord.lon;
    displayMap(lat, lon);
}

function getCurrentForecastAsJson() {
    var oras = document.getElementById("oras").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var res = this.responseText;
            var json = JSON.parse(res);
            displayForecast(json);
        }
    };
    xhttp.open("GET", URL_FORECAST_WEATHER + oras, true);
    xhttp.send();
}

function displayForecast(json) {
    console.log(json);
}

function displayMap(lat, lon) {
    var mapOptions = {
        center: new google.maps.LatLng(lat, lon),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}