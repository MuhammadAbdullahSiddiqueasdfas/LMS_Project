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
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">LMS</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/courses">Courses</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
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
                                <li className="nav-item"><button className="btn btn-outline-light ms-2" onClick={handleLogout}>Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                                <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
