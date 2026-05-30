import { Link } from "react-router-dom";

const courses = [
  {
    _id: "frontend-ui",
    title: "Frontend Development",
    category: "Web",
    instructor: { name: "Ayesha Khan" },
    duration: "8 weeks",
    price: 49,
    thumbnail: "https://res.cloudinary.com/dcbdne09h/image/upload/v1779955703/frontend_development_vf3t9v.png",
  },
  {
    _id: "mern-api",
    title: "MERN API & Authentication",
    category: "Backend",
    instructor: { name: "Bilal Ahmed" },
    duration: "6 weeks",
    price: 59,
    thumbnail: "https://res.cloudinary.com/dcbdne09h/image/upload/v1779955710/Mern_api_and_authentication_zewtge.png",
  },
  {
    _id: "data-dashboard",
    title: "Analytics Dashboard Design",
    category: "Analytics",
    instructor: { name: "Sara Malik" },
    duration: "5 weeks",
    price: 39,
    thumbnail: "https://res.cloudinary.com/dcbdne09h/image/upload/v1779955703/analyticsdashboarddesign_a9qhy7.png",
  },
];

export default function PopularCourses() {
  return (
    <section id="courses" className="py-5">
      <div className="container py-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-end gap-3 mb-5">
          <div>
            <span className="section-kicker">Course catalog</span>
            <h2 className="display-5 fw-bold mb-2">Popular Courses</h2>
            <p className="text-muted fs-5 mb-0">Explore our top-rated courses taught by expert instructors.</p>
          </div>
          <Link to="/courses" className="btn btn-outline-light rounded-pill px-4">View All</Link>
        </div>

        <div className="row g-4">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <div className="saas-card course-card h-100 overflow-hidden d-flex flex-column">
                <div
                  className="course-thumb"
                  style={{ backgroundImage: `url(${course.thumbnail})` }}
                ></div>
                <div className="p-4 d-flex flex-column flex-grow-1">
                  <div className="d-flex justify-content-between gap-2 mb-3">
                    <span className="badge badge-soft">{course.category}</span>
                    <span className="small text-muted">{course.duration}</span>
                  </div>
                  <h5 className="fw-bold mb-2">{course.title}</h5>
                  <p className="text-muted small mb-3">By {course.instructor.name}</p>
                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-bold">${course.price}</span>
                    <Link to="/register" className="btn btn-sm btn-primary-custom rounded-pill px-4">
                      Enroll Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
