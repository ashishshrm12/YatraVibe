

import React, { useState } from "react";
import "../Styles/weather.css";
import Newsletter from "../shared/Newsletter";

const API_KEY = "1e047deacde751d2e93d57584dc1fe92";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const weather = await weatherRes.json();

      // Fetch 5-day forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecast = await forecastRes.json();

      if (weatherRes.ok && forecastRes.ok) {
        setWeatherData(weather);
        const dailyData = forecast.list.filter((reading) =>
          reading.dt_txt.includes("12:00:00")
        );
        setForecastData(dailyData);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="weather__container">
      <h2>Check Weather</h2>
      <div className="weather__form">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn primary__btn" onClick={fetchWeather}>
          {loading ? "Loading..." : "Get Weather"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather__result">
          <h3>{weatherData.name}</h3>
          <p>
            <strong>{weatherData.weather[0].main}</strong> —{" "}
            {weatherData.weather[0].description}
          </p>
          <p>🌡️ Temperature: {weatherData.main.temp} °C</p>
          <p>💨 Wind Speed: {weatherData.wind.speed} m/s</p>
          <p>💧 Humidity: {weatherData.main.humidity}%</p>
        </div>
      )}

      {forecastData.length > 0 && (
        <div className="forecast__container">
          <h3>5-Day Forecast</h3>
          <div className="forecast__grid">
            {forecastData.map((day, index) => (
              <div key={index} className="forecast__card">
                <p>{new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                />
                <p>{day.weather[0].main}</p>
                <p>{Math.round(day.main.temp)}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
    <Newsletter />
        </>
  );
};

export default Weather;
