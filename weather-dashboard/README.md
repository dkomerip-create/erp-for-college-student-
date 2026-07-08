# 🌤️ Weather Dashboard

A real-time weather dashboard application that fetches data from the OpenWeatherMap API. Display current weather, forecasts, air quality, and weather for multiple locations.

## 🎯 Features

- **Current Weather** - Real-time weather data for any city
- **5-Day Forecast** - Upcoming weather predictions
- **Multiple Locations** - Compare weather across multiple cities
- **Air Quality Index** - Check air quality data with pollution components
- **Unit Toggle** - Switch between Celsius and Fahrenheit
- **Responsive Design** - Works on mobile, tablet, and desktop
- **Weather Icons** - Visual weather indicators
- **Caching** - In-memory caching for better performance
- **Rate Limiting** - API request rate limiting

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### Installation

1. **Clone the repository**
```bash
cd weather-dashboard
```

2. **Install backend dependencies**
```bash
npm install
```

3. **Install frontend dependencies**
```bash
cd client
npm install
cd ..
```

4. **Create .env file**
```bash
cp .env.example .env
```

5. **Add your OpenWeatherMap API key**
Edit `.env`:
```
PORT=5000
OPENWEATHER_API_KEY=your_api_key_here
NODE_ENV=development
```

### Running the Application

#### Option 1: Run backend and frontend separately

**Terminal 1 - Backend**
```bash
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend**
```bash
cd client
npm start
# App runs on http://localhost:3000
```

#### Option 2: Run production build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
weather-dashboard/
├── server.js              # Express server with API endpoints
├── package.json           # Backend dependencies
├── .env.example           # Environment variables template
│
└── client/                # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── pages/
    │   │   ├── CurrentWeather.js
    │   │   ├── Forecast.js
    │   │   ├── MultipleLocations.js
    │   │   └── AirQuality.js
    │   ├── styles/
    │   │   ├── CurrentWeather.css
    │   │   ├── Forecast.css
    │   │   ├── MultipleLocations.css
    │   │   └── AirQuality.css
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🔌 API Endpoints

### Current Weather
```
GET /api/weather/current/:city?units=metric
```

### 5-Day Forecast
```
GET /api/weather/forecast/:city?units=metric
```

### Multiple Cities Weather
```
POST /api/weather/multiple
Body: { "cities": ["London", "New York"], "units": "metric" }
```

### Air Quality
```
GET /api/weather/air-quality/:lat/:lon
```

### Health Check
```
GET /api/health
```

## 🎨 Features Explained

### Current Weather Page
- Search for any city worldwide
- Display current temperature, humidity, wind speed, visibility, pressure
- Show sunrise/sunset times
- Visual weather icons
- Toggle between Celsius and Fahrenheit

### Forecast Page
- 5-day weather forecast
- Min/max temperatures
- Precipitation probability
- Humidity and wind information

### Multiple Locations
- Compare weather across multiple cities
- Add/remove cities dynamically
- Quick city selector
- Real-time updates

### Air Quality
- Air Quality Index (AQI) with color-coded levels
- Pollution components: CO, NO₂, O₃, SO₂, PM2.5, PM10
- AQI scale explanation
- Multiple city comparison

## 📊 Data Caching

Weather data is cached for 10 minutes to:
- Reduce API calls
- Improve performance
- Stay within API rate limits

## 🔐 Security

- API key stored in environment variables
- Rate limiting (100 requests per 15 minutes)
- CORS enabled for cross-origin requests
- Input validation

## 🌐 Supported Units

- **Metric**: Celsius (°C), meters/second (m/s), kilometers (km)
- **Imperial**: Fahrenheit (°F), miles/hour (mph), miles (mi)

## 🎯 OpenWeatherMap API

This app uses the free tier of OpenWeatherMap API:
- Current weather data
- 5-day forecast
- Air pollution (Air Quality Index)

Get your free API key: https://openweathermap.org/api

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- Axios (HTTP client)
- CORS
- dotenv
- Express Rate Limit

### Frontend
- React 18
- React Router
- Axios
- CSS3 with Backdrop Filters

## 📈 Future Enhancements

- [ ] User authentication and saved locations
- [ ] Weather alerts and notifications
- [ ] Historical weather data
- [ ] Weather maps and satellite imagery
- [ ] UV index tracking
- [ ] Pollen forecasts
- [ ] Carbon footprint tracking
- [ ] Weather comparison charts
- [ ] Mobile app (React Native)
- [ ] Dark/Light theme toggle

## 🐛 Troubleshooting

### API Key Error
- Ensure you've set `OPENWEATHER_API_KEY` in `.env`
- Verify your API key is correct at https://openweathermap.org
- Free API key may have limitations

### "City not found" Error
- Check spelling of city name
- Use English city names
- Try with country code (e.g., "London, GB")

### CORS Error
- Backend server must be running on http://localhost:5000
- Ensure `proxy` in `client/package.json` points to correct backend URL

## 📄 License

ISC

## 📞 Support

For issues or questions, please create an issue in the repository.

---

**Made with ❤️ for weather enthusiasts**
