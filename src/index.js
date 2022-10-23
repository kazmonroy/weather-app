import './scss/style.scss';
import { getHourlyForecast, getDailyForecast } from './modules/get-forecast';
import { showCurrentWeather, createForm } from './modules/dom';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

window.addEventListener('DOMContentLoaded', (e) => {
  startApp(e);
});

function startApp(e) {
  createForm();
  findlocalWeather(e);
  showForecast('Malmö');
}

function findlocalWeather() {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const mainForecastDisplay = e.target.nextSibling;

    const queryInput = document.querySelector('[data-input-query]');
    const cityQuery = queryInput.value;

    mainForecastDisplay.textContent = '';
    showForecast(cityQuery);
    queryInput.value = '';
  });
}

function showForecast(cityQuery) {
  showCurrentWeather(cityQuery);
  showHourlyForecast(cityQuery);
  showDailyForecast(cityQuery);
}

function showHourlyForecast(cityQuery) {
  getHourlyForecast(cityQuery).then((forecast) => {
    const mainForecastDisplay = document.querySelector(
      '[data-main-forecast-display]'
    );

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
