import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AirQuality.css';

function AirQuality() {
  const [airQuality, setAirQuality] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 51.5074, lon: -0.1278 }); // London
  const [cityName, setCityName] = useState('London');

  useEffect(() => {
    if (coordinates.lat && coordinates.lon) {
      fetchAirQuality(coordinates.lat, coordinates.lon);
    }
  }, []);

  const fetchAirQuality = async (lat, lon) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/weather/air-quality/${lat}/${lon}`);
      setAirQuality(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch air quality data');
    } finally {
      setLoading(false);
    }
  };

  const getAirQualityColor = (level) => {
    const colors = {
      1: '#2ecc71', // Green - Good
      2: '#f1c40f', // Yellow - Fair
      3: '#e67e22', // Orange - Moderate
      4: '#e74c3c', // Red - Poor
      5: '#8b0000'  // Dark Red - Very Poor
    };
    return colors[level] || '#95a5a6';
  };

  const sampleCities = [
    { name: 'London', lat: 51.5074, lon: -0.1278 },
    { name: 'New York', lat: 40.7128, lon: -74.0060 },
    { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
    { name: 'Delhi', lat: 28.7041, lon: 77.1025 },
    { name: 'Beijing', lat: 39.9042, lon: 116.4074 },
    { name: 'Los Angeles', lat: 34.0522, lon: -118.2437 }
  ];

  const handleCitySelect = (city) => {
    setCityName(city.name);
    setCoordinates({ lat: city.lat, lon: city.lon });
    fetchAirQuality(city.lat, city.lon);
  };

  return (
    <div className="air-quality-container">
      <h1>Air Quality Index (AQI)</h1>
      
      <div className="city-selector">
        <h3>Select a city:</h3>
        <div className="city-buttons">
          {sampleCities.map((city) => (
            <button
              key={city.name}
              className={`city-btn ${cityName === city.name ? 'active' : ''}`}
              onClick={() => handleCitySelect(city)}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="error">{error}</div>}
      {loading && <div className="loading">Loading air quality data...</div>}

      {airQuality && !loading && (
        <div className="air-quality-content">
          <div className="aqi-main">
            <h2>{cityName}</h2>
            <div
              className="aqi-level"
              style={{ backgroundColor: getAirQualityColor(airQuality.level) }}
            >
              <p className="aqi-value">{airQuality.aqi}</p>
              <p className="aqi-level-text">Level {airQuality.level}/5</p>
            </div>
          </div>

          <div className="components-grid">
            <div className="component-card">
              <h3>CO (Carbon Monoxide)</h3>
              <p className="value">{(airQuality.components.co / 1000).toFixed(2)} mg/m³</p>
            </div>
            <div className="component-card">
              <h3>NO₂ (Nitrogen Dioxide)</h3>
              <p className="value">{airQuality.components.no2.toFixed(2)} µg/m³</p>
            </div>
            <div className="component-card">
              <h3>O₃ (Ozone)</h3>
              <p className="value">{airQuality.components.o3.toFixed(2)} µg/m³</p>
            </div>
            <div className="component-card">
              <h3>SO₂ (Sulfur Dioxide)</h3>
              <p className="value">{airQuality.components.so2.toFixed(2)} µg/m³</p>
            </div>
            <div className="component-card">
              <h3>PM2.5 (Fine Particles)</h3>
              <p className="value">{airQuality.components.pm25.toFixed(2)} µg/m³</p>
            </div>
            <div className="component-card">
              <h3>PM10 (Coarse Particles)</h3>
              <p className="value">{airQuality.components.pm10.toFixed(2)} µg/m³</p>
            </div>
          </div>

          <div className="aqi-legend">
            <h3>Air Quality Index Scale:</h3>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#2ecc71' }}></div>
              <p>1 - Good: Air quality is satisfactory</p>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#f1c40f' }}></div>
              <p>2 - Fair: Acceptable air quality</p>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#e67e22' }}></div>
              <p>3 - Moderate: Some members of the general public may experience health effects</p>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#e74c3c' }}></div>
              <p>4 - Poor: Members of the general public begin to experience health effects</p>
            </div>
            <div className="legend-item">
              <div className="legend-color" style={{ backgroundColor: '#8b0000' }}></div>
              <p>5 - Very Poor: Health effects are experienced by the general public</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AirQuality;
