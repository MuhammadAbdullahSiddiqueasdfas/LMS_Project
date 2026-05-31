import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, BookOpen, BarChart3,
  LogOut, ArrowLeft, TrendingUp, GraduationCap,
  CheckCircle, Shield, ChevronRight
} from "lucide-react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const TABS = [
  { id: "Analytics",      icon: LayoutDashboard, label: "Analytics" },
  { id: "Manage Users",   icon: Users,           label: "Manage Users" },
  { id: "Manage Courses", icon: BookOpen,         label: "Manage Courses" },
  { id: "Reports",        icon: BarChart3,        label: "Reports" },
];

export default function AdminDashboard() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState("Analytics");
  const [analytics, setAnalytics] = useState(null);
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const notify = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 3000);
  };

  const handleLogout = () => { logout(); navigate("/"); };

  useEffect(() => {
    api.get("/users/analytics").then(r => r.data.success && setAnalytics(r.data.analytics));
    api.get("/users").then(r => r.data.success && setUsers(r.data.users));
    api.get("/courses").then(r => r.data.success && setCourses(r.data.courses));
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    const r = await api.delete(`/users/${id}`);
    if (r.data.success) { setUsers(u => u.filter(x => x._id !== id)); notify("User deleted successfully"); }
    else notify(r.data.message || "Failed to delete", "error");
  };

  const toggleUserStatus = async (id) => {
    const r = await api.put(`/users/${id}/status`);
    if (r.data.success) {
      setUsers(u => u.map(x => x._id === id ? { ...x, isActive: r.data.isActive } : x));
      notify(`User ${r.data.isActive ? "activated" : "deactivated"} successfully`);
    }
  };

  const deleteCourse = async (id) => {
    if (!window.confirm("Delete this course permanently?")) return;
    const r = await api.delete(`/courses/${id}`);
    if (r.data.success) { setCourses(c => c.filter(x => x._id !== id)); notify("Course deleted successfully"); }
    else notify(r.data.message || "Failed to delete", "error");
  };

  const togglePublish = async (course) => {
    const r = await api.put(`/courses/${course._id}`, { isPublished: !course.isPublished });
    if (r.data.success) {
      setCourses(c => c.map(x => x._id === course._id ? { ...x, isPublished: !x.isPublished } : x));
      notify(`Course ${!course.isPublished ? "published" : "unpublished"} successfully`);
    }
  };

  const statCards = [
    { label: "Total Users",    value: analytics?.totalUsers ?? "—",       Icon: Users,          color: "#3b82f6", bg: "rgba(59,130,246,0.12)",  border: "rgba(59,130,246,0.2)" },
    { label: "Total Courses",  value: analytics?.totalCourses ?? "—",     Icon: BookOpen,       color: "#8b5cf6", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.2)" },
    { label: "Enrollments",    value: analytics?.totalEnrollments ?? "—", Icon: GraduationCap,  color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.2)" },
    { label: "Published",      value: courses.filter(c => c.isPublished).length, Icon: CheckCircle, color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.2)" },
  ];

  const currentTab = TABS.find(t => t.id === tab);

  return (
    <div style={s.page}>

      {/* ── HEADER ── */}
      <header style={s.header}>
        <div style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <img src="/logo/logo.png" alt="Abdrax Learner" style={s.logo} />
        </div>
        <div style={s.headerRight}>
          <div style={s.adminChip}>
            <div style={s.adminAvatar}>A</div>
            <div>
              <div style={s.adminName}>Administrator</div>
              <div style={s.adminRole}>Super Admin</div>
            </div>
          </div>
          <button style={s.logoutBtn} onClick={handleLogout}>
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div style={s.body}>

        {/* ── SIDEBAR ── */}
        <aside style={s.sidebar}>
          <div>
            <p style={s.sidebarLabel}>MAIN MENU</p>
            {TABS.map(t => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  style={{ ...s.sidebarBtn, ...(active ? s.sidebarBtnActive : {}) }}
                  onClick={() => setTab(t.id)}
                >
                  <div style={{ ...s.sidebarIconWrap, ...(active ? s.sidebarIconWrapActive : {}) }}>
                    <Icon size={17} />
                  </div>
                  <span style={s.sidebarBtnText}>{t.label}</span>
                  {active && <ChevronRight size={14} style={{ marginLeft: "auto", opacity: 0.6 }} />}
                </button>
              );
            })}
          </div>

          <div style={s.sidebarBottom}>
            <div style={s.sidebarDivider}></div>
            <Link to="/" style={s.backLink}>
              <ArrowLeft size={14} />
              <span>Back to Site</span>
            </Link>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main style={s.main}>

          {/* Page Header */}
          <div style={s.pageHeader}>
            <div style={s.pageTitleRow}>
              {currentTab && <currentTab.icon size={22} color="#60a5fa" />}
              <h1 style={s.pageTitle}>{tab}</h1>
            </div>
            <p style={s.pageSubtitle}>
              {tab === "Analytics"      && "Overview of platform activity and statistics"}
              {tab === "Manage Users"   && "View, activate, deactivate and delete platform users"}
              {tab === "Manage Courses" && "Publish, unpublish and manage all courses"}
              {tab === "Reports"        && "Detailed reports and platform insights"}
            </p>
          </div>

          {/* Toast */}
          {msg.text && (
            <div style={{
              ...s.toast,
              background: msg.type === "error" ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)",
              borderColor: msg.type === "error" ? "rgba(239,68,68,0.35)" : "rgba(16,185,129,0.35)",
              color: msg.type === "error" ? "#f87171" : "#34d399",
            }}>
              {msg.type === "error" ? "⚠ " : "✓ "}{msg.text}
            </div>
          )}

          {/* ── ANALYTICS ── */}
          {tab === "Analytics" && (
            <div>
              <div style={s.statsGrid}>
                {statCards.map(c => (
                  <div key={c.label} style={{ ...s.statCard, borderColor: c.border }}>
                    <div style={{ ...s.statIconBox, background: c.bg, color: c.color }}>
                      <c.Icon size={24} />
                    </div>
                    <div>
                      <div style={s.statValue}>{c.value}</div>
                      <div style={s.statLabel}>{c.label}</div>
                    </div>
                    <div style={{ ...s.statBar, background: c.color }}></div>
                  </div>
                ))}
              </div>
              <div style={s.card}>
                <div style={s.cardTitleRow}>
                  <TrendingUp size={18} color="#60a5fa" />
                  <h3 style={s.cardTitle}>Users by Role</h3>
                </div>
                {analytics?.usersByRole?.map(r => {
                  const pct = Math.min((r.count / (analytics.totalUsers || 1)) * 100, 100);
                  return (
                    <div key={r._id} style={s.roleRow}>
                      <span style={s.roleLabel}>{r._id || "unknown"}</span>
                      <div style={s.roleTrack}><div style={{ ...s.roleFill, width: `${pct}%` }}></div></div>
                      <span style={s.roleCount}>{r.count} users</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── MANAGE USERS ── */}
          {tab === "Manage Users" && (
            <div style={s.card}>
              <div style={s.cardHeaderRow}>
                <div style={s.cardTitleRow}>
                  <Users size={18} color="#60a5fa" />
                  <h3 style={s.cardTitle}>All Users</h3>
                </div>
                <span style={s.countBadge}>{users.length} total</span>
              </div>
              <div style={s.tableWrap}>
                <table style={s.table}>
                  <thead>
                    <tr>{["#","Name","Email","Role","Status","Joined","Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={u._id} style={s.tr}>
                        <td style={{ ...s.td, color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>{i + 1}</td>
                        <td style={s.td}>
                          <div style={s.userCell}>
                            <div style={s.userAvatar}>{u.name?.[0]?.toUpperCase()}</div>
                            <span style={{ fontWeight: 600 }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ ...s.td, color: "rgba(255,255,255,0.5)" }}>{u.email}</td>
                        <td style={s.td}>
                          <span style={{
                            ...s.pill,
                            background: u.role === "admin" ? "rgba(239,68,68,0.1)" : u.role === "instructor" ? "rgba(139,92,246,0.1)" : "rgba(59,130,246,0.1)",
                            color: u.role === "admin" ? "#f87171" : u.role === "instructor" ? "#a78bfa" : "#60a5fa",
                            border: `1px solid ${u.role === "admin" ? "rgba(239,68,68,0.25)" : u.role === "instructor" ? "rgba(139,92,246,0.25)" : "rgba(59,130,246,0.25)"}`,
                          }}>{u.role}</span>
                        </td>
                        <td style={s.td}>
                          <span style={{
                            ...s.pill,
                            background: u.isActive ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)",
                            color: u.isActive ? "#34d399" : "#f87171",
                            border: `1px solid ${u.isActive ? "rgba(16,185,129,0.25)" : "rgba(239,68,68,0.25)"}`,
                          }}>
                            {u.isActive ? "● Active" : "● Inactive"}
                          </span>
                        </td>
                        <td style={{ ...s.td, color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
                          {new Date(u.createdAt).toLocaleDateString("en-GB")}
                        </td>
                        <td style={s.td}>
                          <div style={s.actionRow}>
                            <button style={s.actionBtn} onClick={() => toggleUserStatus(u._id)}>
                              {u.isActive ? "Deactivate" : "Activate"}
                            </button>
                            <button style={{ ...s.actionBtn, ...s.actionDanger }} onClick={() => deleteUser(u._id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── MANAGE COURSES ── */}
          {tab === "Manage Courses" && (
            <div style={s.card}>
              <div style={s.cardHeaderRow}>
                <div style={s.cardTitleRow}>
                  <BookOpen size={18} color="#60a5fa" />
                  <h3 style={s.cardTitle}>All Courses</h3>
                </div>
                <span style={s.countBadge}>{courses.length} total</span>
              </div>
              <div style={s.tableWrap}>
                <table style={s.table}>
                  <thead>
                    <tr>{["#","Title","Category","Instructor","Price","Status","Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr>
                  </thead>
                  <tbody>
                    {courses.map((c, i) => (
                      <tr key={c._id} style={s.tr}>
                        <td style={{ ...s.td, color: "rgba(255,255,255,0.25)", fontSize: "0.8rem" }}>{i + 1}</td>
                        <td style={{ ...s.td, fontWeight: 600, maxWidth: 200 }}>{c.title}</td>
                        <td style={s.td}>
                          <span style={{ ...s.pill, background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)" }}>{c.category}</span>
                        </td>
                        <td style={{ ...s.td, color: "rgba(255,255,255,0.5)" }}>{c.instructor?.name || "—"}</td>
                        <td style={{ ...s.td, color: "#34d399", fontWeight: 700 }}>${c.price}</td>
                        <td style={s.td}>
                          <span style={{
                            ...s.pill,
                            background: c.isPublished ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)",
                            color: c.isPublished ? "#34d399" : "#fbbf24",
                            border: `1px solid ${c.isPublished ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)"}`,
                          }}>
                            {c.isPublished ? "● Published" : "● Draft"}
                          </span>
                        </td>
                        <td style={s.td}>
                          <div style={s.actionRow}>
                            <button style={s.actionBtn} onClick={() => togglePublish(c)}>
                              {c.isPublished ? "Unpublish" : "Publish"}
                            </button>
                            <button style={{ ...s.actionBtn, ...s.actionDanger }} onClick={() => deleteCourse(c._id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── REPORTS ── */}
          {tab === "Reports" && (
            <div>
              <div style={s.statsGrid}>
                {statCards.map(c => (
                  <div key={c.label} style={{ ...s.statCard, borderColor: c.border }}>
                    <div style={{ ...s.statIconBox, background: c.bg, color: c.color }}><c.Icon size={24} /></div>
                    <div><div style={s.statValue}>{c.value}</div><div style={s.statLabel}>{c.label}</div></div>
                    <div style={{ ...s.statBar, background: c.color }}></div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div style={s.card}>
                  <div style={s.cardTitleRow}><TrendingUp size={18} color="#60a5fa" /><h3 style={s.cardTitle}>Role Distribution</h3></div>
                  {analytics?.usersByRole?.map(r => {
                    const pct = Math.min((r.count / (analytics.totalUsers || 1)) * 100, 100);
                    return (
                      <div key={r._id} style={s.roleRow}>
                        <span style={s.roleLabel}>{r._id || "unknown"}</span>
                        <div style={s.roleTrack}><div style={{ ...s.roleFill, width: `${pct}%` }}></div></div>
                        <span style={s.roleCount}>{Math.round(pct)}%</span>
                      </div>
                    );
                  })}
                </div>
                <div style={s.card}>
                  <div style={s.cardTitleRow}><BarChart3 size={18} color="#60a5fa" /><h3 style={s.cardTitle}>Course Status</h3></div>
                  {[
                    { label: "Published", count: courses.filter(c => c.isPublished).length, color: "#10b981" },
                    { label: "Draft",     count: courses.filter(c => !c.isPublished).length, color: "#f59e0b" },
                  ].map(r => {
                    const pct = Math.min((r.count / (courses.length || 1)) * 100, 100);
                    return (
                      <div key={r.label} style={s.roleRow}>
                        <span style={s.roleLabel}>{r.label}</span>
                        <div style={s.roleTrack}><div style={{ ...s.roleFill, width: `${pct}%`, background: r.color }}></div></div>
                        <span style={s.roleCount}>{r.count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

const s = {
  page: { display: "flex", flexDirection: "column", minHeight: "100vh", background: "#080b12", color: "#fff", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" },

  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.9rem 2.5rem", background: "rgba(255,255,255,0.025)", borderBottom: "1px solid rgba(255,255,255,0.07)", position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(20px)" },
  logo: { height: 80, objectFit: "contain" },
  headerCenter: { display: "flex", alignItems: "center", gap: "0.5rem" },
  headerTitle: { fontSize: "0.9rem", fontWeight: "600", color: "rgba(255,255,255,0.5)", letterSpacing: "0.5px" },
  headerRight: { display: "flex", alignItems: "center", gap: "1.25rem" },
  adminChip: { display: "flex", alignItems: "center", gap: "0.75rem" },
  adminAvatar: { width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#00c6ff,#0072ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "1rem" },
  adminName: { fontSize: "0.9rem", fontWeight: "700", lineHeight: 1.2 },
  adminRole: { fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: 2 },
  logoutBtn: { display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "10px", padding: "0.5rem 1.1rem", color: "#f87171", fontSize: "0.88rem", cursor: "pointer", fontWeight: "600" },

  body: { display: "flex", flex: 1 },

  sidebar: { width: 256, minHeight: "calc(100vh - 74px)", background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "1.75rem 1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0 },
  sidebarLabel: { fontSize: "0.68rem", color: "rgba(255,255,255,0.2)", letterSpacing: "2.5px", fontWeight: "700", marginBottom: "0.75rem", paddingLeft: "0.5rem" },
  sidebarBtn: { display: "flex", alignItems: "center", gap: "0.85rem", width: "100%", textAlign: "left", padding: "0.8rem 0.75rem", borderRadius: "12px", border: "none", background: "transparent", color: "rgba(255,255,255,0.45)", fontSize: "0.92rem", cursor: "pointer", marginBottom: "0.3rem", fontWeight: "500", transition: "all 0.15s" },
  sidebarBtnActive: { background: "linear-gradient(135deg,rgba(0,114,255,0.15),rgba(0,198,255,0.08))", color: "#fff", fontWeight: "700", border: "1px solid rgba(0,114,255,0.2)" },
  sidebarIconWrap: { width: 34, height: 34, borderRadius: "9px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  sidebarIconWrapActive: { background: "linear-gradient(135deg,#0072ff,#00c6ff)", color: "#fff" },
  sidebarBtnText: { flex: 1 },
  sidebarBottom: { paddingTop: "1rem" },
  sidebarDivider: { height: 1, background: "rgba(255,255,255,0.06)", marginBottom: "1rem" },
  backLink: { display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", textDecoration: "none", padding: "0.5rem 0.5rem", borderRadius: "8px" },

  main: { flex: 1, padding: "2rem 2.5rem", overflowX: "auto" },
  pageHeader: { marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)" },
  pageTitleRow: { display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.4rem" },
  pageTitle: { fontSize: "1.7rem", fontWeight: "800", margin: 0 },
  pageSubtitle: { fontSize: "0.92rem", color: "rgba(255,255,255,0.38)", margin: 0 },

  toast: { padding: "0.9rem 1.25rem", borderRadius: "12px", border: "1px solid", marginBottom: "1.5rem", fontSize: "0.9rem", fontWeight: "500" },

  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem", marginBottom: "1.75rem" },
  statCard: { background: "rgba(255,255,255,0.04)", border: "1px solid", borderRadius: "16px", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem", position: "relative", overflow: "hidden" },
  statIconBox: { width: 54, height: 54, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  statValue: { fontSize: "2rem", fontWeight: "800", lineHeight: 1 },
  statLabel: { fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: "0.3rem" },
  statBar: { position: "absolute", bottom: 0, left: 0, right: 0, height: 3, opacity: 0.5 },

  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" },
  cardHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" },
  cardTitleRow: { display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1.25rem" },
  cardTitle: { fontSize: "1.05rem", fontWeight: "700", margin: 0, color: "#fff" },
  countBadge: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "0.3rem 0.8rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" },

  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" },
  th: { padding: "0.85rem 1rem", textAlign: "left", color: "rgba(255,255,255,0.3)", fontWeight: "600", fontSize: "0.75rem", letterSpacing: "0.5px", borderBottom: "1px solid rgba(255,255,255,0.07)", whiteSpace: "nowrap" },
  tr: { borderBottom: "1px solid rgba(255,255,255,0.04)" },
  td: { padding: "1rem", color: "rgba(255,255,255,0.8)", verticalAlign: "middle" },
  userCell: { display: "flex", alignItems: "center", gap: "0.75rem" },
  userAvatar: { width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#667eea,#764ba2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", fontWeight: "700", flexShrink: 0 },
  pill: { padding: "0.25rem 0.7rem", borderRadius: "20px", fontSize: "0.78rem", fontWeight: "600" },
  actionRow: { display: "flex", gap: "0.5rem" },
  actionBtn: { padding: "0.35rem 0.8rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", cursor: "pointer", fontWeight: "500", whiteSpace: "nowrap" },
  actionDanger: { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" },

  roleRow: { display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" },
  roleLabel: { width: 100, fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", textTransform: "capitalize", flexShrink: 0 },
  roleTrack: { flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: "6px", height: 8, overflow: "hidden" },
  roleFill: { height: "100%", background: "linear-gradient(90deg,#00c6ff,#0072ff)", borderRadius: "6px", transition: "width 0.6s ease" },
  roleCount: { fontSize: "0.83rem", color: "rgba(255,255,255,0.38)", minWidth: 70, textAlign: "right" },
};
