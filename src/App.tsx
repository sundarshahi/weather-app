import CurrentWeather from "./components/CurrentWeather";
import FeaturedCities from "./components/FeaturedCities";
import Forecast from "./components/Forecast";
import Searchbar from "./components/Searchbar";

import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [isfetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState({ q: "berlin" });
  const [units, setUnits] = useState("metric");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      toast.info("Fetching users's Default location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setQuery({
          q: `${lat} ${lon}`,
        });
      });
    }
  }, []);

  useEffect(() => {
    setIsFetching(true);
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data?.location?.name}, ${data?.location?.country}.`
        );

        setWeather(data);
        setIsFetching(false);
      });
    };

    fetchWeather();
  }, [query]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-500 to-blue-500";
    const threshold = units === "metric" ? 20 : 60;
    if (weather?.current?.temp_c <= threshold)
      return "from-cyan-500 to-blue-500";

    return "from-yellow-500 to-orange-500";
  };

  console.log(
    "weather?.forecast?.forecastday?.[0]?.hour",
    weather?.forecast?.forecastday?.[0]?.hour
  );

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-lg shadow-gray-200 ${formatBackground()}`}
    >
      <FeaturedCities />
      <Searchbar setQuery={setQuery} setUnits={setUnits} units={units} />
      {isfetching && !weather ? (
        <div>Loading...</div>
      ) : (
        <>
          <CurrentWeather weather={weather} />
          <Forecast
            title="hourly forecast"
            items={weather?.forecast?.forecastday?.[0]?.hour}
          />
        </>
      )}
      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
