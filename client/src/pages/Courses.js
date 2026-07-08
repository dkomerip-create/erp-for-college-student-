import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Courses.css';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    instructor: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses');
      setCourses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/courses', formData);
      setCourses([...courses, response.data]);
      setFormData({ name: '', code: '', instructor: '' });
      setShowForm(false);
      alert('Course added successfully!');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Error adding course');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="courses-container">
      <div className="courses-header">
        <h1>Courses</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? '✕ Cancel' : '+ Add New Course'}
        </button>
      </div>

      {showForm && (
        <div className="add-course-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Course Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter course name"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Course Code *</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter course code"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Instructor</label>
              <input
                type="text"
                name="instructor"
                value={formData.instructor}
                onChange={handleChange}
                placeholder="Enter instructor name"
                className="form-input"
              />
            </div>

            <button type="submit" className="btn btn-success">
              Add Course
            </button>
          </form>
        </div>
      )}

      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map(course => (
            <div key={course.id} className="course-card">
              <div className="course-header">
                <h2>{course.name}</h2>
                <span className="course-code">{course.code}</span>
              </div>
              <div className="course-body">
                <p><strong>Instructor:</strong> {course.instructor}</p>
              </div>
              <div className="course-footer">
                <small>Course ID: {course.id}</small>
              </div>
            </div>
          ))
        ) : (
          <div className="no-courses">No courses available</div>
        )}
      </div>
    </div>
  );
}

export default Courses;