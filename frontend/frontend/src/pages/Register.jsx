import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-card card">
        <h2>Create an Account</h2>
        <p className="auth-subtitle">Join EduHash LMS to start learning</p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" className="input-field" placeholder="John Doe" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" className="input-field" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" className="input-field" placeholder="Create a password" required />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" id="confirmPassword" className="input-field" placeholder="Confirm your password" required />
          </div>

          <button type="submit" className="btn btn-full">Sign Up</button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;