import './scss/style.scss';
import getForecast from './modules/get-forecast';
import { createCurrentWeatherCard, createForm } from './modules/dom';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

window.addEventListener('DOMContentLoaded', (e) => {
  startApp(e);
});

function startApp(e) {
  createForm();
  showCurrentWeather(e);
  createCurrentWeatherCard('Malmö');
}

function showCurrentWeather() {
  const form = document.querySelector('form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const weatherCard = e.target.nextSibling;

    const queryInput = document.querySelector('[data-input-query]');
    const cityQuery = queryInput.value;

    getForecast(cityQuery);

    if (weatherCard === null) {
      createCurrentWeatherCard(cityQuery);
    } else if (weatherCard !== null) {
      {
        weatherCard.remove();
        createCurrentWeatherCard(cityQuery);
      }
    }

    queryInput.value = '';
  });
}
