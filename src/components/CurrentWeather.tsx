import { FaTemperatureHigh } from "react-icons/fa";
import { CiDroplet } from "react-icons/ci";
import { FiWind } from "react-icons/fi";
import { WiSunrise } from "react-icons/wi";
import { TbSunset2 } from "react-icons/tb";
import { formatToLocalTime } from "../services/weatherService";

function CurrentWeather({ weather }: any) {
  const {
    location: { name, country, tz_id, localtime_epoch },
    current: { feelslike_c, temp_c, humidity, wind_kph, condition },
    forecast,
  } = weather || { location: {}, current: {}, forecast: {} };
  const {
    astro: { sunrise, sunset },
    day: { maxtemp_c, mintemp_c },
  } = forecast?.forecastday?.[0] || { astro: {}, day: {} };
  console.log(weather, "weather");
  return (
    <div>
      <div>
        <div className="flex items-center justify-center my-6">
          <p className="text-white text-xl font-extralight">
            {formatToLocalTime(localtime_epoch, tz_id)}
          </p>
        </div>

        <div className="flex items-center justify-center my-3">
          <p className="text-white text-3xl font-medium">{`${name}, ${country}`}</p>
        </div>
      </div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{condition?.text}</p>
      </div>

      <div className="flex flex-row items-center justify-between text-white py-3">
        <img src={condition?.icon} alt="" className="w-20" />
        <p className="text-5xl">{`${temp_c?.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <FaTemperatureHigh size={18} className="mr-1" />
            Real fell:
            <span className="font-medium ml-1">{`${feelslike_c?.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <CiDroplet size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{`${humidity?.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <FiWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${wind_kph?.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <WiSunrise />
        <p className="font-light">
          Rise: <span className="font-medium ml-1">{sunrise}</span>
        </p>
        <p className="font-light">|</p>

        <TbSunset2 />
        <p className="font-light">
          Set: <span className="font-medium ml-1">{sunset}</span>
        </p>
        <p className="font-light">|</p>

        <WiSunrise />
        <p className="font-light">
          High:{" "}
          <span className="font-medium ml-1">{`${maxtemp_c?.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>

        <WiSunrise />
        <p className="font-light">
          Low:{" "}
          <span className="font-medium ml-1">{`${mintemp_c?.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default CurrentWeather;
