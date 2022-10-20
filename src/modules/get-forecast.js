import getCurrentweather from './get-weather';

let WEATHER_API_KEY = 'a81e03c8d54e3f2e938c5105c6e861e3';

export default async function getForecast(cityQuery) {
  try {
    let json = await getCurrentweather(cityQuery);

    let lat = json.coord.lat;
    let lon = json.coord.lon;

    let responseForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
    );

    let jsonForecast = await responseForecast.json();

    let listOfForecast = jsonForecast.list;

    let rawDates = listOfForecast.map((item) => new Date(item.dt * 1000));

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let dayIndex = rawDates.map((date) => date.getDay());
    let days = dayIndex.map((index) => daysOfWeek[index]);

    let dates = rawDates.map((date) => date.getDate());
    let hours = rawDates.map((date) => date.getHours());

    let forecastDates = [];
    let len = days.length;

    for (let i = 0; i < len; i++) {
      forecastDates.push({ data: `${days[i]} ${dates[i]}` });
    }

    console.log(forecastDates);

    return jsonForecast;
  } catch (err) {
    console.log(err);
  }
}
