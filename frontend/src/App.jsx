import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  fetchWeatherEntries,
  createWeatherEntry,
  deleteWeatherEntry,
  updateWeatherEntry
} from './api/weatherAPI';
import './index.css';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [location, setLocation] = useState('');
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [error, setError] = useState('');
  const [entries, setEntries] = useState([]);
  const [editEntry, setEditEntry] = useState(null);
  const [editForm, setEditForm] = useState({
    temperature: '',
    humidity: '',
    description: ''
  });

  const loadSavedWeather = async () => {
    try {
      const res = await fetchWeatherEntries();
      setEntries(res.data);
    } catch (err) {
      console.error("Failed to load saved weather:", err);
    }
  };

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

      try {
        await createWeatherEntry({
          location: data.location.name,
          dateRange: {
            start: data.forecast.forecastday[0].date,
            end: data.forecast.forecastday[data.forecast.forecastday.length - 1].date
          },
          temperature: `${data.current.temp_c}°C`,
          humidity: `${data.current.humidity}%`,
          description: data.current.condition.text
        });
        loadSavedWeather();
      } catch (backendErr) {
        console.warn("⚠️ Weather shown, but saving to backend failed.");
      }

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

        try {
          await createWeatherEntry({
            location: data.location.name,
            dateRange: {
              start: data.forecast.forecastday[0].date,
              end: data.forecast.forecastday[data.forecast.forecastday.length - 1].date
            },
            temperature: `${data.current.temp_c}°C`,
            humidity: `${data.current.humidity}%`,
            description: data.current.condition.text
          });
          loadSavedWeather();
        } catch (backendErr) {
          console.warn("⚠️ Weather shown, but saving to backend failed.");
        }

      } catch (err) {
        console.error(err);
        setError('⚠️ Could not get weather for your location.');
      }
    }, () => {
      setError("⚠️ Permission denied or unable to retrieve your location.");
    });
  };

  const handleDelete = async (id) => {
    await deleteWeatherEntry(id);
    loadSavedWeather();
  };

  const startEditing = (entry) => {
    setEditEntry(entry._id);
    setEditForm({
      temperature: entry.temperature || '',
      humidity: entry.humidity || '',
      description: entry.description || ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (id) => {
    await updateWeatherEntry(id, editForm);
    setEditEntry(null);
    setEditForm({ temperature: '', humidity: '', description: '' });
    loadSavedWeather();
  };

  useEffect(() => {
    loadSavedWeather();
  }, []);

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

      <div style={{ marginTop: '2rem' }}>
        <h2>📦 Saved Weather Entries</h2>
        <ul>
          {entries.map((entry) => (
            <li key={entry._id}>
              📍 {entry.location} |{' '}
              {editEntry === entry._id ? (
                <>
                  <input name="temperature" value={editForm.temperature} onChange={handleEditChange} placeholder="Temperature" />
                  <input name="humidity" value={editForm.humidity} onChange={handleEditChange} placeholder="Humidity" />
                  <input name="description" value={editForm.description} onChange={handleEditChange} placeholder="Description" />
                  <button onClick={() => handleEditSubmit(entry._id)}>✅ Save</button>
                  <button onClick={() => setEditEntry(null)}>❌ Cancel</button>
                </>
              ) : (
                <>
                  {entry.temperature} | {entry.humidity} | {entry.description}
                  <button onClick={() => startEditing(entry)} style={{ marginLeft: '1rem' }}>✏️ Edit</button>
                  <button onClick={() => handleDelete(entry._id)} style={{ marginLeft: '0.5rem' }}>🗑️ Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
