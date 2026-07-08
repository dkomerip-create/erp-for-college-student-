import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import CurrentWeather from './pages/CurrentWeather';
import Forecast from './pages/Forecast';
import MultipleLocations from './pages/MultipleLocations';
import AirQuality from './pages/AirQuality';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
              🌤️ Weather Dashboard
            </Link>
            <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
              <div className={menuOpen ? 'hamburger hamburger-active' : 'hamburger'}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
            <ul className={menuOpen ? 'nav-menu active' : 'nav-menu'}>
              <li className="nav-item">
                <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Current Weather
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/forecast" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Forecast
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/multiple" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Multiple Cities
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/air-quality" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Air Quality
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<CurrentWeather />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/multiple" element={<MultipleLocations />} />
            <Route path="/air-quality" element={<AirQuality />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Weather Dashboard. Data from OpenWeatherMap API.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
