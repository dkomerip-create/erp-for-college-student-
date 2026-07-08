import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/StudentDetail.css';

function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    marks: ''
  });

  useEffect(() => {
    fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await axios.get(`/api/students/${id}`);
      setStudent(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        attendance: response.data.attendance,
        marks: response.data.marks
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching student:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/students/${id}`, formData);
      setStudent(response.data);
      setEditing(false);
      alert('Student updated successfully!');
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Error updating student');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!student) {
    return <div className="error">Student not found</div>;
  }

  const attendancePercentage = student.attendance;
  const marksPercentage = (student.marks / 100) * 100;

  return (
    <div className="student-detail-container">
      <button onClick={() => navigate('/students')} className="btn btn-secondary">
        ← Back to Students
      </button>

      <div className="student-detail">
        <div className="detail-header">
          <div className="student-avatar">
            <span>{student.name.charAt(0).toUpperCase()}</span>
          </div>
          <div className="student-info">
            <h1>{student.name}</h1>
            <p className="roll-number">Roll Number: {student.rollNumber}</p>
            <p className="email">{student.email}</p>
          </div>
        </div>

        {!editing ? (
          <>
            <div className="performance-section">
              <h2>Academic Performance</h2>
              <div className="performance-grid">
                <div className="performance-card">
                  <h3>Attendance</h3>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${attendancePercentage}%`,
                        backgroundColor: attendancePercentage >= 75 ? '#4CAF50' : '#FF9800'
                      }}
                    ></div>
                  </div>
                  <p className="performance-value">{student.attendance}%</p>
                </div>

                <div className="performance-card">
                  <h3>Marks</h3>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${marksPercentage}%`,
                        backgroundColor: student.marks >= 70 ? '#4CAF50' : '#FF9800'
                      }}
                    ></div>
                  </div>
                  <p className="performance-value">{student.marks}/100</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="btn btn-primary"
            >
              Edit Student
            </button>
          </>
        ) : (
          <form className="edit-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Attendance (%)</label>
              <input
                type="number"
                name="attendance"
                value={formData.attendance}
                onChange={handleChange}
                min="0"
                max="100"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Marks</label>
              <input
                type="number"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                min="0"
                max="100"
                className="form-input"
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleSave}
                className="btn btn-primary"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default StudentDetail;