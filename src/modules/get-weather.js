let WEATHER_API_KEY = 'a81e03c8d54e3f2e938c5105c6e861e3';

export default async function getCurrentweather(cityQuery) {
  try {
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${WEATHER_API_KEY}`,
      { mode: 'cors' }
    );
    let json = await response.json();

    return json;
  } catch (err) {
    console.log(err);
  }
}
