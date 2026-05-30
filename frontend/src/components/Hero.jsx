import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero-section py-5 d-flex align-items-center">
      <div className="container position-relative">
        <div className="row align-items-center g-5">
          <div className="col-lg-6 text-center text-lg-start">
            <span className="section-kicker">Modern LMS experience</span>
            <h1 className="display-3 fw-bolder mb-4">
              Modern Learning Platform Built For <span className="text-gradient">Students & Instructors</span>
            </h1>
            <p className="lead mb-5 fs-4 text-muted hero-copy">
              Interactive online courses, lesson management, secure authentication, progress tracking, and a role-based learning experience.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-lg-start gap-3">
              <Link to="/courses" className="btn btn-primary-custom btn-lg px-5 py-3 rounded-pill fw-bold">Explore Courses</Link>
              <Link to="/register" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold">Start Teaching</Link>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="dashboard-mockup">
              <div className="mockup-topbar">
                <span></span><span></span><span></span>
                <strong>LMS Dashboard</strong>
              </div>
              <div className="mockup-grid">
                <div className="metric-card">
                  <small>Student Portal</small>
                  <strong>Progress Tracking</strong>
                  <div className="preview-lines">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="metric-card accent">
                  <small>Enrollment Flow</small>
                  <strong>Course Access</strong>
                  <div className="preview-pills">
                    <span>Browse</span>
                    <span>Enroll</span>
                    <span>Learn</span>
                  </div>
                </div>
                <div className="course-panel">
                  <div className="panel-heading">
                    <span>Course Management</span>
                    <b>Instructor</b>
                  </div>
                  <div className="course-row"><span>Create and update courses</span><em>Ready</em></div>
                  <div className="course-row"><span>Upload lessons</span><em>Secure</em></div>
                  <div className="course-row"><span>Manage students</span><em>Role based</em></div>
                </div>
                <div className="learning-panel">
                  <div>
                    <small>Admin Workspace</small>
                    <strong>User, course, and activity control</strong>
                  </div>
                  <div className="progress progress-thin">
                    <div className="progress-bar" style={{ width: "100%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
