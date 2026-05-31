import React from 'react';
import './About.css';

function About() {
  return (
    <div className="container about-page">
      <div className="about-header">
        <h1>About EduHash LMS</h1>
        <p>Your gateway to world-class online education.</p>
      </div>

      <div className="about-content card">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            At EduHash LMS, our mission is to democratize education by providing accessible, high-quality learning experiences for everyone, everywhere. We believe that education is the most powerful tool for personal and professional growth.
          </p>
        </div>

        <div className="about-section">
          <h2>The Platform</h2>
          <p>
            This Learning Management System was designed from the ground up to offer an intuitive and seamless learning environment. From interactive courses to comprehensive progress tracking, EduHash provides everything you need to succeed.
          </p>
        </div>

        <div className="about-section creator-section">
          <h2>Meet the Creator</h2>
          <div className="creator-profile">
            <div className="creator-avatar">MEH</div>
            <div className="creator-info">
              <h3>Muhammad Ehtisham hashim</h3>
              <p className="creator-role">Lead Developer & Founder</p>
              <p>
                Muhammad Ehtisham hashim is a passionate software engineer dedicated to building impactful educational technology. With expertise in the MERN stack and modern UI/UX design, Ehtisham created this platform to bridge the gap between quality education and accessibility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;