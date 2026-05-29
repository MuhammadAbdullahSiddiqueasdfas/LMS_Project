import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="pt-5 pb-3 border-top border-secondary border-opacity-25" style={{ backgroundColor: "#0B1120" }}>
      <div className="container pt-4">
        <div className="row mb-5">
          <div className="col-lg-4 mb-4 mb-lg-0">
            <div className="d-flex align-items-center mb-3">
              <img src="/picture/logo.png" alt="LMS Logo" height="40" style={{ objectFit: "contain" }} className="me-2" />
            </div>
            <p className="text-muted pe-lg-5">
              Empowering learners and educators worldwide with a modern, fast, and scalable learning management platform.
            </p>
          </div>
          <div className="col-6 col-lg-2 offset-lg-1 mb-4 mb-lg-0">
            <h6 className="fw-bold text-white mb-3">Platform</h6>
            <ul className="list-unstyled text-muted">
              <li className="mb-2"><Link to="/courses" className="text-muted text-decoration-none">Browse Courses</Link></li>
              <li className="mb-2"><Link to="/about" className="text-muted text-decoration-none">About Us</Link></li>
              <li className="mb-2"><Link to="/register" className="text-muted text-decoration-none">Become Instructor</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-4 mb-lg-0">
            <h6 className="fw-bold text-white mb-3">Support</h6>
            <ul className="list-unstyled text-muted">
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Help Center</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="text-muted text-decoration-none">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="col-lg-3">
            <h6 className="fw-bold text-white mb-3">Subscribe</h6>
            <p className="text-muted small">Get the latest updates and course offers directly in your inbox.</p>
            <div className="input-group mb-3">
              <input type="email" className="form-control bg-dark border-secondary text-white shadow-none" placeholder="Your email address" />
              <button className="btn btn-primary-custom" type="button">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="text-center border-top border-secondary border-opacity-25 pt-4 mt-4 text-muted small">
          &copy; {new Date().getFullYear()} LMS Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
