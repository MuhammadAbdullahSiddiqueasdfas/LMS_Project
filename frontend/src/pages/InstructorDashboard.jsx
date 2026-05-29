import { useState, useEffect } from "react";
import api from "../services/api";

export default function InstructorDashboard() {
    const [courses, setCourses] = useState([]);
    const [form, setForm] = useState({ title: "", description: "", category: "", price: "" });
    const [msg, setMsg] = useState("");

    // Load only courses where instructor === logged‑in user
    useEffect(() => {
        api.get("/courses").then(res => {
            const own = res.data.courses.filter(c => c.instructor._id === JSON.parse(atob(localStorage.getItem("jwt_token").split('.')[1])).id);
            setCourses(own);
        });
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/courses", form);
            if (res.data.success) {
                setMsg("Course created!");
                setCourses([...courses, res.data.course]);
                setForm({ title: "", description: "", category: "", price: "" }); // Clear form
            } else {
                setMsg(res.data.message || "Failed to create");
            }
        } catch (err) {
            setMsg(err.response?.data?.message || "Failed to create course");
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Instructor Dashboard</h2>

            {/* CREATE COURSE */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Create New Course</h5>
                    {msg && <div className="alert alert-info">{msg}</div>}
                    <form onSubmit={handleCreate}>
                        <div className="mb-2"><input className="form-control" placeholder="Title" required value={form.title}
                            onChange={e => setForm({ ...form, title: e.target.value })} /></div>
                        <div className="mb-2"><textarea className="form-control" placeholder="Description" required rows={3}
                            value={form.description}
                            onChange={e => setForm({ ...form, description: e.target.value })} /></div>
                        <div className="mb-2"><input className="form-control" placeholder="Category" required value={form.category}
                            onChange={e => setForm({ ...form, category: e.target.value })} /></div>
                        <div className="mb-2"><input type="number" className="form-control" placeholder="Price" required value={form.price}
                            onChange={e => setForm({ ...form, price: e.target.value })} /></div>
                        <button className="btn btn-primary">Create Course</button>
                    </form>
                </div>
            </div>

            {/* LIST OWN COURSES */}
            <h4>My Courses</h4>
            <div className="row">
                {courses.map(c => (
                    <div className="col-md-4 mb-3" key={c._id}>
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">{c.title}</h5>
                                <p className="card-text">{c.description.slice(0, 80)}...</p>
                                <p className="mb-1"><strong>Published:</strong> {c.isPublished ? "Yes" : "No"}</p>
                                <button className="btn btn-outline-secondary btn-sm me-2"
                                    onClick={async () => {
                                        await api.put(`/courses/${c._id}`, { isPublished: !c.isPublished });
                                        setCourses(courses.map(x => x._id === c._id ? { ...x, isPublished: !c.isPublished } : x));
                                    }}>
                                    {c.isPublished ? "Unpublish" : "Publish"}
                                </button>
                                {/* Lesson upload could be added here as a modal */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
