import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
    return (
        <div className="home-container">
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1>Welcome to <span className="highlight">EduHash LMS</span></h1>
                        <p className="hero-subtitle">
                            Empowering learners with world-class education. Join Ehtisham's Academy today and start your learning journey.
                        </p>
                        <div className="hero-actions">
                            <Link to="/courses" className="btn btn-large">Explore Courses</Link>
                            <Link to="/register" className="btn btn-outline">Join Now</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section container">
                <div className="feature-card card">
                    <h3>Expert Instructors</h3>
                    <p>Learn from industry professionals with years of experience.</p>
                </div>
                <div className="feature-card card">
                    <h3>Flexible Learning</h3>
                    <p>Study at your own pace, anytime, anywhere.</p>
                </div>
                <div className="feature-card card">
                    <h3>Career Growth</h3>
                    <p>Gain skills that are in high demand in today's job market.</p>
                </div>
            </section>
        </div>
    );
}

export default Home;