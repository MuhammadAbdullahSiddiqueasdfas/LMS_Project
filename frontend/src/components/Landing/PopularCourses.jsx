import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api"; // Updated relative path

export default function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/courses")
      .then(res => {
        if (res.data && res.data.courses) {
          // Only show top 3 published courses
          const published = res.data.courses.filter(c => c.isPublished).slice(0, 3);
          setCourses(published);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-5 bg-dark">
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 className="display-5 fw-bold mb-2">Popular Courses</h2>
            <p className="text-muted fs-5 mb-0">Learn from industry experts.</p>
          </div>
          <Link to="/courses" className="btn btn-outline-light rounded-pill px-4">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : courses.length > 0 ? (
          <div className="row g-4">
            {courses.map(course => (
              <div key={course._id} className="col-md-4">
                <div className="saas-card h-100 overflow-hidden d-flex flex-column">
                  {/* Thumbnail Placeholder */}
                  <div className="bg-secondary" style={{ height: "200px", backgroundImage: `url(${course.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex justify-content-between mb-2">
                      <span className="badge bg-primary bg-opacity-25 text-primary border border-primary border-opacity-25">{course.category}</span>
                      <span className="text-warning">★★★★★</span>
                    </div>
                    <h5 className="fw-bold mb-2">{course.title}</h5>
                    <p className="text-muted small mb-3">By {course.instructor?.name || "Expert Instructor"}</p>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <span className="fs-5 fw-bold">${course.price}</span>
                      <Link to={`/courses/${course._id}`} className="btn btn-sm btn-primary-custom rounded-pill px-4">
                        Enroll Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted fs-5">No courses available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
