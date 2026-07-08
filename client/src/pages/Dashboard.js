import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentsRes = await axios.get('/api/students');
      const coursesRes = await axios.get('/api/courses');
      setStudents(studentsRes.data);
      setCourses(coursesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const avgAttendance = students.length > 0
    ? (students.reduce((sum, s) => sum + s.attendance, 0) / students.length).toFixed(1)
    : 0;

  const avgMarks = students.length > 0
    ? (students.reduce((sum, s) => sum + s.marks, 0) / students.length).toFixed(1)
    : 0;

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>Total Students</h3>
            <p className="stat-value">{students.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <h3>Total Courses</h3>
            <p className="stat-value">{courses.length}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>Avg Attendance</h3>
            <p className="stat-value">{avgAttendance}%</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <h3>Avg Marks</h3>
            <p className="stat-value">{avgMarks}/100</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-section">
          <h2>Recent Students</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll No</th>
                <th>Attendance</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.slice(0, 5).map(student => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>
                    <span className="badge">{student.attendance}%</span>
                  </td>
                  <td>
                    <span className="badge">{student.marks}/100</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="dashboard-section">
          <h2>Courses</h2>
          <div className="courses-list">
            {courses.map(course => (
              <div key={course.id} className="course-item">
                <h4>{course.name}</h4>
                <p className="course-code">{course.code}</p>
                <p className="course-instructor">👨‍🏫 {course.instructor}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;