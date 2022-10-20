let PEXELS_API_KEY = '563492ad6f917000010000011b0450e2ec8347eb9e414e77dece0c2a';

export default async function getLocationImgBackground(cityName) {
  try {
    const data = await fetch(
      `https://api.pexels.com/v1/search?query=${cityName}&per_page=1`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    const response = await data.json();
    const src = response.photos[0].src.portrait;
    return src;
  } catch (err) {
    console.log(err);
  }
}
