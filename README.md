# College Student ERP Platform

A comprehensive web-based ERP (Enterprise Resource Planning) system designed to track and manage student academic records, including attendance and marks.

## 📋 Features

- **Student Management**
  - View all students with detailed information
  - Add new students with enrollment details
  - Update student attendance and marks
  - Search and filter students
  - Delete student records

- **Academic Tracking**
  - Track student attendance percentage
  - Manage student marks/grades
  - View performance analytics
  - Monitor academic progress

- **Course Management**
  - Add and manage courses
  - Assign instructors to courses
  - View course details
  - Course code management

- **Dashboard**
  - View key statistics
  - Recent student list
  - Course overview
  - Average attendance and marks

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional - currently using in-memory storage)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/dkomerip-create/erp-for-college-student-.git
cd erp-for-college-student-
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

Edit `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/erp-college-student
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

### Running the Application

#### Option 1: Run both backend and frontend separately

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

#### Option 2: Run backend server (Frontend in production mode)
```bash
npm run build
npm start
```

## 📁 Project Structure

```
erp-for-college-student-/
├── server.js                 # Express server
├── package.json              # Backend dependencies
├── .env.example              # Environment variables template
│
└── client/                   # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── pages/
    │   │   ├── Dashboard.js
    │   │   ├── StudentList.js
    │   │   ├── StudentDetail.js
    │   │   ├── AddStudent.js
    │   │   └── Courses.js
    │   ├── styles/
    │   │   ├── Dashboard.css
    │   │   ├── StudentList.css
    │   │   ├── StudentDetail.css
    │   │   ├── AddStudent.css
    │   │   └── Courses.css
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json          # Frontend dependencies
```

## 🔌 API Endpoints

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create new course

### Health
- `GET /api/health` - Server health check

## 📊 Database

Currently using in-memory storage. To switch to MongoDB:

1. Install mongoose: `npm install mongoose`
2. Update `server.js` with MongoDB connection
3. Create schema files for Student and Course models

## 🎨 UI/UX Features

- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Interactive performance charts
- Progress bars for attendance and marks
- Clean and modern UI with gradient backgrounds
- Mobile hamburger menu
- Search and filter functionality

## 🔐 Security Notes

- Replace JWT_SECRET with a strong random string
- Add authentication middleware for production
- Implement role-based access control
- Validate all inputs on backend

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🛠️ Technologies Used

### Backend
- Node.js
- Express.js
- CORS
- dotenv

### Frontend
- React
- React Router
- Axios
- CSS3

## 📝 Future Enhancements

- [ ] User authentication and authorization
- [ ] MongoDB integration
- [ ] Email notifications
- [ ] Attendance QR code system
- [ ] Grade report generation (PDF)
- [ ] Student login portal
- [ ] Parent notifications
- [ ] Performance analytics graphs
- [ ] Data export functionality
- [ ] SMS alerts

## 🤝 Contributing

Feel free to fork this repository and submit pull requests with improvements.

## 📄 License

ISC

## 📞 Support

For issues and questions, please create an issue in the repository.

---

**Made with ❤️ for college students**