import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

export default function StudentDashboard() {
    const { user } = useContext(AuthContext);
    const [enrollments, setEnrollments] = useState([]);

    useEffect(() => {
        api.get("/enroll/my-courses").then(res => setEnrollments(res.data.enrollments || []));
    }, []);

    return (
        <div className="container py-4">
            <h2 className="mb-4">My Courses</h2>
            {enrollments.length === 0 && <p>You have not enrolled in any courses yet.</p>}
            <div className="row">
                {enrollments.map(e => (
                    <div className="col-md-4 mb-3" key={e._id}>
                        <div className="card h-100">
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{e.course.title}</h5>
                                <p className="card-text flex-grow-1">{e.course.description.slice(0, 80)}...</p>
                                <div className="mt-auto">
                                    <div className="progress mb-2">
                                        <div className="progress-bar" role="progressbar"
                                            style={{ width: `${e.progress}%` }}>{e.progress}%</div>
                                    </div>
                                    <button className="btn btn-outline-primary w-100" disabled>
                                        {e.isCompleted ? "Completed" : "In Progress"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
