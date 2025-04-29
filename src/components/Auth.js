import React, { useState } from 'react';
import './Auth.css';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || 'User',
      email: formData.email,
      role: role,
    };
    onLogin(userData);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-left">
        <div className="company-info">
          <h1>Our E-Learning Platform</h1>
          <p>Empowering individuals and educators with high-quality online education solutions.</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-container">
          <div className="auth-form">
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
              <button type="submit" className="auth-button">
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>
            <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Login"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
