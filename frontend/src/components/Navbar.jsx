import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useModal } from "../context/ModalContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { openLogin, openRegister } = useModal();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top py-2">
      <div className="container nav-shell">
        <Link className="navbar-brand d-flex align-items-center me-lg-5" to="/">
          <img className="navbar-logo" src="/logo/logo.png" alt="Abdrax Learner" />
        </Link>
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-lg-auto mb-2 mb-lg-0 fw-medium nav-links">
            <li className="nav-item"><Link className="nav-link px-3" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link px-3" to="/courses">Courses</Link></li>
            <li className="nav-item"><Link className="nav-link px-3" to="/about">About</Link></li>
            <li className="nav-item"><a className="nav-link px-3" href="/#features">Features</a></li>
            <li className="nav-item"><a className="nav-link px-3" href="/#instructors">Instructors</a></li>
            <li className="nav-item"><a className="nav-link px-3" href="/#contact">Contact</a></li>
          </ul>

          <ul className="navbar-nav align-items-center fw-medium gap-2 nav-actions">
            {user ? (
              <>
                {user.role === "student" && (
                  <li className="nav-item"><Link className="btn btn-soft btn-sm px-3 rounded-pill" to="/student/dashboard">Dashboard</Link></li>
                )}
                {user.role === "instructor" && (
                  <li className="nav-item"><Link className="btn btn-soft btn-sm px-3 rounded-pill" to="/instructor/dashboard">Instructor Panel</Link></li>
                )}
                {user.role === "admin" && (
                  <li className="nav-item"><Link className="btn btn-soft btn-sm px-3 rounded-pill" to="/admin/dashboard">Admin Panel</Link></li>
                )}
                <li className="nav-item ms-lg-3">
                  <button className="btn btn-outline-light btn-sm px-3 rounded-pill fw-bold" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <button className="btn btn-link nav-link px-3 text-white text-decoration-none" onClick={openLogin}>Login</button>
                </li>
                <li className="nav-item ms-lg-2">
                  <button className="btn btn-primary-custom btn-sm px-4 py-2 rounded-pill fw-bold" onClick={openRegister}>Register</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
