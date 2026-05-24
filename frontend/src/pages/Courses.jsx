import { useEffect, useState } from "react";
import api from "../services/api";
import CourseCard from "../components/CourseCard";

export default function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        api.get("/courses").then((res) => setCourses(res.data.courses || []));
    }, []);

    return (
        <div className="container py-4">
            <h2 className="mb-4">All Courses</h2>
            <div className="row">
                {courses.map((c) => (
                    <CourseCard key={c._id} course={c} />
                ))}
            </div>
        </div>
    );
}
