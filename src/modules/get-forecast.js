import getCurrentweather from './get-weather';

let WEATHER_API_KEY = 'a81e03c8d54e3f2e938c5105c6e861e3';

export async function getHourlyForecast(cityQuery) {
  try {
    let json = await getCurrentweather(cityQuery);

    let lat = json.coord.lat;
    let lon = json.coord.lon;

    let responseForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    let jsonForecast = await responseForecast.json();

    let forecastList = jsonForecast.list;

    let rawDates = forecastList.map((item) => new Date(item.dt * 1000));

    // Temperature
    let temperature = forecastList.map((item) => {
      let kelvinTemp = item.main.temp;
      let kelvin = 273.15;
      let celsiusTemp = Math.floor(kelvinTemp - kelvin) + 1;

      return celsiusTemp;
    });

    // Hours
    let hours = rawDates.map((date) => {
      let rawHours = date.getHours();
      let hour = rawHours > 12 ? `${rawHours - 12} pm` : `${rawHours} am`;

      return hour;
    });

    let hourlyForecast = [];
    let len = temperature.length;

    for (let i = 0; i < len; i++) {
      hourlyForecast.push({
        time: hours[i],
        temp: temperature[i],
      });
    }

    // let dailyForecast = [];
    // for (let i = 0; i < len; i++) {
    //   dailyForecast.push({
    //     day: days[i],
    //     icon: icons[i],
    //     max_temp: maxTemp[i],
    //     min_temp: minTemp[i],
    //   });
    // }

    return hourlyForecast;
  } catch (err) {
    console.log(err);
  }
}

export async function getDailyForecast(cityQuery) {
  try {
    let json = await getCurrentweather(cityQuery);

    let lat = json.coord.lat;
    let lon = json.coord.lon;

    let responseForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    let jsonForecast = await responseForecast.json();

    let forecastList = jsonForecast.list;

    let rawDates = forecastList.map((item) => new Date(item.dt * 1000));

    // Temperature
    let temperature = forecastList.map((item) => {
      let kelvinTemp = item.main.temp;
      let kelvin = 273.15;
      let celsiusTemp = Math.floor(kelvinTemp - kelvin) + 1;

      return celsiusTemp;
    });

    let maxTemp = forecastList.map((item) => {
      let kelvinTemp = item.main.temp_max;
      let kelvin = 273.15;
      let celsiusTemp = Math.floor(kelvinTemp - kelvin) + 1;

      return celsiusTemp;
    });

    let minTemp = forecastList.map((item) => {
      let kelvinTemp = item.main.temp_min;
      let kelvin = 273.15;
      let celsiusTemp = Math.floor(kelvinTemp - kelvin) + 1;

      return celsiusTemp;
    });

    // Days
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    let dayIndex = rawDates.map((date) => date.getDay());
    let days = dayIndex.map((index) => daysOfWeek[index]);

    // Hours
    let hours = rawDates.map((date) => {
      let rawHours = date.getHours();
      let hour = rawHours > 12 ? `${rawHours - 12} pm` : `${rawHours} am`;

      return hour;
    });

    let icons = forecastList.map((item) => {
      return item.weather[0].icon;
    });

    let hourlyForecast = [];
    let len = temperature.length;

    for (let i = 0; i < len; i++) {
      hourlyForecast.push({
        time: hours[i],
        temp: temperature[i],
      });
    }

    let dailyForecast = [];
    for (let i = 0; i < len; i++) {
      dailyForecast.push({
        day: days[i],
        icon: icons[i],
        max_temp: maxTemp[i],
        min_temp: minTemp[i],
      });
    }

    const sun = dailyForecast.find(
      (forecast) => forecast.day === daysOfWeek[0]
    );
    const mon = dailyForecast.find(
      (forecast) => forecast.day === daysOfWeek[1]
    );
    const tue = dailyForecast.find(
      (forecast) => forecast.day === daysOfWeek[2]
    );
    const wed = dailyForecast.find(
      (forecast) => forecast.day === daysOfWeek[3]
    );
    const thu = dailyForecast.find(
      (forecast) => forecast.day === daysOfWeek[4]
    );

    const fri = dailyForecast.find(
      (forecast) => forecast.day === daysOfWeek[5]
    );

    const sat = dailyForecast.find(
      (forecast) => forecast.day === daysOfWeek[6]
    );

    const weekForecast = [sun, mon, tue, wed, thu, fri, sat];

    return weekForecast;
  } catch (err) {
    console.log(err);
  }
}
