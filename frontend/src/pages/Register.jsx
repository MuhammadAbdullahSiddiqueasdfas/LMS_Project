import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await register(form.name, form.email, form.password, form.role);
      if (!res?.data?.success) setError(res?.data?.message || "Registration failed");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logoWrap}>
          <img src="/logo/logo.png" alt="Abdrax Learner" style={styles.logo} />
        </div>

        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join Abdrax Learner and start your journey</p>

        {error && (
          <div style={styles.errorBox}>
            <span>⚠ {error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Enter your full name"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              placeholder="Enter your email"
              required
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="Create a password"
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Register As</label>
            <select
              style={styles.input}
              value={form.role}
              onChange={e => setForm({ ...form, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Sign In</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0a0f 0%, #0d1117 50%, #0a0f1e 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem 1rem",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "20px",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "460px",
    backdropFilter: "blur(20px)",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  },
  logoWrap: {
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  logo: {
    height: "60px",
    objectFit: "contain",
  },
  title: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "1.75rem",
    textAlign: "center",
    marginBottom: "0.4rem",
  },
  subtitle: {
    color: "rgba(255,255,255,0.45)",
    textAlign: "center",
    fontSize: "0.9rem",
    marginBottom: "1.8rem",
  },
  errorBox: {
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    color: "#f87171",
    fontSize: "0.875rem",
    marginBottom: "1.2rem",
  },
  field: {
    marginBottom: "1.2rem",
  },
  label: {
    display: "block",
    color: "rgba(255,255,255,0.65)",
    fontSize: "0.85rem",
    fontWeight: "500",
    marginBottom: "0.4rem",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    color: "#ffffff",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  },
  btn: {
    width: "100%",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    border: "none",
    borderRadius: "12px",
    padding: "0.85rem",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "0.5rem",
    letterSpacing: "0.3px",
    boxShadow: "0 4px 20px rgba(0,114,255,0.35)",
  },
  footer: {
    textAlign: "center",
    color: "rgba(255,255,255,0.45)",
    fontSize: "0.875rem",
    marginTop: "1.5rem",
    marginBottom: 0,
  },
  link: {
    color: "#00c6ff",
    textDecoration: "none",
    fontWeight: "600",
  },
};
