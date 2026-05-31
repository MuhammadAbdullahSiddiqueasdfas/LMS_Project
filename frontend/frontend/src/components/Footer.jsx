import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h3>EduHash LMS</h3>
          <p>Created by Muhammad Ehtisham hashim</p>
        </div>
        <div className="footer-links">
          <h4>Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/courses">Courses</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ehtisham's Academy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
