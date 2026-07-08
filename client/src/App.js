import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import StudentList from './pages/StudentList';
import StudentDetail from './pages/StudentDetail';
import AddStudent from './pages/AddStudent';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
              📚 College ERP
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
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/students" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Students
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/courses" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/add-student" className="nav-link" onClick={() => setMenuOpen(false)}>
                  Add Student
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<StudentList />} />
            <Route path="/students/:id" element={<StudentDetail />} />
            <Route path="/add-student" element={<AddStudent />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 College Student ERP. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;