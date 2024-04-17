import { DateTime } from "luxon";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const getWeatherData = (searchParams) => {
  const url = new URL(BASE_URL);
  url.search = new URLSearchParams({ ...searchParams, key: API_KEY });

  return fetch(url).then((res) => res.json());
};

const getFormattedWeatherData = async (searchParams: string) => {
  const formattedForecastWeather = await getWeatherData({
    q: searchParams?.q,
  }).then((data) => data);

  return { ...formattedForecastWeather };
};

const formatToLocalTime = (
  secs: number,
  zone: string,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => (secs ? DateTime.fromSeconds(secs).setZone(zone).toFormat(format) : "N/a");

export default getFormattedWeatherData;

export { formatToLocalTime };
