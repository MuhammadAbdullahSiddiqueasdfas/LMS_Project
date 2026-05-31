import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          EduHash <span className="highlight">LMS</span>
        </Link>
        <ul className="navbar-menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <div className="navbar-actions">
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="btn">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
