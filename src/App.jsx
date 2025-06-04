import { useState } from 'react';
import axios from 'axios';
import './index.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [location, setLocation] = useState('');
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const input = location.trim();
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${encodeURIComponent(input)}&days=5&aqi=no&alerts=no`;
      const response = await axios.get(url);
      const data = response.data;

      setCurrent(data.current);
      setForecast(data.forecast.forecastday);
      setHourly(data.forecast.forecastday[0].hour);
      setError('');
    } catch (err) {
      console.error(err);
      setError('⚠️ Unable to fetch weather. Please check the input.');
      setCurrent(null);
      setForecast([]);
      setHourly([]);
    }
  };

  const getMyLocationWeather = () => {
    if (!navigator.geolocation) {
      setError("⚠️ Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&aqi=no&alerts=no`;
        const response = await axios.get(url);
        const data = response.data;

        setCurrent(data.current);
        setForecast(data.forecast.forecastday);
        setHourly(data.forecast.forecastday[0].hour);
        setError('');
      } catch (err) {
        console.error(err);
        setError('⚠️ Could not get weather for your location.');
      }
    }, () => {
      setError("⚠️ Permission denied or unable to retrieve your location.");
    });
  };

  return (
    <div className="container">
      <h1>🌤️ Weather Forecast App</h1>
      <input
        type="text"
        placeholder="🔍 Enter city, ZIP, landmark, or GPS (lat,lon)"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={fetchWeather}>🔎 Get Weather</button>
        <button onClick={getMyLocationWeather} style={{ marginLeft: '1rem' }}>📍 Use My Location</button>
      </div>
      {error && <p className="error">{error}</p>}

      {current && (
        <>
          <div className="current">
            <h2>📍 Weather in {location}</h2>
            <p>🌡️ Temp: {current.temp_c}°C | 🤒 Feels like: {current.feelslike_c}°C</p>
            <p>💧 Humidity: {current.humidity}% | 💨 Wind: {current.wind_kph} kph</p>
            <img src={current.condition.icon} alt="condition" />
            <p>{current.condition.text}</p>
          </div>

          <div>
            <h3>⏰ Hourly Forecast (Today)</h3>
            <div className="forecast-row">
              {hourly.map((hour, idx) => (
                <div key={idx} className="card">
                  <p>{hour.time.split(' ')[1]}</p>
                  <img src={hour.condition.icon} alt="icon" />
                  <p>{hour.temp_c}°C</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3>📅 5-Day Forecast</h3>
            <div className="forecast-row">
              {forecast.map((day, idx) => (
                <div key={idx} className="card">
                  <p>{day.date}</p>
                  <img src={day.day.condition.icon} alt="icon" />
                  <p>🌡️ {day.day.avgtemp_c}°C</p>
                  <p>{day.day.condition.text}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
