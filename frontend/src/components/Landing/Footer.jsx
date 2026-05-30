import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="pt-5 pb-3 footer-section">
      <div className="container pt-4">
        <div className="row mb-5">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-3">
              <img src="/logo/logo.png" alt="Abdrax Learner" height="80" style={{ objectFit: "contain" }} />
            </div>
            <p className="text-muted pe-lg-5">
              Empowering learners and educators with a modern, secure, and scalable learning management platform.
            </p>
          </div>
          <div className="col-6 col-lg-2 mb-4 mb-lg-0">
            <h6 className="fw-bold text-white mb-3">Quick Links</h6>
            <ul className="list-unstyled text-muted">
              <li className="mb-2"><Link to="/" className="text-muted text-decoration-none">Home</Link></li>
              <li className="mb-2"><Link to="/courses" className="text-muted text-decoration-none">Courses</Link></li>
              <li className="mb-2"><Link to="/about" className="text-muted text-decoration-none">About</Link></li>
              <li className="mb-2"><a href="/#contact" className="text-muted text-decoration-none">Contact</a></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-4 mb-lg-0">
            <h6 className="fw-bold text-white mb-3">Platform</h6>
            <ul className="list-unstyled text-muted">
              <li className="mb-2"><Link to="/student/dashboard" className="text-muted text-decoration-none">Student Portal</Link></li>
              <li className="mb-2"><Link to="/instructor/dashboard" className="text-muted text-decoration-none">Instructor Panel</Link></li>
              <li className="mb-2"><Link to="/admin/dashboard" className="text-muted text-decoration-none">Admin Dashboard</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-4 mb-lg-0">
            <h6 className="fw-bold text-white mb-3">Legal</h6>
            <ul className="list-unstyled text-muted">
              <li className="mb-2"><a href="/#contact" className="text-muted text-decoration-none">Privacy Policy</a></li>
              <li className="mb-2"><a href="/#contact" className="text-muted text-decoration-none">Terms & Conditions</a></li>
            </ul>
          </div>
          <div className="col-lg-2">
            <h6 className="fw-bold text-white mb-3">Contact</h6>
            <ul className="list-unstyled text-muted small">
              <li className="mb-2">
                <a href="mailto:abdraxofficial@gmail.com" className="text-muted text-decoration-none">
                  abdraxofficial@gmail.com
                </a>
              </li>
              <li className="mb-2">Punjab, Pakistan</li>
            </ul>
          </div>
        </div>
        <div className="text-center border-top border-secondary border-opacity-25 pt-4 mt-4 text-muted small">
          &copy; {new Date().getFullYear()} Abdrax Learner. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
