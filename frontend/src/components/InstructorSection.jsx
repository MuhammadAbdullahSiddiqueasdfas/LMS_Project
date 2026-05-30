import { Link } from "react-router-dom";

export default function InstructorSection() {
  return (
    <section id="instructors" className="section-band py-5">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-6">
            <img
              src="https://res.cloudinary.com/dcbdne09h/image/upload/v1779955708/become_an_instructor_upg9o3.png"
              alt="Instructor managing an online class"
              className="img-fluid media-frame"
            />
          </div>
          <div className="col-lg-6 ps-lg-5">
            <span className="section-kicker">Instructor panel</span>
            <h2 className="display-5 fw-bold mb-3">Become an Instructor</h2>
            <p className="lead text-muted mb-4 fs-5">
              Share knowledge, create structured courses, publish lessons, and manage student activity from a focused teaching workspace.
            </p>
            <ul className="list-unstyled mb-4 text-muted fs-5">
              <li className="mb-2 check-line">Easy course builder</li>
              <li className="mb-2 check-line">Comprehensive analytics</li>
              <li className="mb-2 check-line">Student and lesson management</li>
            </ul>
            <Link to="/register" className="btn btn-primary-custom btn-lg px-5 py-3 rounded-pill fw-bold">Start Teaching Today</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
