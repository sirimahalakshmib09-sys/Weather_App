import { useState } from "react";
import "./App.css";
import sunny from "./assets/sunny.jpg";
import cloudy from "./assets/cloudy.jpg";
import rainy from "./assets/rainy.jpg";

function App() {
  const [city, setCity] = useState("");
  const [weatherdata, setWeatherdata] = useState(null);
  const [searchedcity, setSearchedcity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );

      const data = await response.json();

      if (!data.results) {
        setError("City Not Found!!");
        setLoading(false);
        return;
      }

      const latitude = data.results[0].latitude;
      const longitude = data.results[0].longitude;

      const weatherresponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`
      );

      const weather = await weatherresponse.json();

      console.log(weather.daily.sunrise[0]);
      console.log(weather.daily.sunset[0]);

      setWeatherdata(weather);
      setSearchedcity(data.results[0].name);
      setCountry(data.results[0].country);
      setCity("");
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`
          );

          const weather = await response.json();

          console.log(weather.daily.sunrise[0]);
          console.log(weather.daily.sunset[0]);

          setWeatherdata(weather);
          setSearchedcity("My Location");
          setCountry("");
        } catch (err) {
          setError("Unable to fetch weather");
        }

        setLoading(false);
      },
      () => {
        setError("Location access denied");
        setLoading(false);
      }
    );
  };

  const fahrenheit = weatherdata
    ? (weatherdata.current.temperature_2m * 9) / 5 + 32
    : null;

  let weathercondition = "";

  if (weatherdata) {
    const code = weatherdata.current.weather_code;

    if (code === 0) {
      weathercondition = "☀️ Sunny";
    } else if (code <= 3) {
      weathercondition = "⛅ Partly Cloudy";
    } else if (code <= 48) {
      weathercondition = "☁️ Cloudy";
    } else {
      weathercondition = "🌧️ Rainy";
    }
  }

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunriseTime = weatherdata
    ? new Date(weatherdata.daily.sunrise[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  const sunsetTime = weatherdata
    ? new Date(weatherdata.daily.sunset[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  let backgroundImage = sunny;

  if (weathercondition.includes("Cloudy")) {
    backgroundImage = cloudy;
  } else if (weathercondition.includes("Rainy")) {
    backgroundImage = rainy;
  }

  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="weathercard">
        <h1>Weather app</h1>

        <input
          type="text"
          placeholder="Search City..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        <button onClick={handleSearch}>Search</button>

        <button onClick={getCurrentLocation}>
          📍 Use My Location
        </button>

        {loading && <h2>🌦️ Loading Weather...</h2>}

        {error && <h3>{error}</h3>}

        {weatherdata && (
          <div className="weather-info">
            <h1 className="weather-icon">
              {weathercondition.split(" ")[0]}
            </h1>

            <h2>
              {searchedcity}
              {country && `,${country}`}
            </h2>

            <p>{currentDate}</p>
            <p>{currentTime}</p>

            <p className="condition">
              {weathercondition
                .split(" ")
                .slice(1)
                .join(" ")}
            </p>

            <h1 className="temp">
              {weatherdata.current.temperature_2m}°C
            </h1>

            <p>
              Feels Like:
              {weatherdata.current.apparent_temperature}°C
            </p>

            <h3>{fahrenheit.toFixed(1)}°F</h3>

            <div className="details">
              <div className="detail-card">
                <p>
                  Humidity:
                  <br />
                  {weatherdata.current.relative_humidity_2m}%
                </p>
              </div>

              <div className="detail-card">
                <p>
                  Wind Speed:
                  <br />
                  {weatherdata.current.wind_speed_10m} km/h
                </p>
              </div>

              <div className="detail-card">
                <p>
                  Sunrise:
                  <br />
                  {sunriseTime}
                </p>
              </div>

              <div className="detail-card">
                <p>
                  Sunset:
                  <br />
                  {sunsetTime}
                </p>
              </div>
            </div>

            <h2>5-Day Forecast</h2>

            <div className="forecast-container">
              {weatherdata.daily.time.map((day, index) => (
                <div key={index} className="forecast-card">
                  <p>
                    {new Date(day).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                      }
                    )}
                  </p>

                  <p>
                    {weatherdata.daily.weather_code[index] === 0
                      ? "☀️"
                      : weatherdata.daily.weather_code[index] <= 3
                      ? "⛅"
                      : weatherdata.daily.weather_code[index] <= 48
                      ? "☁️"
                      : "🌧️"}
                  </p>

                  <p>
                    ⬆️{" "}
                    {
                      weatherdata.daily
                        .temperature_2m_max[index]
                    }
                    °C
                  </p>

                  <p>
                    ⬇️{" "}
                    {
                      weatherdata.daily
                        .temperature_2m_min[index]
                    }
                    °C
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;