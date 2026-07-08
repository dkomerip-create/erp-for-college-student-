import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MultipleLocations.css';

function MultipleLocations() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [cities, setCities] = useState('London,New York,Tokyo,Dubai,Sydney');
  const [units, setUnits] = useState('metric');
  const [newCity, setNewCity] = useState('');

  useEffect(() => {
    fetchMultipleWeather(cities);
  }, [units]);

  const fetchMultipleWeather = async (citiesList) => {
    setLoading(true);
    setError('');
    try {
      const cityArray = citiesList.split(',').map(c => c.trim()).filter(c => c);
      const response = await axios.post('/api/weather/multiple', {
        cities: cityArray,
        units
      });
      setWeatherData(response.data.data);
      setCities(citiesList);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCity = (e) => {
    e.preventDefault();
    if (newCity.trim()) {
      const updatedCities = cities + ',' + newCity;
      fetchMultipleWeather(updatedCities);
      setNewCity('');
    }
  };

  const handleRemoveCity = (cityName) => {
    const updatedCities = cities
      .split(',')
      .map(c => c.trim())
      .filter(c => c !== cityName)
      .join(',');
    if (updatedCities) {
      fetchMultipleWeather(updatedCities);
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
    <div className="multiple-locations-container">
      <div className="add-city-section">
        <form onSubmit={handleAddCity} className="add-city-form">
          <input
            type="text"
            placeholder="Add a city..."
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            className="city-input"
          />
          <button type="submit" className="add-btn">+ Add City</button>
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

      <div className="locations-grid">
        {weatherData.map((data, index) => (
          <div key={index} className="location-card">
            {!data.error ? (
              <>
                <div className="card-header">
                  <h3>{data.city}, {data.country}</h3>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveCity(data.city)}
                    title="Remove this city"
                  >
                    ×
                  </button>
                </div>
                <div className="icon">{getWeatherIcon(data.icon)}</div>
                <p className="temperature">{data.temperature}°</p>
                <p className="description">{data.description}</p>
                <div className="card-details">
                  <p>💧 {data.humidity}%</p>
                  <p>💨 {data.windSpeed} m/s</p>
                </div>
              </>
            ) : (
              <div className="error-card">
                <p>{data.city}</p>
                <p className="error-text">{data.error}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MultipleLocations;
