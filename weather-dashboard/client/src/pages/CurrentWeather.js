import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/CurrentWeather.css';

function CurrentWeather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('London');
  const [units, setUnits] = useState('metric');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetchWeather(city);
  }, [units]);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/weather/current/${cityName}`, {
        params: { units }
      });
      setWeather(response.data);
      setCity(cityName);
      setSearchInput('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchWeather(searchInput.trim());
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
    <div className="current-weather-container">
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
      {loading && <div className="loading">Loading weather data...</div>}

      {weather && !loading && (
        <div className="weather-content">
          <div className="weather-main">
            <div className="weather-icon">
              {getWeatherIcon(weather.icon)}
            </div>
            <div className="weather-info">
              <h1>{weather.city}, {weather.country}</h1>
              <p className="temperature">{weather.temperature}°</p>
              <p className="description">{weather.description}</p>
              <p className="feels-like">Feels like {weather.feelsLike}°</p>
            </div>
          </div>

          <div className="weather-details">
            <div className="detail-card">
              <span className="icon">💧</span>
              <div>
                <p className="label">Humidity</p>
                <p className="value">{weather.humidity}%</p>
              </div>
            </div>
            <div className="detail-card">
              <span className="icon">💨</span>
              <div>
                <p className="label">Wind Speed</p>
                <p className="value">{weather.windSpeed} m/s</p>
              </div>
            </div>
            <div className="detail-card">
              <span className="icon">🔍</span>
              <div>
                <p className="label">Visibility</p>
                <p className="value">{(weather.visibility / 1000).toFixed(1)} km</p>
              </div>
            </div>
            <div className="detail-card">
              <span className="icon">🌫️</span>
              <div>
                <p className="label">Pressure</p>
                <p className="value">{weather.pressure} hPa</p>
              </div>
            </div>
            <div className="detail-card">
              <span className="icon">☁️</span>
              <div>
                <p className="label">Cloudiness</p>
                <p className="value">{weather.cloudiness}%</p>
              </div>
            </div>
            <div className="detail-card">
              <span className="icon">🌅</span>
              <div>
                <p className="label">Sunrise</p>
                <p className="value">{new Date(weather.sunrise).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
            <div className="detail-card">
              <span className="icon">🌇</span>
              <div>
                <p className="label">Sunset</p>
                <p className="value">{new Date(weather.sunset).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
            <div className="detail-card">
              <span className="icon">🌍</span>
              <div>
                <p className="label">Wind Direction</p>
                <p className="value">{weather.windDeg}°</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrentWeather;
