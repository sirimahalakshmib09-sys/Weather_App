//React imports
import { useState } from "react";
import "./App.css";
//Weather background images
import sunny from "./assets/sunny.jpg";
import cloudy from "./assets/cloudy.jpg";
import rainy from "./assets/rainy.jpg";
//Main component
function App() {
//State variables
  const [city, setCity] = useState("");
  const [weatherdata, setWeatherdata] = useState(null);
  const [searchedcity, setSearchedcity] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
//HandleSearch Function-Search weather by city name 
  const handleSearch = async () => {
    //Prevent empty searches
    if (!city.trim()) return;
    setLoading(true);
    setError("");
    try {
      //Get city coordinates
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
      );

      const data = await response.json();
      //Show error if city is not found
      if (!data.results) {
        setError("City Not Found!!");
        setLoading(false);
        return;
      }
      //Extract latitude and longitude
      const latitude = data.results[0].latitude;
      const longitude = data.results[0].longitude;
      //Fetch weather details
      const weatherresponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`
      );

      const weather = await weatherresponse.json();

      console.log(weather.daily.sunrise[0]);
      console.log(weather.daily.sunset[0]);
      //Store weather data
      setWeatherdata(weather);
      setSearchedcity(data.results[0].name);
      setCountry(data.results[0].country);
      setCity("");
    } catch (err) {
      //Handle API errors
      setError("Something went wrong!");
    } finally {
      //Stop loading animation
      setLoading(false);
    }
  };
//Get eather using current location
  const getCurrentLocation = () => {
    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          //Get device coordinates
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          //Fetch weather for current location
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&daily=sunrise,sunset,weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5&timezone=auto`
          );

          const weather = await response.json();

          console.log(weather.daily.sunrise[0]);
          console.log(weather.daily.sunset[0]);
          //Save data
          setWeatherdata(weather);
          setSearchedcity("My Location");
          setCountry("");
        } catch (err) {
          //location weather fetch failed 
          setError("Unable to fetch weather");
        }

        setLoading(false);
      },
      //User denied location access
      () => {
        setError("Location access denied");
        setLoading(false);
      }
    );
  };
//Convert Celsius to Fahrenheit
  const fahrenheit = weatherdata
    ? (weatherdata.current.temperature_2m * 9) / 5 + 32
    : null;
//Convert weather codes into readable conditions
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
//Current date
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
//Current time
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
//Format sunrise time
  const sunriseTime = weatherdata
    ? new Date(weatherdata.daily.sunrise[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";
//Format sunset time
  const sunsetTime = weatherdata
    ? new Date(weatherdata.daily.sunset[0]).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";
//Default background
  let backgroundImage = sunny;
//Change background based on weather
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
        {/*App title*/}
        <h1>Weather app</h1>
        {/*City search imput*/}
        <input
          type="text"
          placeholder="Search City..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        {/*SEarch and location buttons*/}
        <button onClick={handleSearch}>Search</button>

        <button onClick={getCurrentLocation}>
          📍 Use My Location
        </button>
        {/*Loading message*/}
        {loading && <h2>🌦️ Loading Weather...</h2>}
        {/*Error message*/}
        {error && <h3>{error}</h3>}
        {/*Weather details*/}
        {weatherdata && (
          <div className="weather-info">
            <h1 className="weather-icon">
              {weathercondition.split(" ")[0]}
            </h1>
            {/*Location*/}
            <h2>
              {searchedcity}
              {country && `,${country}`}
            </h2>
            {/*Date and time*/}
            <p>{currentDate}</p>
            <p>{currentTime}</p>
             {/* Weather condition */}
            <p className="condition">
              {weathercondition
                .split(" ")
                .slice(1)
                .join(" ")}
            </p>
            {/* Temperature */}
            <h1 className="temp">
              {weatherdata.current.temperature_2m}°C
            </h1>
            {/* Feels like and Fahrenheit */}
            <p>
              Feels Like:
              {weatherdata.current.apparent_temperature}°C
            </p>

            <h3>{fahrenheit.toFixed(1)}°F</h3>
            {/* Weather stats cards */}
            <div className="details">
              <div className="detail-card">
                {/* Humidity */}
                <p>
                  Humidity:
                  <br />
                  {weatherdata.current.relative_humidity_2m}%
                </p>
              </div>
              {/* Wind speed */}
              <div className="detail-card">
                <p>
                  Wind Speed:
                  <br />
                  {weatherdata.current.wind_speed_10m} km/h
                </p>
              </div>
              {/* Sunrise */}
              <div className="detail-card">
                <p>
                  Sunrise:
                  <br />
                  {sunriseTime}
                </p>
              </div>
               {/* Sunset */}
              <div className="detail-card">
                <p>
                  Sunset:
                  <br />
                  {sunsetTime}
                </p>
              </div>
            </div>
              {/* 5-day weather forecast */}
            <h2>5-Day Forecast</h2>

            <div className="forecast-container">
               {/* Forecast cards */}
              {weatherdata.daily.time.map((day, index) => (
                <div key={index} className="forecast-card">
                  {/* Day */}
                  <p>
                    {new Date(day).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "short",
                      }
                    )}
                  </p>
                   {/* Weather icon */}
                  <p>
                    {weatherdata.daily.weather_code[index] === 0
                      ? "☀️"
                      : weatherdata.daily.weather_code[index] <= 3
                      ? "⛅"
                      : weatherdata.daily.weather_code[index] <= 48
                      ? "☁️"
                      : "🌧️"}
                  </p>
                    {/* Max temperature */}
                  <p>
                    ⬆️{" "}
                    {
                      weatherdata.daily
                        .temperature_2m_max[index]
                    }
                    °C
                  </p>
                   {/* Min temperature */}
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
//Exporting component
export default App;