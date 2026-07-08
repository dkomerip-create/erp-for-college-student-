const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const axios = require('axios');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Cache for weather data (in-memory)
const weatherCache = {};
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

function isCacheValid(city) {
  if (!weatherCache[city]) return false;
  return Date.now() - weatherCache[city].timestamp < CACHE_DURATION;
}

// Get current weather
app.get('/api/weather/current/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const units = req.query.units || 'metric';

    // Check cache
    const cacheKey = `${city}-${units}`;
    if (isCacheValid(cacheKey)) {
      return res.json(weatherCache[cacheKey].data);
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: units
        }
      }
    );

    const weatherData = {
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      humidity: response.data.main.humidity,
      pressure: response.data.main.pressure,
      windSpeed: response.data.wind.speed,
      windDeg: response.data.wind.deg,
      cloudiness: response.data.clouds.all,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      main: response.data.weather[0].main,
      sunrise: new Date(response.data.sys.sunrise * 1000),
      sunset: new Date(response.data.sys.sunset * 1000),
      visibility: response.data.visibility,
      uvIndex: response.data.uvi || 'N/A',
      units: units,
      timestamp: Date.now()
    };

    // Cache the data
    weatherCache[cacheKey] = {
      data: weatherData,
      timestamp: Date.now()
    };

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error.message);
    if (error.response?.status === 404) {
      res.status(404).json({ error: 'City not found' });
    } else if (error.response?.status === 401) {
      res.status(401).json({ error: 'Invalid API key' });
    } else {
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  }
});

// Get forecast
app.get('/api/weather/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const units = req.query.units || 'metric';

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: city,
          appid: OPENWEATHER_API_KEY,
          units: units
        }
      }
    );

    const forecast = response.data.list
      .filter((_, index) => index % 8 === 0) // Get one forecast per day (every 8 * 3-hour periods)
      .slice(0, 5) // Get 5 days
      .map(item => ({
        date: new Date(item.dt * 1000),
        temp: Math.round(item.main.temp),
        tempMin: Math.round(item.main.temp_min),
        tempMax: Math.round(item.main.temp_max),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        windSpeed: item.wind.speed,
        humidity: item.main.humidity,
        precipitation: item.rain ? item.rain['3h'] : 0
      }));

    res.json({
      city: response.data.city.name,
      country: response.data.city.country,
      forecast: forecast,
      units: units
    });
  } catch (error) {
    console.error('Error fetching forecast:', error.message);
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
});

// Get multiple cities weather
app.post('/api/weather/multiple', async (req, res) => {
  try {
    const { cities, units = 'metric' } = req.body;

    if (!Array.isArray(cities) || cities.length === 0) {
      return res.status(400).json({ error: 'Please provide an array of cities' });
    }

    const weatherDataPromises = cities.map(city =>
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: OPENWEATHER_API_KEY,
            units: units
          }
        }
      ).then(response => ({
        city: response.data.name,
        country: response.data.sys.country,
        temperature: Math.round(response.data.main.temp),
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed
      }))
      .catch(() => ({
        city: city,
        error: 'Failed to fetch data'
      }))
    );

    const weatherData = await Promise.all(weatherDataPromises);
    res.json({ data: weatherData, units: units });
  } catch (error) {
    console.error('Error fetching multiple weather data:', error.message);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Get air quality
app.get('/api/weather/air-quality/:lat/:lon', async (req, res) => {
  try {
    const { lat, lon } = req.params;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/air_pollution`,
      {
        params: {
          lat: lat,
          lon: lon,
          appid: OPENWEATHER_API_KEY
        }
      }
    );

    const aqi = response.data.list[0].main.aqi;
    const components = response.data.list[0].components;

    const aqiLabels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'];

    res.json({
      aqi: aqiLabels[aqi - 1] || 'Unknown',
      level: aqi,
      components: {
        co: components.co,
        no2: components.no2,
        o3: components.o3,
        so2: components.so2,
        pm25: components.pm2_5,
        pm10: components.pm10
      }
    });
  } catch (error) {
    console.error('Error fetching air quality:', error.message);
    res.status(500).json({ error: 'Failed to fetch air quality data' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Weather Dashboard API is running',
    timestamp: new Date(),
    apiKey: OPENWEATHER_API_KEY ? 'configured' : 'not configured'
  });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌤️  Weather Dashboard Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
});
