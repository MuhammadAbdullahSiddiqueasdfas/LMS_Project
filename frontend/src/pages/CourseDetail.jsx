import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/courses/${id}`)
      .then((res) => setCourse(res.data.course))
      .catch((err) => {
        setError(err.response?.data?.message || "Failed to load course");
      });
  }, [id]);

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container py-5">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-3">{course.title}</h2>
      <p>{course.description}</p>
      <p><strong>Category:</strong> {course.category}</p>
      <p><strong>Price:</strong> ${course.price}</p>
      {/* Optionally add enroll button for students */}
    </div>
  );
}
