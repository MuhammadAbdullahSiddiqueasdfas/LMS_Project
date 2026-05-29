import { Link } from "react-router-dom";

export default function InstructorSection() {
  return (
    <section className="py-5" style={{ backgroundColor: "rgba(30, 41, 59, 0.5)" }}>
      <div className="container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-4 mb-lg-0">
            <img 
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Instructor" 
              className="img-fluid rounded-4 shadow-lg" 
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            />
          </div>
          <div className="col-lg-6 ps-lg-5">
            <h2 className="display-5 fw-bold mb-3">Become an Instructor</h2>
            <p className="lead text-muted mb-4 fs-5">
              Share your knowledge and teach thousands of students around the world. Our platform gives you all the tools you need to build and manage successful courses.
            </p>
            <ul className="list-unstyled mb-4 text-muted fs-5">
              <li className="mb-2">✅ Easy course builder</li>
              <li className="mb-2">✅ Comprehensive analytics</li>
              <li className="mb-2">✅ Global audience reach</li>
            </ul>
            <Link to="/register" className="btn btn-primary-custom btn-lg px-5 py-3 rounded-pill fw-bold">
              Start Teaching Today
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
