import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Forecast.css';

function Forecast() {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('London');
  const [units, setUnits] = useState('metric');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchForecast(city);
  }, [units]);

  const fetchForecast = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/weather/forecast/${cityName}`, {
        params: { units }
      });
      setForecast(response.data);
      setCity(cityName);
      setSearchInput('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch forecast data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchForecast(searchInput.trim());
    }
  };

  const getWeatherIcon = (iconCode) => {
    const iconMap = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '🌥️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  return (
    <div className="forecast-container">
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">Search</button>
        </form>
        
        <div className="units-toggle">
          <button
            className={`unit-btn ${units === 'metric' ? 'active' : ''}`}
            onClick={() => setUnits('metric')}
          >
            °C
          </button>
          <button
            className={`unit-btn ${units === 'imperial' ? 'active' : ''}`}
            onClick={() => setUnits('imperial')}
          >
            °F
          </button>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading forecast data...</div>}

      {forecast && !loading && (
        <div className="forecast-content">
          <h1>{forecast.city}, {forecast.country} - 5-Day Forecast</h1>
          <div className="forecast-grid">
            {forecast.forecast.map((day, index) => (
              <div key={index} className="forecast-card">
                <p className="date">{new Date(day.date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                <div className="icon">{getWeatherIcon(day.icon)}</div>
                <p className="description">{day.description}</p>
                <div className="temps">
                  <span className="temp-max">{day.tempMax}°</span>
                  <span className="temp-min">{day.tempMin}°</span>
                </div>
                <div className="details">
                  <p>💧 {day.humidity}%</p>
                  <p>💨 {day.windSpeed} m/s</p>
                  <p>🌧️ {day.precipitation.toFixed(1)} mm</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Forecast;
