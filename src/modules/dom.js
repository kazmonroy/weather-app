import getCurrentweather from './get-weather';
import { getHourlyForecast, getDailyForecast } from './get-forecast';
import getLocationImgBackground from './get-location-bg-img';

// CURRENT WEATHER SECTION
function showCurrentWeather(cityQuery) {
  const mainForecastDisplay = document.querySelector(
    '[data-main-forecast-display]'
  );

  getCurrentweather(cityQuery).then((json) => {
    let currentWeatherSection = document.createElement('div');
    currentWeatherSection.setAttribute('class', 'current-weather-section');
    currentWeatherSection.setAttribute('data-current-weather-section', '');

    let locationBgImg = document.createElement('img');
    locationBgImg.setAttribute('class', 'location-bg-img');
    getLocationImgBackground(cityQuery).then(
      (src) => (locationBgImg.src = src)
    );

    // Header section
    let header = document.createElement('div');
    header.setAttribute('class', 'header');

    let menu = document.createElement('button');
    menu.setAttribute('class', 'menu');
    menu.innerHTML = '<i class="fa-solid fa-bars"></i>';

    let locationInfo = document.createElement('div');
    locationInfo.setAttribute('class', 'location-info');

    let city = document.createElement('div');
    city.setAttribute('class', 'current-city');

    let cityName = document.createElement('div');
    cityName.textContent = json.name;

    let locationIcon = document.createElement('div');
    locationIcon.setAttribute('class', 'location-icon');
    locationIcon.innerHTML = '<i class="fa-solid fa-location-dot"></i>';

    let currentDate = document.createElement('div');
    currentDate.setAttribute('class', 'current-date');
    currentDate.textContent = getDate(json);

    // Weather info section
    let currentWeatherInfo = document.createElement('div');
    currentWeatherInfo.setAttribute('class', 'weather-info');

    let weather = document.createElement('div');
    weather.setAttribute('class', 'weather');

    let weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('class', 'weather-icon');
    weatherIcon.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}.png`;

    let weatherDescription = document.createElement('div');
    weatherDescription.setAttribute('class', 'weather-descrip');
    weatherDescription.textContent = json.weather[0].description;

    let weatherTemperature = document.createElement('div');
    weatherTemperature.setAttribute('class', 'weather-temp');
    weatherTemperature.textContent = getTemperature(json);

    let extraWeatherInfo = document.createElement('div');
    extraWeatherInfo.setAttribute('class', 'extra-temp-info');
    let wind = document.createElement('div');
    wind.setAttribute('class', 'wind');
    let windIcon = document.createElement('div');
    windIcon.innerHTML = '<i class="fa-solid fa-wind"></i>';
    let windInfo = document.createElement('p');
    windInfo.textContent = `${Math.floor(json.wind.speed) + 1} km/h`;

    wind.append(windIcon);
    wind.append(windInfo);

    let humidity = document.createElement('div');
    humidity.setAttribute('class', 'humidity');
    let humidityIcon = document.createElement('div');
    humidityIcon.innerHTML = '<i class="fa-solid fa-droplet"></i>';
    let humidityInfo = document.createElement('p');
    humidityInfo.textContent = `${json.main.humidity} %`;

    humidity.append(humidityIcon);
    humidity.append(humidityInfo);

    extraWeatherInfo.append(wind);
    extraWeatherInfo.append(humidity);

    city.append(locationIcon);
    city.append(cityName);

    locationInfo.append(city);
    locationInfo.append(currentDate);

    header.append(locationInfo);
    header.append(menu);

    weather.append(weatherIcon);
    weather.append(weatherDescription);
    weather.append(extraWeatherInfo);

    currentWeatherInfo.append(weather);
    currentWeatherInfo.append(weatherTemperature);

    // SECTION LAYOUT
    currentWeatherSection.append(locationBgImg);
    currentWeatherSection.append(header);
    currentWeatherSection.append(currentWeatherInfo);

    mainForecastDisplay.append(currentWeatherSection);
  });
}

function showHourlyForecast(cityQuery) {
  const mainForecastDisplay = document.querySelector(
    '[data-main-forecast-display]'
  );

  getHourlyForecast(cityQuery).then((forecast) => {
    const forecastDisplay = document.createElement('div');
    forecastDisplay.setAttribute('class', 'hour-forecast-display');

    for (let i = 0; i < 5; i++) {
      const hourForecastCard = document.createElement('div');
      hourForecastCard.setAttribute('class', 'hour-forecast-card');

      const hour = document.createElement('div');
      hour.textContent = forecast[i].time;

      const temp = document.createElement('div');
      temp.textContent = `${forecast[i].temp}°`;

      hourForecastCard.append(hour);
      hourForecastCard.append(temp);

      forecastDisplay.append(hourForecastCard);
    }

    mainForecastDisplay.append(forecastDisplay);
  });
}

function showDailyForecast(cityQuery) {
  getDailyForecast(cityQuery).then((weekForecast) => {
    const mainForecastDisplay = document.querySelector(
      '[data-main-forecast-display]'
    );
    const dailyForecastDisplay = document.createElement('div');
    dailyForecastDisplay.setAttribute('class', 'daily-forecast-display');

    for (let i = 0; i < 5; i++) {
      const dayForecastCard = document.createElement('div');
      dayForecastCard.setAttribute('class', 'day-forecast-card');

      const day = document.createElement('div');
      day.setAttribute('class', 'day');
      day.textContent = weekForecast[i].day;

      const icon = document.createElement('img');
      icon.src = `http://openweathermap.org/img/wn/${weekForecast[i].icon}.png`;

      const maxTemp = document.createElement('div');
      maxTemp.textContent = weekForecast[i].max_temp;
      maxTemp.setAttribute('class', 'max-temp');

      const minTemp = document.createElement('div');
      minTemp.textContent = weekForecast[i].min_temp;
      maxTemp.setAttribute('class', 'min-temp');

      dayForecastCard.append(day);
      dayForecastCard.append(icon);
      dayForecastCard.append(maxTemp);
      dayForecastCard.append(minTemp);

      dailyForecastDisplay.append(dayForecastCard);
    }

    mainForecastDisplay.append(dailyForecastDisplay);
  });
}

// FORM
function createForm() {
  const wrapper = document.createElement('div');
  wrapper.setAttribute('class', 'wrapper');
  wrapper.setAttribute('data-wrapper', '');

  const mainForecastDisplay = document.createElement('div');
  mainForecastDisplay.setAttribute('class', 'main-forecast-display');
  mainForecastDisplay.setAttribute('data-main-forecast-display', '');

  //   submit city form
  const form = document.createElement('form');
  const inputDiv = document.createElement('div');
  inputDiv.setAttribute('class', 'input-city');
  const input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.placeholder = 'Enter a city';
  input.setAttribute('data-input-query', '');

  const searchBtn = document.createElement('button');
  searchBtn.setAttribute('class', 'search-btn');
  searchBtn.innerHTML = '<i class="fa-solid fa-magnifying-glass"></i>';

  inputDiv.append(input);
  inputDiv.append(searchBtn);
  form.append(inputDiv);
  wrapper.append(form);
  wrapper.append(mainForecastDisplay);
  document.body.append(wrapper);
}

function getTemperature(json) {
  let kelvin = 273.15;
  let celsiusTemp = Math.floor(json.main.temp - kelvin) + 1;
  let currentTemp = `${celsiusTemp}°`;

  return currentTemp;
}

function getDate(json) {
  let rawDate = new Date(json.dt * 1000 - json.timezone * 1000);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let monthIndex = rawDate.getMonth();
  let month = months[monthIndex];

  let dayIndex = rawDate.getDay();
  let day = days[dayIndex];

  let date = rawDate.getDate();
  let currentCityDay = `${day}, ${date} ${month}`;

  return currentCityDay;
}

export {
  showCurrentWeather,
  showHourlyForecast,
  showDailyForecast,
  createForm,
};
