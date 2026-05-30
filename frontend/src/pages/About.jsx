import { Link } from "react-router-dom";

export default function About() {
  return (
    <main className="landing-page text-light">
      <section className="py-5">
        <div className="container py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <span className="section-kicker">About EduLMS</span>
              <h1 className="display-4 fw-bold mb-4">A Complete Learning Management System</h1>
              <p className="lead text-muted mb-4">
                EduLMS connects students, instructors, and administrators through secure accounts, course management, enrollments, lesson tracking, and analytics.
              </p>
              <Link to="/courses" className="btn btn-primary-custom btn-lg rounded-pill px-5">Browse Courses</Link>
            </div>
            <div className="col-lg-5">
              <div className="saas-card p-4">
                <h3 className="fw-bold mb-3">Project Modules</h3>
                <ul className="list-unstyled mb-0">
                  <li className="check-line mb-3">JWT authentication</li>
                  <li className="check-line mb-3">Role-based dashboards</li>
                  <li className="check-line mb-3">Course and lesson management</li>
                  <li className="check-line mb-3">Student enrollments and progress</li>
                  <li className="check-line">Admin analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
