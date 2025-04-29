import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import CourseCard from './CourseCard';
import './Dashboard.css';

// Mock data 
const mockCourses = [
  { id: 1, title: 'Introduction to Programming', students: 32, completion: 68 },
  { id: 2, title: 'Web Development Fundamentals', students: 24, completion: 45 },
  { id: 3, title: 'Data Structures and Algorithms', students: 18, completion: 72 },
];

const mockStudents = [
  { id: 101, name: 'John Doe', email: 'john@example.com', progress: 75 },
  { id: 102, name: 'Jane Smith', email: 'jane@example.com', progress: 92 },
  { id: 103, name: 'Michael Johnson', email: 'michael@example.com', progress: 45 },
];

const mockAssignments = [
  { id: 201, title: 'Final Project', dueDate: '2025-05-15', submissions: 12, total: 24 },
  { id: 202, title: 'Quiz 3', dueDate: '2025-04-30', submissions: 20, total: 24 },
  { id: 203, title: 'Research Paper', dueDate: '2025-05-10', submissions: 15, total: 24 },
];

function TeacherDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState(mockCourses);
  const [students, setStudents] = useState(mockStudents);
  const [assignments, setAssignments] = useState(mockAssignments);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    // Set active tab based on URL
    const path = location.pathname.split('/')[2] || 'dashboard';
    setActiveTab(path);
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/teacher/${tab === 'dashboard' ? '' : tab}`);
  };

  // Course creation form state
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    startDate: '',
  });

  const handleCourseChange = (e) => {
    setNewCourse({
      ...newCourse,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    const course = {
      id: Date.now(),
      title: newCourse.title,
      description: newCourse.description,
      startDate: newCourse.startDate,
      students: 0,
      completion: 0,
    };
    setCourses([...courses, course]);
    setNewCourse({ title: '', description: '', startDate: '' });
  };

  // Dashboard overview component
  const Overview = () => (
    <div className="dashboard-overview">
      <h2>Welcome, {user.name}!</h2>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Active Courses</h3>
          <p className="stat-value">{courses.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-value">{students.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Assignments</h3>
          <p className="stat-value">{assignments.filter(a => new Date(a.dueDate) > new Date()).length}</p>
        </div>
      </div>
      
      <div className="recent-section">
        <h3>Recent Activities</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span className="activity-icon">📝</span>
            <span className="activity-text">New submission for "Final Project" by Jane Smith</span>
            <span className="activity-time">2 hours ago</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">❓</span>
            <span className="activity-text">New question in Web Development forum</span>
            <span className="activity-time">Yesterday</span>
          </div>
          <div className="activity-item">
            <span className="activity-icon">✅</span>
            <span className="activity-text">Graded Quiz 2 for Data Structures class</span>
            <span className="activity-time">2 days ago</span>
          </div>
        </div>
      </div>
      
      <div className="quick-actions">
        <h3>Quick Actions</h3>
        <div className="action-buttons">
          <button onClick={() => handleTabClick('courses')}>Create Course</button>
          <button onClick={() => handleTabClick('assignments')}>Add Assignment</button>
          <button onClick={() => handleTabClick('students')}>View Students</button>
        </div>
      </div>
    </div>
  );

  // Courses component
  const Courses = () => (
    <div className="courses-section">
      <h2>My Courses</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} role="teacher" />
        ))}
      </div>
      
      <div className="create-course-form">
        <h3>Create New Course</h3>
        <form onSubmit={handleCreateCourse}>
          <div className="form-group">
            <label>Course Title</label>
            <input
              type="text"
              name="title"
              value={newCourse.title}
              onChange={handleCourseChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={newCourse.description}
              onChange={handleCourseChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              name="startDate"
              value={newCourse.startDate}
              onChange={handleCourseChange}
              required
            />
          </div>
          <button type="submit">Create Course</button>
        </form>
      </div>
    </div>
  );
  // Students component
  const Students = () => (
    <div className="students-section">
      <h2>My Students</h2>
      <div className="search-filter">
        <input type="text" placeholder="Search students..." />
        <select>
          <option value="">All Courses</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </div>
      
      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${student.progress}%` }}
                  ></div>
                  <span>{student.progress}%</span>
                </div>
              </td>
              <td>
                <button className="action-btn">View Details</button>
                <button className="action-btn">Message</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Assignments component
  const Assignments = () => (
    <div className="assignments-section">
      <h2>Assignments</h2>
      <div className="assignments-list">
        {assignments.map(assignment => (
          <div key={assignment.id} className="assignment-card">
            <div className="assignment-header">
              <h3>{assignment.title}</h3>
              <span className={`due-date ${new Date(assignment.dueDate) < new Date() ? 'overdue' : ''}`}>
                Due: {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
            </div>
            <div className="assignment-stats">
              <span>Submissions: {assignment.submissions}/{assignment.total}</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(assignment.submissions/assignment.total)*100}%` }}
                ></div>
              </div>
            </div>
            <div className="assignment-actions">
              <button>View Submissions</button>
              <button>Edit</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="create-assignment">
        <h3>Create New Assignment</h3>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input type="text" name="title" required />
          </div>
          <div className="form-group">
            <label>Course</label>
            <select name="course" required>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.title}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Instructions</label>
            <textarea name="instructions" required></textarea>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input type="date" name="dueDate" required />
          </div>
          <button type="submit">Create Assignment</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="dashboard teacher-dashboard">
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-pic">
            {user.name.charAt(0)}
          </div>
          <div className="profile-info">
            <h3>{user.name}</h3>
            <p>Teacher</p>
          </div>
        </div>
        
        <nav className="nav-menu">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''}>
              <Link to="/teacher" onClick={() => handleTabClick('dashboard')}>
                Dashboard
              </Link>
            </li>
            <li className={activeTab === 'courses' ? 'active' : ''}>
              <Link to="/teacher/courses" onClick={() => handleTabClick('courses')}>
                Courses
              </Link>
            </li>
            <li className={activeTab === 'students' ? 'active' : ''}>
              <Link to="/teacher/students" onClick={() => handleTabClick('students')}>
                Students
              </Link>
            </li>
            <li className={activeTab === 'assignments' ? 'active' : ''}>
              <Link to="/teacher/assignments" onClick={() => handleTabClick('assignments')}>
                Assignments
              </Link>
            </li>
            <li className={activeTab === 'calendar' ? 'active' : ''}>
              <Link to="/teacher/calendar" onClick={() => handleTabClick('calendar')}>
                Calendar
              </Link>
            </li>
            <li className={activeTab === 'messages' ? 'active' : ''}>
              <Link to="/teacher/messages" onClick={() => handleTabClick('messages')}>
                Messages
              </Link>
            </li>
            <li className={activeTab === 'analytics' ? 'active' : ''}>
              <Link to="/teacher/analytics" onClick={() => handleTabClick('analytics')}>
                Analytics
              </Link>
            </li>
            <li className={activeTab === 'settings' ? 'active' : ''}>
              <Link to="/teacher/settings" onClick={() => handleTabClick('settings')}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="logout-section">
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </div>
      
      <div className="main-content">
        <div className="header">
          <h1>Teacher Dashboard</h1>
          <div className="header-actions">
            <div className="search-bar">
              <input type="text" placeholder="Search..." />
            </div>
            <div className="notifications">
              <span className="notification-icon">🔔</span>
              <span className="notification-badge">3</span>
            </div>
          </div>
        </div>
        
        <div className="content">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/students" element={<Students />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/calendar" element={<div><h2>Calendar</h2><p>Calendar feature coming soon...</p></div>} />
            <Route path="/messages" element={<div><h2>Messages</h2><p>Messaging feature coming soon...</p></div>} />
            <Route path="/analytics" element={<div><h2>Analytics</h2><p>Analytics feature coming soon...</p></div>} />
            <Route path="/settings" element={<div><h2>Settings</h2><p>Settings feature coming soon...</p></div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;