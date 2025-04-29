import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import CourseCard from './CourseCard';
import './Dashboard.css';

// Mock data 
const mockEnrolledCourses = [
  { id: 1, title: 'Introduction to Programming', progress: 68, instructor: 'Dr. Alan Smith' },
  { id: 2, title: 'Web Development Fundamentals', progress: 45, instructor: 'Prof. Sarah Johnson' },
];

const mockAvailableCourses = [
  { id: 3, title: 'Data Structures and Algorithms', instructor: 'Dr. Michael Lee' },
  { id: 4, title: 'Machine Learning Basics', instructor: 'Dr. Emma Wilson' },
  { id: 5, title: 'Cloud Computing', instructor: 'Prof. Robert Brown' },
];

const mockAssignments = [
  { id: 101, title: 'Final Project', course: 'Introduction to Programming', dueDate: '2025-05-15', status: 'Not Started' },
  { id: 102, title: 'Quiz 3', course: 'Web Development Fundamentals', dueDate: '2025-04-30', status: 'Completed' },
  { id: 103, title: 'Research Paper', course: 'Introduction to Programming', dueDate: '2025-05-10', status: 'In Progress' },
];

const mockGrades = [
  { id: 201, assignment: 'Midterm Exam', course: 'Introduction to Programming', grade: '85/100', feedback: 'Good work!' },
  { id: 202, title: 'Quiz 2', course: 'Web Development Fundamentals', grade: '90/100', feedback: 'Excellent!' },
];

function StudentDashboard({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [enrolledCourses, setEnrolledCourses] = useState(mockEnrolledCourses);
  const [availableCourses, setAvailableCourses] = useState(mockAvailableCourses);
  const [assignments, setAssignments] = useState(mockAssignments);
  const [grades, setGrades] = useState(mockGrades);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  useEffect(() => {
    // Set active tab based on URL
    const path = location.pathname.split('/')[2] || 'dashboard';
    setActiveTab(path);
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    navigate(`/student/${tab === 'dashboard' ? '' : tab}`);
  };

  const handleEnroll = (courseId) => {
    const course = availableCourses.find(c => c.id === courseId);
    if (course) {
      const enrolledCourse = {
        ...course,
        progress: 0,
      };
      setEnrolledCourses([...enrolledCourses, enrolledCourse]);
      setAvailableCourses(availableCourses.filter(c => c.id !== courseId));
    }
  };

  // Dashboard overview component
  const Overview = () => (
    <div className="dashboard-overview">
      <h2>Welcome, {user.name}!</h2>
      <div className="stats-container">
        <div className="stat-card">
          <h3>Enrolled Courses</h3>
          <p className="stat-value">{enrolledCourses.length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Assignments</h3>
          <p className="stat-value">
            {assignments.filter(a => a.status !== 'Completed' && new Date(a.dueDate) > new Date()).length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Average Progress</h3>
          <p className="stat-value">
            {Math.round(enrolledCourses.reduce((acc, course) => acc + course.progress, 0) / enrolledCourses.length)}%
          </p>
        </div>
      </div>
      
      <div className="current-courses">
        <h3>Current Courses</h3>
        <div className="courses-grid">
          {enrolledCourses.slice(0, 2).map(course => (
            <CourseCard key={course.id} course={course} role="student" />
          ))}
        </div>
      </div>
      
      <div className="upcoming-assignments">
        <h3>Upcoming Assignments</h3>
        <div className="assignments-list">
          {assignments
            .filter(a => a.status !== 'Completed' && new Date(a.dueDate) > new Date())
            .slice(0, 3)
            .map(assignment => (
              <div key={assignment.id} className="assignment-item">
                <div>
                  <h4>{assignment.title}</h4>
                  <p>{assignment.course}</p>
                </div>
                <div>
                  <p className="due-date">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                  <span className={`status-badge ${assignment.status.toLowerCase().replace(' ', '-')}`}>
                    {assignment.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // Courses component
  const Courses = () => (
    <div className="courses-section">
      <h2>My Courses</h2>
      <div className="courses-grid">
        {enrolledCourses.map(course => (
          <CourseCard key={course.id} course={course} role="student" />
        ))}
      </div>
      
      <h3>Available Courses</h3>
      <div className="courses-grid">
        {availableCourses.map(course => (
          <div key={course.id} className="course-card available">
            <div className="course-info">
              <h3>{course.title}</h3>
              <p>Instructor: {course.instructor}</p>
            </div>
            <button onClick={() => handleEnroll(course.id)} className="enroll-btn">Enroll</button>
          </div>
        ))}
      </div>
    </div>
  );

  // Assignments component
  const Assignments = () => (
    <div className="assignments-section">
      <h2>My Assignments</h2>
      <div className="filter-bar">
        <select>
          <option value="">All Courses</option>
          {enrolledCourses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
        <select>
          <option value="">All Statuses</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <div className="assignments-table-container">
        <table className="assignments-table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Course</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map(assignment => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td>{assignment.course}</td>
                <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                <td>
                  <span className={`status-badge ${assignment.status.toLowerCase().replace(' ', '-')}`}>
                    {assignment.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn">View</button>
                  {assignment.status !== 'Completed' && (
                    <button className="action-btn submit">Submit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Grades component
  const Grades = () => (
    <div className="grades-section">
      <h2>My Grades</h2>
      <div className="filter-bar">
        <select>
          <option value="">All Courses</option>
          {enrolledCourses.map(course => (
            <option key={course.id} value={course.id}>{course.title}</option>
          ))}
        </select>
      </div>
      
      <div className="grades-table-container">
        <table className="grades-table">
          <thead>
            <tr>
              <th>Assignment</th>
              <th>Course</th>
              <th>Grade</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {grades.length > 0 ? grades.map(grade => (
              <tr key={grade.id}>
                <td>{grade.assignment}</td>
                <td>{grade.course}</td>
                <td>{grade.grade}</td>
                <td>{grade.feedback}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="no-data">No grades available yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="grades-summary">
        <h3>Grade Summary</h3>
        <div className="courses-grades">
          {enrolledCourses.map(course => (
            <div key={course.id} className="course-grade-card">
              <h4>{course.title}</h4>
              <div className="grade-display">
                <span className="grade-value">
                  {course.id === 1 ? '87%' : course.id === 2 ? '90%' : 'N/A'}
                </span>
                <div className="grade-letter">
                  {course.id === 1 ? 'B+' : course.id === 2 ? 'A-' : 'N/A'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard student-dashboard">
      <div className="sidebar">
        <div className="profile-section">
          <div className="profile-pic">
            {user.name.charAt(0)}
          </div>
          <div className="profile-info">
            <h3>{user.name}</h3>
            <p>Student</p>
          </div>
        </div>
        
        <nav className="nav-menu">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''}>
              <Link to="/student" onClick={() => handleTabClick('dashboard')}>
                Dashboard
              </Link>
            </li>
            <li className={activeTab === 'courses' ? 'active' : ''}>
              <Link to="/student/courses" onClick={() => handleTabClick('courses')}>
                Courses
              </Link>
            </li>
            <li className={activeTab === 'assignments' ? 'active' : ''}>
              <Link to="/student/assignments" onClick={() => handleTabClick('assignments')}>
                Assignments
              </Link>
            </li>
            <li className={activeTab === 'grades' ? 'active' : ''}>
              <Link to="/student/grades" onClick={() => handleTabClick('grades')}>
                Grades
              </Link>
            </li>
            <li className={activeTab === 'calendar' ? 'active' : ''}>
              <Link to="/student/calendar" onClick={() => handleTabClick('calendar')}>
                Calendar
              </Link>
            </li>
            <li className={activeTab === 'messages' ? 'active' : ''}>
                <Link to="/student/messages" onClick={() => handleTabClick('messages')}>
                Messages
                </Link>
                </li>
                <li className={activeTab === 'forum' ? 'active' : ''}>
                <Link to="/student/forum" onClick={() => handleTabClick('forum')}>
                Discussion Forum
                </Link>
                </li>
                <li className={activeTab === 'settings' ? 'active' : ''}>
                <Link to="/student/settings" onClick={() => handleTabClick('settings')}>
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
                <h1>Student Dashboard</h1>
                <div className="header-actions">
                <div className="search-bar">
                <input type="text" placeholder="Search..." />
                </div>
                <div className="notifications">
                <span className="notification-icon">🔔</span>
                <span className="notification-badge">2</span>
                </div>
                </div>
                </div>
                
                <div className="content">
                <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/grades" element={<Grades />} />
                <Route path="/calendar" element={<div><h2>Calendar</h2><p>Calendar feature coming soon...</p></div>} />
                <Route path="/messages" element={<div><h2>Messages</h2><p>Messaging feature coming soon...</p></div>} />
                <Route path="/forum" element={<div><h2>Discussion Forum</h2><p>Forum feature coming soon...</p></div>} />
                <Route path="/settings" element={<div><h2>Settings</h2><p>Settings feature coming soon...</p></div>} />
                </Routes>
                </div>
                </div>
                </div>
                );
                }
                
                export default StudentDashboard;