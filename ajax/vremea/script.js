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

class Forecast {
    constructor(date, description, icon, temperature, time) {
        this.date = date;
        this.description = description;
        this.icon = icon;
        this.temperature = temperature;
        this.time = time;
    }
}

function displayForecast(json) {
    console.log(json);
    var rawForecast = [];

    //craete objects
    for(var i=0;i<json.list.length;i++) {
        let date = getDateFromText(json.list[i].dt_txt);
        let description = json.list[i].weather[0].description;
        let icon = json.list[i].weather[0].icon;
        let temperature = json.list[i].main.temp;
        let time = getTimeFromText(json.list[i].dt_txt);
        rawForecast.push(new Forecast(date, description, icon, temperature, time));
    }

    //group objects by date
    var forecast = [];
    for(var i=0;i<rawForecast.length;i++) {
        var key = rawForecast[i].date.getDate() + "/" + rawForecast[i].date.getMonth() + "/" + rawForecast[i].date.getYear();
        if(forecast[key] == undefined) {
            forecast[key] = [];
        }
        forecast[key].push(rawForecast[i]);
    }

    //display the grouped forecast
    var htmlForecast = "";
    for(key in forecast) {
        htmlForecast += "<div><span><strong>Ziua: " + key + "</strong></span>";
        htmlForecast += "<ul>";
        for(var i=0;i<forecast[key].length;i++) {
            htmlForecast += "<li><img src='" + URL_WEATHER_ICON_PREFIX + forecast[key][i].icon + ".png' /></li>";
            htmlForecast += "<li>Ora: " + forecast[key][i].time + "</li>";
            htmlForecast += "<li>Temperatura: " + forecast[key][i].temperature + "</li>";
            htmlForecast += "<li>Descriere: " + forecast[key][i].description + "</li>";            
        }
        htmlForecast += "</ul></div>";
    }
    document.getElementById("prognoza").innerHTML = htmlForecast;
}

function getDateFromText(text) {
    var year = text.substr(0,4);
    var month = text.substr(5,2);
    var date = text.substr(8,2);
    return new Date(year, month, date);
}

function getTimeFromText(text) {
    return text.substr(11,5);
}

function displayMap(lat, lon) {
    var mapOptions = {
        center: new google.maps.LatLng(lat, lon),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}