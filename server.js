const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from React
app.use(express.static(path.join(__dirname, 'client/build')));

// In-memory database (for demo, replace with MongoDB)
let students = [
  { id: 1, name: 'John Doe', email: 'john@example.com', rollNumber: '001', attendance: 85, marks: 78 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', rollNumber: '002', attendance: 90, marks: 88 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', rollNumber: '003', attendance: 75, marks: 72 }
];

let courses = [
  { id: 1, name: 'Mathematics', code: 'MATH101', instructor: 'Dr. Smith' },
  { id: 2, name: 'Physics', code: 'PHY101', instructor: 'Dr. Johnson' },
  { id: 3, name: 'Chemistry', code: 'CHEM101', instructor: 'Dr. Brown' }
];

// Routes

// Get all students
app.get('/api/students', (req, res) => {
  res.json(students);
});

// Get student by ID
app.get('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  res.json(student);
});

// Add new student
app.post('/api/students', (req, res) => {
  const { name, email, rollNumber, attendance, marks } = req.body;
  
  if (!name || !email || !rollNumber) {
    return res.status(400).json({ message: 'Name, email, and roll number are required' });
  }

  const newStudent = {
    id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
    name,
    email,
    rollNumber,
    attendance: attendance || 0,
    marks: marks || 0
  };

  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
app.put('/api/students/:id', (req, res) => {
  const student = students.find(s => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }

  Object.assign(student, req.body);
  res.json(student);
});

// Delete student
app.delete('/api/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Student not found' });
  }

  students.splice(index, 1);
  res.json({ message: 'Student deleted' });
});

// Get all courses
app.get('/api/courses', (req, res) => {
  res.json(courses);
});

// Add new course
app.post('/api/courses', (req, res) => {
  const { name, code, instructor } = req.body;
  
  if (!name || !code) {
    return res.status(400).json({ message: 'Name and code are required' });
  }

  const newCourse = {
    id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
    name,
    code,
    instructor: instructor || 'TBD'
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running', timestamp: new Date() });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
});