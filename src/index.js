import './scss/style.scss';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import {
  showCurrentWeather,
  showHourlyForecast,
  showDailyForecast,
  createForm,
} from './modules/dom';

const App = (function () {
  const findlocalWeather = () => {
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
  };

  const showForecast = (cityQuery) => {
    showCurrentWeather(cityQuery);
    showHourlyForecast(cityQuery);
    showDailyForecast(cityQuery);
  };

  const start = (e) => {
    createForm();
    findlocalWeather(e);
    showForecast('Malmö');
  };

  return { start };
})();

App.start();
