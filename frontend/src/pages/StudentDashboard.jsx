import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, GraduationCap, User,
  LogOut, ChevronRight, Search, Star, Clock, TrendingUp
} from "lucide-react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const TABS = [
  { id: "Overview",       icon: LayoutDashboard, label: "Overview" },
  { id: "Browse Courses", icon: Search,           label: "Browse Courses" },
  { id: "My Courses",     icon: GraduationCap,    label: "My Courses" },
  { id: "Profile",        icon: User,             label: "Profile" },
];

export default function StudentDashboard() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState("Overview");
  const [enrollments, setEnrollments] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [enrollingId, setEnrollingId] = useState(null);

  const notify = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 3500);
  };

  const handleLogout = () => { logout(); navigate("/"); };

  const fetchEnrollments = async () => {
    try {
      const r = await api.get("/enroll/my-courses");
      if (r.data.success) setEnrollments(r.data.enrollments);
    } catch {}
  };

  const fetchCourses = async () => {
    try {
      const r = await api.get("/courses");
      if (r.data.success) setAllCourses(r.data.courses);
    } catch {}
  };

  useEffect(() => {
    fetchEnrollments();
    fetchCourses();
  }, []);

  const enrolledIds = enrollments.map(e => e.course?._id);

  const handleEnroll = async (courseId) => {
    setEnrollingId(courseId);
    try {
      const r = await api.post("/enroll", { courseId });
      if (r.data.success) {
        notify(`Enrolled successfully!`);
        fetchEnrollments();
      } else notify(r.data.message || "Enrollment failed", "error");
    } catch (err) {
      notify(err.response?.data?.message || "Enrollment failed", "error");
    } finally { setEnrollingId(null); }
  };

  const handleProgress = async (enrollmentId, progress) => {
    const r = await api.put(`/enroll/${enrollmentId}/progress`, { progress });
    if (r.data.success) {
      setEnrollments(prev => prev.map(e => e._id === enrollmentId ? { ...e, progress: r.data.progress, isCompleted: r.data.isCompleted } : e));
      notify(r.data.isCompleted ? "Course completed! 🎉" : "Progress updated");
    }
  };

  const filteredCourses = allCourses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const completed = enrollments.filter(e => e.isCompleted).length;
  const inProgress = enrollments.filter(e => !e.isCompleted && e.progress > 0).length;

  return (
    <div style={s.page}>
      {/* HEADER */}
      <header style={s.header}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo/logo.png" alt="Abdrax Learner" style={s.logo} />
        </div>
        <div style={s.headerRight}>
          <div style={s.adminChip}>
            <div style={s.adminAvatar}>{user?.name?.[0]?.toUpperCase() || "S"}</div>
            <div>
              <div style={s.adminName}>{user?.name || "Student"}</div>
              <div style={s.adminRole}>Student</div>
            </div>
          </div>
          <button style={s.logoutBtn} onClick={handleLogout}>
            <LogOut size={15} /><span>Logout</span>
          </button>
        </div>
      </header>

      <div style={s.body}>
        {/* SIDEBAR */}
        <aside style={s.sidebar}>
          <div>
            <p style={s.sidebarLabel}>STUDENT PANEL</p>
            {TABS.map(t => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button key={t.id} style={{ ...s.sidebarBtn, ...(active ? s.sidebarBtnActive : {}) }} onClick={() => setTab(t.id)}>
                  <div style={{ ...s.sidebarIconWrap, ...(active ? s.sidebarIconWrapActive : {}) }}><Icon size={17} /></div>
                  <span style={{ flex: 1 }}>{t.label}</span>
                  {active && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
                </button>
              );
            })}
          </div>
          <div style={s.sidebarBottom}>
            <div style={s.sidebarDivider}></div>
            <button style={s.backLink} onClick={handleLogout}><LogOut size={14} /><span>Logout</span></button>
          </div>
        </aside>

        {/* MAIN */}
        <main style={s.main}>
          <div style={s.pageHeader}>
            <h1 style={s.pageTitle}>{tab}</h1>
            <p style={s.pageSubtitle}>
              {tab === "Overview"       && "Your learning summary and recent activity"}
              {tab === "Browse Courses" && "Discover and enroll in published courses"}
              {tab === "My Courses"     && "Track your enrolled courses and progress"}
              {tab === "Profile"        && "Your account information"}
            </p>
          </div>

          {msg.text && (
            <div style={{ ...s.toast, background: msg.type === "error" ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)", borderColor: msg.type === "error" ? "rgba(239,68,68,0.35)" : "rgba(16,185,129,0.35)", color: msg.type === "error" ? "#f87171" : "#34d399" }}>
              {msg.type === "error" ? "⚠ " : "✓ "}{msg.text}
            </div>
          )}

          {/* OVERVIEW */}
          {tab === "Overview" && (
            <div>
              <div style={s.statsGrid}>
                {[
                  { label: "Enrolled",    value: enrollments.length, Icon: BookOpen,      color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
                  { label: "In Progress", value: inProgress,          Icon: TrendingUp,    color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
                  { label: "Completed",   value: completed,           Icon: GraduationCap, color: "#10b981", bg: "rgba(16,185,129,0.12)" },
                  { label: "Available",   value: allCourses.length,   Icon: Star,          color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
                ].map(c => (
                  <div key={c.label} style={s.statCard}>
                    <div style={{ ...s.statIconBox, background: c.bg, color: c.color }}><c.Icon size={24} /></div>
                    <div><div style={s.statValue}>{c.value}</div><div style={s.statLabel}>{c.label}</div></div>
                  </div>
                ))}
              </div>

              <div style={s.card}>
                <h3 style={s.cardTitle}>Continue Learning</h3>
                {enrollments.filter(e => !e.isCompleted).length === 0 ? (
                  <div style={s.empty}>No courses in progress. <button style={s.emptyBtn} onClick={() => setTab("Browse Courses")}>Browse courses →</button></div>
                ) : enrollments.filter(e => !e.isCompleted).slice(0, 3).map(e => (
                  <div key={e._id} style={s.progressRow}>
                    <div style={{ flex: 1 }}>
                      <div style={s.courseTitle}>{e.course?.title}</div>
                      <div style={s.courseMeta}>By {e.course?.instructor?.name || "Instructor"} · {e.course?.category}</div>
                      <div style={s.progressTrack}>
                        <div style={{ ...s.progressFill, width: `${e.progress}%` }}></div>
                      </div>
                      <div style={s.progressLabel}>{e.progress}% complete</div>
                    </div>
                    <button style={s.btnPrimary} onClick={() => setTab("My Courses")}>Continue</button>
                  </div>
                ))}
              </div>

              <div style={s.card}>
                <h3 style={s.cardTitle}>Latest Available Courses</h3>
                <div style={s.courseGrid}>
                  {allCourses.slice(0, 3).map(c => (
                    <div key={c._id} style={s.courseCard}>
                      <div style={{ ...s.courseThumb, backgroundImage: `url(${c.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80"})` }}></div>
                      <div style={s.courseCardBody}>
                        <span style={s.categoryPill}>{c.category}</span>
                        <div style={s.courseCardTitle}>{c.title}</div>
                        <div style={s.courseCardMeta}>By {c.instructor?.name || "Instructor"}</div>
                        <div style={s.courseCardFooter}>
                          <span style={s.priceTag}>${c.price}</span>
                          {enrolledIds.includes(c._id) ? (
                            <span style={s.enrolledBadge}>✓ Enrolled</span>
                          ) : (
                            <button style={s.enrollBtn} disabled={enrollingId === c._id} onClick={() => handleEnroll(c._id)}>
                              {enrollingId === c._id ? "..." : "Enroll"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BROWSE COURSES */}
          {tab === "Browse Courses" && (
            <div>
              <div style={s.searchWrap}>
                <Search size={18} color="rgba(255,255,255,0.3)" style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)" }} />
                <input style={s.searchInput} placeholder="Search courses by title or category..." value={search} onChange={e => setSearch(e.target.value)} />
              </div>
              {filteredCourses.length === 0 ? (
                <div style={s.empty}>No courses found.</div>
              ) : (
                <div style={s.courseGrid}>
                  {filteredCourses.map(c => (
                    <div key={c._id} style={s.courseCard}>
                      <div style={{ ...s.courseThumb, backgroundImage: `url(${c.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80"})` }}></div>
                      <div style={s.courseCardBody}>
                        <span style={s.categoryPill}>{c.category}</span>
                        <div style={s.courseCardTitle}>{c.title}</div>
                        <div style={s.courseCardMeta}>By {c.instructor?.name || "Instructor"}</div>
                        <div style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", margin: "0.4rem 0" }}>
                          {c.description?.slice(0, 80)}...
                        </div>
                        <div style={s.courseCardFooter}>
                          <span style={s.priceTag}>${c.price}</span>
                          {enrolledIds.includes(c._id) ? (
                            <span style={s.enrolledBadge}>✓ Enrolled</span>
                          ) : (
                            <button style={s.enrollBtn} disabled={enrollingId === c._id} onClick={() => handleEnroll(c._id)}>
                              {enrollingId === c._id ? "Enrolling..." : "Enroll Now"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* MY COURSES */}
          {tab === "My Courses" && (
            <div>
              {enrollments.length === 0 ? (
                <div style={s.card}>
                  <div style={s.empty}>You haven't enrolled in any courses yet. <button style={s.emptyBtn} onClick={() => setTab("Browse Courses")}>Browse courses →</button></div>
                </div>
              ) : enrollments.map(e => (
                <div key={e._id} style={s.enrollCard}>
                  <div style={{ flex: 1 }}>
                    <div style={s.enrollTitle}>{e.course?.title}</div>
                    <div style={s.enrollMeta}>By {e.course?.instructor?.name || "Instructor"} · {e.course?.category}</div>
                    <div style={s.progressTrack}>
                      <div style={{ ...s.progressFill, width: `${e.progress}%` }}></div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                      <span style={s.progressLabel}>{e.progress}% complete</span>
                      {e.isCompleted && <span style={s.completedBadge}>✓ Completed</span>}
                    </div>
                  </div>
                  {!e.isCompleted && (
                    <div style={s.progressBtns}>
                      {[25, 50, 75, 100].map(p => (
                        <button key={p} style={{ ...s.progressBtn, ...(e.progress >= p ? s.progressBtnActive : {}) }}
                          onClick={() => handleProgress(e._id, p)} disabled={e.progress >= p}>
                          {p}%
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PROFILE */}
          {tab === "Profile" && (
            <div style={s.card}>
              <h3 style={s.cardTitle}>Account Information</h3>
              <div style={s.profileGrid}>
                <div style={s.profileAvatar}>{user?.name?.[0]?.toUpperCase() || "S"}</div>
                <div>
                  {[
                    { label: "Full Name", value: user?.name || "—" },
                    { label: "Role",      value: "Student" },
                    { label: "User ID",   value: user?.id || "—" },
                  ].map(f => (
                    <div key={f.label} style={s.profileField}>
                      <div style={s.profileLabel}>{f.label}</div>
                      <div style={s.profileValue}>{f.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", gap: "1rem" }}>
                  <div style={s.statCard}>
                    <div style={{ ...s.statIconBox, background: "rgba(59,130,246,0.12)", color: "#3b82f6" }}><BookOpen size={22} /></div>
                    <div><div style={s.statValue}>{enrollments.length}</div><div style={s.statLabel}>Enrolled</div></div>
                  </div>
                  <div style={s.statCard}>
                    <div style={{ ...s.statIconBox, background: "rgba(16,185,129,0.12)", color: "#10b981" }}><GraduationCap size={22} /></div>
                    <div><div style={s.statValue}>{completed}</div><div style={s.statLabel}>Completed</div></div>
                  </div>
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
  logo: { height: 64, objectFit: "contain" },
  headerRight: { display: "flex", alignItems: "center", gap: "1.25rem" },
  adminChip: { display: "flex", alignItems: "center", gap: "0.75rem" },
  adminAvatar: { width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "1rem" },
  adminName: { fontSize: "0.9rem", fontWeight: "700", lineHeight: 1.2 },
  adminRole: { fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: 2 },
  logoutBtn: { display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "10px", padding: "0.5rem 1.1rem", color: "#f87171", fontSize: "0.88rem", cursor: "pointer", fontWeight: "600" },
  body: { display: "flex", flex: 1 },
  sidebar: { width: 256, minHeight: "calc(100vh - 74px)", background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "1.75rem 1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0 },
  sidebarLabel: { fontSize: "0.68rem", color: "rgba(255,255,255,0.2)", letterSpacing: "2.5px", fontWeight: "700", marginBottom: "0.75rem", paddingLeft: "0.5rem" },
  sidebarBtn: { display: "flex", alignItems: "center", gap: "0.85rem", width: "100%", textAlign: "left", padding: "0.8rem 0.75rem", borderRadius: "12px", border: "none", background: "transparent", color: "rgba(255,255,255,0.45)", fontSize: "0.92rem", cursor: "pointer", marginBottom: "0.3rem", fontWeight: "500" },
  sidebarBtnActive: { background: "linear-gradient(135deg,rgba(16,185,129,0.15),rgba(5,150,105,0.08))", color: "#fff", fontWeight: "700", border: "1px solid rgba(16,185,129,0.2)" },
  sidebarIconWrap: { width: 34, height: 34, borderRadius: "9px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  sidebarIconWrapActive: { background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff" },
  sidebarBottom: { paddingTop: "1rem" },
  sidebarDivider: { height: 1, background: "rgba(255,255,255,0.06)", marginBottom: "1rem" },
  backLink: { display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", background: "none", border: "none", cursor: "pointer", padding: "0.5rem" },
  main: { flex: 1, padding: "2rem 2.5rem", overflowX: "auto" },
  pageHeader: { marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)" },
  pageTitle: { fontSize: "1.7rem", fontWeight: "800", margin: "0 0 0.3rem 0" },
  pageSubtitle: { fontSize: "0.92rem", color: "rgba(255,255,255,0.38)", margin: 0 },
  toast: { padding: "0.9rem 1.25rem", borderRadius: "12px", border: "1px solid", marginBottom: "1.5rem", fontSize: "0.9rem", fontWeight: "500" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem", marginBottom: "1.75rem" },
  statCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.25rem", display: "flex", alignItems: "center", gap: "1rem" },
  statIconBox: { width: 50, height: 50, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  statValue: { fontSize: "1.8rem", fontWeight: "800", lineHeight: 1 },
  statLabel: { fontSize: "0.78rem", color: "rgba(255,255,255,0.4)", marginTop: "0.25rem" },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" },
  cardTitle: { fontSize: "1.05rem", fontWeight: "700", margin: "0 0 1.25rem 0", color: "#fff" },
  empty: { color: "rgba(255,255,255,0.35)", fontSize: "0.95rem", padding: "0.5rem 0" },
  emptyBtn: { background: "none", border: "none", color: "#60a5fa", cursor: "pointer", fontSize: "0.95rem", textDecoration: "underline" },
  courseGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.25rem" },
  courseCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", overflow: "hidden" },
  courseThumb: { height: 160, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" },
  courseCardBody: { padding: "1rem" },
  categoryPill: { background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.25)", color: "#a78bfa", padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "600" },
  courseCardTitle: { fontSize: "0.95rem", fontWeight: "700", margin: "0.5rem 0 0.25rem" },
  courseCardMeta: { fontSize: "0.8rem", color: "rgba(255,255,255,0.4)" },
  courseCardFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem" },
  priceTag: { fontSize: "1rem", fontWeight: "800", color: "#34d399" },
  enrollBtn: { background: "linear-gradient(135deg,#00c6ff,#0072ff)", border: "none", borderRadius: "8px", padding: "0.4rem 1rem", color: "#fff", fontSize: "0.82rem", fontWeight: "700", cursor: "pointer" },
  enrolledBadge: { background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: "#34d399", padding: "0.3rem 0.7rem", borderRadius: "8px", fontSize: "0.8rem", fontWeight: "600" },
  progressRow: { display: "flex", alignItems: "center", gap: "1.5rem", padding: "1rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  courseTitle: { fontSize: "0.95rem", fontWeight: "600", marginBottom: "0.2rem" },
  courseMeta: { fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.6rem" },
  progressTrack: { background: "rgba(255,255,255,0.07)", borderRadius: "6px", height: 7, overflow: "hidden", marginBottom: "0.3rem" },
  progressFill: { height: "100%", background: "linear-gradient(90deg,#00c6ff,#0072ff)", borderRadius: "6px", transition: "width 0.4s ease" },
  progressLabel: { fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" },
  enrollCard: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "14px", padding: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "flex-start", gap: "1.5rem" },
  enrollTitle: { fontSize: "1rem", fontWeight: "700", marginBottom: "0.2rem" },
  enrollMeta: { fontSize: "0.82rem", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" },
  completedBadge: { background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.25)", color: "#34d399", padding: "0.2rem 0.6rem", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "600" },
  progressBtns: { display: "flex", flexDirection: "column", gap: "0.4rem", flexShrink: 0 },
  progressBtn: { padding: "0.3rem 0.7rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", cursor: "pointer", fontWeight: "600" },
  progressBtnActive: { background: "rgba(0,114,255,0.15)", border: "1px solid rgba(0,114,255,0.3)", color: "#60a5fa" },
  searchWrap: { position: "relative", marginBottom: "1.5rem" },
  searchInput: { width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "0.85rem 1rem 0.85rem 3rem", color: "#fff", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" },
  profileGrid: { display: "flex", alignItems: "flex-start", gap: "2rem" },
  profileAvatar: { width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,#10b981,#059669)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: "800", flexShrink: 0 },
  profileField: { marginBottom: "1rem" },
  profileLabel: { fontSize: "0.75rem", color: "rgba(255,255,255,0.35)", fontWeight: "600", letterSpacing: "0.5px", marginBottom: "0.2rem" },
  profileValue: { fontSize: "1rem", fontWeight: "600" },
  btnPrimary: { display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "linear-gradient(135deg,#00c6ff,#0072ff)", border: "none", borderRadius: "10px", padding: "0.6rem 1.2rem", color: "#fff", fontWeight: "700", fontSize: "0.88rem", cursor: "pointer", flexShrink: 0 },
};
