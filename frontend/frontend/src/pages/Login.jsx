import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-card card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Log in to your EduHash LMS account</p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="input-field" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="input-field" placeholder="Enter your password" required />
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-full">Log In</button>
        </form>

        <div className="auth-footer">
          <p>Don't have an account? <Link to="/register">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;