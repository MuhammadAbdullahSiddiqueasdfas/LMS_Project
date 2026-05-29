import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top py-2 border-bottom border-secondary border-opacity-25">
            <div className="container-fluid px-4">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/picture/logo.png" alt="Logo" height="55" style={{ objectFit: "contain" }} />
                </Link>
                <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-medium">
                        <li className="nav-item"><Link className="nav-link px-3" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link px-3" to="/courses">Courses</Link></li>
                        <li className="nav-item"><Link className="nav-link px-3" to="/about">About</Link></li>
                    </ul>
                    <ul className="navbar-nav ms-auto align-items-center fw-medium gap-2">
                        {user ? (
                            <>
                                {user.role === "student" && (
                                    <li className="nav-item"><Link className="nav-link" to="/student/dashboard">Dashboard</Link></li>
                                )}
                                {user.role === "instructor" && (
                                    <li className="nav-item"><Link className="nav-link" to="/instructor/dashboard">Dashboard</Link></li>
                                )}
                                {user.role === "admin" && (
                                    <li className="nav-item"><Link className="nav-link" to="/admin/dashboard">Dashboard</Link></li>
                                )}
                                <li className="nav-item ms-lg-3">
                                    <button className="btn btn-danger btn-sm px-3 rounded-pill fw-bold shadow-sm" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                <li className="nav-item ms-lg-2">
                                    <Link className="btn btn-primary btn-sm px-4 py-2 rounded-pill fw-bold shadow-sm" to="/register">Get Started</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
