import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="py-5 d-flex align-items-center" style={{ minHeight: "85vh" }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 text-center text-lg-start mb-5 mb-lg-0">
            <h1 className="display-3 fw-bolder mb-4 tracking-tight">
              Learn Without <span className="text-gradient">Limits</span>
            </h1>
            <p className="lead mb-5 fs-4 text-muted" style={{ maxWidth: "600px" }}>
              Master modern skills with expert instructors, interactive courses, and a powerful LMS platform designed for your success.
            </p>
            <div className="d-flex justify-content-center justify-content-lg-start gap-3">
              <Link to="/courses" className="btn btn-primary-custom btn-lg px-5 py-3 rounded-pill fw-bold">
                Explore Courses
              </Link>
              <Link to="/register" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold">
                Become Instructor
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="position-relative">
              {/* Decorative elements behind image */}
              <div className="position-absolute top-50 start-50 translate-middle rounded-circle" style={{ width: "400px", height: "400px", background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, rgba(15,23,42,0) 70%)", zIndex: 0 }}></div>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Students learning" 
                className="img-fluid rounded-4 shadow-lg position-relative" 
                style={{ zIndex: 1, border: "1px solid rgba(255,255,255,0.1)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
