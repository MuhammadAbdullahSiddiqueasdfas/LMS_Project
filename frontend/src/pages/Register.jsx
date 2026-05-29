import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
    const { register } = useContext(AuthContext);
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await register(form.name, form.email, form.password, form.role);
            if (!res?.data?.success) setError(res?.data?.message || "Registration failed");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Register</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3"><label className="form-label">Name</label>
                    <input className="form-control" required value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="mb-3"><label className="form-label">Email</label>
                    <input className="form-control" type="email" required value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div className="mb-3"><label className="form-label">Password</label>
                    <input className="form-control" type="password" required value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })} />
                </div>
                <div className="mb-3"><label className="form-label">Role</label>
                    <select className="form-select" value={form.role}
                        onChange={e => setForm({ ...form, role: e.target.value })}>
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}
