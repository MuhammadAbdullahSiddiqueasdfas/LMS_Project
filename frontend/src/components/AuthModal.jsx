import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function AuthModal({ mode, onClose, onSwitch }) {
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        const res = await login(form.email, form.password);
        if (!res?.data?.success) {
          setError(res?.data?.message || "Login failed");
        } else {
          const actualRole = res.data.user?.role;
          if (actualRole !== form.role) {
            setError(`This account is registered as "${actualRole}", not "${form.role}". Please select the correct role.`);
            localStorage.removeItem("jwt_token");
            setLoading(false);
            return;
          }
          onClose();
          if (actualRole === "admin") navigate("/admin/dashboard");
          else if (actualRole === "instructor") navigate("/instructor/dashboard");
          else navigate("/student/dashboard");
        }
      } else {
        const res = await register(form.name, form.email, form.password, form.role);
        if (!res?.data?.success) {
          setError(res?.data?.message || "Registration failed");
        } else {
          onClose();
          navigate("/student/dashboard");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || (isLogin ? "Login failed" : "Registration failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>✕</button>

        <div style={styles.logoWrap}>
          <img src="/logo/logo.png" alt="Abdrax Learner" style={styles.logo} />
        </div>

        <h2 style={styles.title}>{isLogin ? "Welcome Back" : "Create Account"}</h2>
        <p style={styles.subtitle}>
          {isLogin ? "Sign in to continue your learning journey" : "Join Abdrax Learner and start your journey"}
        </p>

        {error && <div style={styles.errorBox}>⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
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
          )}

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
              placeholder={isLogin ? "Enter your password" : "Create a password"}
              required
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {isLogin && (
            <div style={styles.field}>
              <label style={styles.label}>Sign In As</label>
              <div style={styles.roleRow}>
                {["student", "instructor", "admin"].map(r => (
                  <button
                    key={r}
                    type="button"
                    style={{
                      ...styles.rolePill,
                      ...(form.role === r ? styles.rolePillActive : {}),
                    }}
                    onClick={() => setForm({ ...form, role: r })}
                  >
                    {r === "student" ? "🎓 Student" : r === "instructor" ? "👨‍🏫 Instructor" : "🛡 Admin"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isLogin && (
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
          )}

          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? (isLogin ? "Signing In..." : "Creating Account...") : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>

        <p style={styles.switchText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span style={styles.switchLink} onClick={onSwitch}>
            {isLogin ? "Create one" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    padding: "1rem",
  },
  modal: {
    position: "relative",
    background: "rgba(13,17,23,0.95)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "20px",
    padding: "2.5rem",
    width: "100%",
    maxWidth: "440px",
    boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
    animation: "fadeInUp 0.25s ease",
  },
  closeBtn: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "rgba(255,255,255,0.08)",
    border: "none",
    borderRadius: "50%",
    width: "32px",
    height: "32px",
    color: "rgba(255,255,255,0.6)",
    cursor: "pointer",
    fontSize: "0.85rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrap: {
    textAlign: "center",
    marginBottom: "1.2rem",
  },
  logo: {
    height: "52px",
    objectFit: "contain",
  },
  title: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "1.6rem",
    textAlign: "center",
    marginBottom: "0.3rem",
  },
  subtitle: {
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    fontSize: "0.875rem",
    marginBottom: "1.5rem",
  },
  errorBox: {
    background: "rgba(239,68,68,0.12)",
    border: "1px solid rgba(239,68,68,0.3)",
    borderRadius: "10px",
    padding: "0.7rem 1rem",
    color: "#f87171",
    fontSize: "0.85rem",
    marginBottom: "1rem",
  },
  field: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.82rem",
    fontWeight: "500",
    marginBottom: "0.35rem",
  },
  input: {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "0.72rem 1rem",
    color: "#ffffff",
    fontSize: "0.92rem",
    outline: "none",
    boxSizing: "border-box",
  },
  btn: {
    width: "100%",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    border: "none",
    borderRadius: "12px",
    padding: "0.82rem",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "0.95rem",
    cursor: "pointer",
    marginTop: "0.4rem",
    boxShadow: "0 4px 20px rgba(0,114,255,0.35)",
    letterSpacing: "0.3px",
  },
  switchText: {
    textAlign: "center",
    color: "rgba(255,255,255,0.4)",
    fontSize: "0.85rem",
    marginTop: "1.2rem",
    marginBottom: 0,
  },
  switchLink: {
    color: "#00c6ff",
    fontWeight: "600",
    cursor: "pointer",
  },
  roleRow: {
    display: "flex",
    gap: "0.5rem",
  },
  rolePill: {
    flex: 1,
    padding: "0.55rem 0.5rem",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "rgba(255,255,255,0.55)",
    fontSize: "0.8rem",
    fontWeight: "500",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s",
  },
  rolePillActive: {
    background: "rgba(0,114,255,0.2)",
    border: "1px solid rgba(0,198,255,0.5)",
    color: "#00c6ff",
    fontWeight: "700",
  },
};
