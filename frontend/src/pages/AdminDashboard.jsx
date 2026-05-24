import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        api.get("/users").then(res => setUsers(res.data.users || []));
        api.get("/users/analytics").then(res => setAnalytics(res.data.analytics));
    }, []);

    const deleteUser = async (id) => {
        const res = await api.delete(`/users/${id}`);
        if (res.data.success) {
            setUsers(users.filter(u => u._id !== id));
            setMsg("User deleted");
        } else setMsg("Could not delete");
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Admin Dashboard</h2>
            {msg && <div className="alert alert-info">{msg}</div>}

            <h4>Analytics</h4>
            {analytics ? (
                <ul className="list-group mb-4">
                    <li className="list-group-item">Total Users: {analytics.totalUsers}</li>
                    <li className="list-group-item">Total Courses: {analytics.totalCourses}</li>
                    <li className="list-group-item">Total Enrollments: {analytics.totalEnrollments}</li>
                    <li className="list-group-item">Users by Role:
                        <ul className="list-unstyled ms-3">
                            {analytics.usersByRole.map(r => (
                                <li key={r._id}>{r._id || "unknown"} : {r.count}</li>
                            ))}
                        </ul>
                    </li>
                </ul>
            ) : <p>Loading analytics…</p>}

            <h4>All Users</h4>
            <table className="table table-sm table-hover">
                <thead className="table-dark"><tr><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>
                                <button className="btn btn-sm btn-danger"
                                    onClick={() => deleteUser(u._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
