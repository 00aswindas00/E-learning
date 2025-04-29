
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check if user is logged in from localStorage or session
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={
            user ? (
              <Navigate to={user.role === 'teacher' ? '/teacher' : '/student'} />
            ) : (
              <Auth onLogin={handleLogin} />
            )
          } />
          <Route path="/teacher/*" element={
            user && user.role === 'teacher' ? (
              <TeacherDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/student/*" element={
            user && user.role === 'student' ? (
              <StudentDashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
