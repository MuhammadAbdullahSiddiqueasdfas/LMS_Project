import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, BookOpen, PlusCircle, Upload, LogOut, ArrowLeft, ChevronRight, BookMarked, Users, CheckCircle } from "lucide-react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";

const TABS = [
  { id: "Overview",       icon: LayoutDashboard, label: "Overview" },
  { id: "My Courses",     icon: BookOpen,         label: "My Courses" },
  { id: "Create Course",  icon: PlusCircle,       label: "Create Course" },
  { id: "Upload Lessons", icon: Upload,           label: "Upload Lessons" },
];

const EMPTY_FORM = { title: "", description: "", category: "", price: "" };
const EMPTY_LESSON = { courseId: "", title: "", content: "", videoUrl: "" };

export default function InstructorDashboard() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState("Overview");
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [lessonForm, setLessonForm] = useState(EMPTY_LESSON);
  const [editCourse, setEditCourse] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const notify = (text, type = "success") => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 3500);
  };

  const handleLogout = () => { logout(); navigate("/"); };

  const fetchCourses = async () => {
    try {
      const r = await api.get("/courses/instructor/my-courses");
      if (r.data.success) setCourses(r.data.courses);
    } catch {}
  };

  useEffect(() => { fetchCourses(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await api.post("/courses", form);
      if (r.data.success) {
        notify("Course created successfully!");
        setCourses(prev => [r.data.course, ...prev]);
        setForm(EMPTY_FORM);
        setTab("My Courses");
      } else notify(r.data.message || "Failed to create", "error");
    } catch (err) {
      notify(err.response?.data?.message || "Failed to create course", "error");
    } finally { setLoading(false); }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const r = await api.put(`/courses/${editCourse._id}`, editCourse);
      if (r.data.success) {
        notify("Course updated successfully!");
        setCourses(prev => prev.map(c => c._id === editCourse._id ? r.data.course : c));
        setEditCourse(null);
      } else notify(r.data.message || "Failed to update", "error");
    } catch (err) {
      notify(err.response?.data?.message || "Failed to update", "error");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course permanently?")) return;
    const r = await api.delete(`/courses/${id}`);
    if (r.data.success) { setCourses(prev => prev.filter(c => c._id !== id)); notify("Course deleted"); }
    else notify(r.data.message || "Failed to delete", "error");
  };

  const handleTogglePublish = async (course) => {
    const r = await api.put(`/courses/${course._id}`, { isPublished: !course.isPublished });
    if (r.data.success) {
      setCourses(prev => prev.map(c => c._id === course._id ? { ...c, isPublished: !c.isPublished } : c));
      notify(`Course ${!course.isPublished ? "published" : "unpublished"}`);
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!lessonForm.courseId) return notify("Please select a course", "error");
    setLoading(true);
    try {
      const r = await api.post(`/courses/${lessonForm.courseId}/lessons`, {
        title: lessonForm.title, content: lessonForm.content, videoUrl: lessonForm.videoUrl,
      });
      if (r.data.success) {
        notify("Lesson added successfully!");
        setLessonForm(EMPTY_LESSON);
      } else notify(r.data.message || "Failed to add lesson", "error");
    } catch (err) {
      notify(err.response?.data?.message || "Failed to add lesson", "error");
    } finally { setLoading(false); }
  };

  const published = courses.filter(c => c.isPublished).length;
  const totalLessons = courses.reduce((acc, c) => acc + (c.lessons?.length || 0), 0);

  return (
    <div style={s.page}>
      {/* HEADER */}
      <header style={s.header}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src="/logo/logo.png" alt="Abdrax Learner" style={s.logo} />
        </div>
        <div style={s.headerRight}>
          <div style={s.adminChip}>
            <div style={s.adminAvatar}>{user?.name?.[0]?.toUpperCase() || "I"}</div>
            <div>
              <div style={s.adminName}>{user?.name || "Instructor"}</div>
              <div style={s.adminRole}>Instructor</div>
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
            <p style={s.sidebarLabel}>INSTRUCTOR PANEL</p>
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
            <button style={s.backLink} onClick={handleLogout}><ArrowLeft size={14} /><span>Back to Site</span></button>
          </div>
        </aside>

        {/* MAIN */}
        <main style={s.main}>
          <div style={s.pageHeader}>
            <h1 style={s.pageTitle}>{tab}</h1>
            <p style={s.pageSubtitle}>
              {tab === "Overview"       && "Your teaching summary and course statistics"}
              {tab === "My Courses"     && "Manage, edit, publish and delete your courses"}
              {tab === "Create Course"  && "Create a new course for your students"}
              {tab === "Upload Lessons" && "Add lessons to your existing courses"}
            </p>
          </div>

          {msg.text && (
            <div style={{ ...s.toast, background: msg.type === "error" ? "rgba(239,68,68,0.1)" : "rgba(16,185,129,0.1)", borderColor: msg.type === "error" ? "rgba(239,68,68,0.35)" : "rgba(16,185,129,0.35)", color: msg.type === "error" ? "#f87171" : "#34d399" }}>
              {msg.type === "error" ? "⚠ " : "✓ "}{msg.text}
            </div>
          )}

          {/* OVERVIEW TAB */}
          {tab === "Overview" && (
            <div>
              <div style={s.statsGrid}>
                {[
                  { label: "Total Courses", value: courses.length, Icon: BookMarked, color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
                  { label: "Published",     value: published,       Icon: CheckCircle, color: "#10b981", bg: "rgba(16,185,129,0.12)" },
                  { label: "Drafts",        value: courses.length - published, Icon: BookOpen, color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
                  { label: "Total Lessons", value: totalLessons,    Icon: Upload,      color: "#8b5cf6", bg: "rgba(139,92,246,0.12)" },
                ].map(c => (
                  <div key={c.label} style={s.statCard}>
                    <div style={{ ...s.statIconBox, background: c.bg, color: c.color }}><c.Icon size={24} /></div>
                    <div><div style={s.statValue}>{c.value}</div><div style={s.statLabel}>{c.label}</div></div>
                  </div>
                ))}
              </div>
              <div style={s.card}>
                <h3 style={s.cardTitle}>Recent Courses</h3>
                {courses.length === 0 ? (
                  <div style={s.empty}>No courses yet. <button style={s.emptyBtn} onClick={() => setTab("Create Course")}>Create your first course →</button></div>
                ) : courses.slice(0, 5).map(c => (
                  <div key={c._id} style={s.courseRow}>
                    <div style={{ flex: 1 }}>
                      <div style={s.courseTitle}>{c.title}</div>
                      <div style={s.courseMeta}>{c.category} · ${c.price}</div>
                    </div>
                    <span style={{ ...s.pill, background: c.isPublished ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: c.isPublished ? "#34d399" : "#fbbf24", border: `1px solid ${c.isPublished ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)"}` }}>
                      {c.isPublished ? "● Published" : "● Draft"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MY COURSES TAB */}
          {tab === "My Courses" && (
            <div>
              {editCourse ? (
                <div style={s.card}>
                  <h3 style={s.cardTitle}>Edit Course</h3>
                  <form onSubmit={handleUpdate}>
                    {[["Title","title"],["Category","category"]].map(([label, key]) => (
                      <div key={key} style={s.field}>
                        <label style={s.label}>{label}</label>
                        <input style={s.input} required value={editCourse[key]} onChange={e => setEditCourse({ ...editCourse, [key]: e.target.value })} />
                      </div>
                    ))}
                    <div style={s.field}>
                      <label style={s.label}>Description</label>
                      <textarea style={{ ...s.input, minHeight: 100, resize: "vertical" }} required value={editCourse.description} onChange={e => setEditCourse({ ...editCourse, description: e.target.value })} />
                    </div>
                    <div style={s.field}>
                      <label style={s.label}>Price ($)</label>
                      <input style={s.input} type="number" min="0" required value={editCourse.price} onChange={e => setEditCourse({ ...editCourse, price: e.target.value })} />
                    </div>
                    <div style={s.btnRow}>
                      <button type="submit" style={s.btnPrimary} disabled={loading}>{loading ? "Saving..." : "Save Changes"}</button>
                      <button type="button" style={s.btnSecondary} onClick={() => setEditCourse(null)}>Cancel</button>
                    </div>
                  </form>
                </div>
              ) : (
                <div style={s.card}>
                  <div style={s.cardHeaderRow}>
                    <h3 style={s.cardTitle}>My Courses ({courses.length})</h3>
                    <button style={s.btnPrimary} onClick={() => setTab("Create Course")}><PlusCircle size={15} /> New Course</button>
                  </div>
                  {courses.length === 0 ? (
                    <div style={s.empty}>No courses yet. <button style={s.emptyBtn} onClick={() => setTab("Create Course")}>Create your first course →</button></div>
                  ) : (
                    <div style={s.tableWrap}>
                      <table style={s.table}>
                        <thead><tr>{["Title","Category","Price","Lessons","Status","Actions"].map(h => <th key={h} style={s.th}>{h}</th>)}</tr></thead>
                        <tbody>
                          {courses.map(c => (
                            <tr key={c._id} style={s.tr}>
                              <td style={{ ...s.td, fontWeight: 600, maxWidth: 200 }}>{c.title}</td>
                              <td style={s.td}><span style={{ ...s.pill, background: "rgba(139,92,246,0.1)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.25)" }}>{c.category}</span></td>
                              <td style={{ ...s.td, color: "#34d399", fontWeight: 700 }}>${c.price}</td>
                              <td style={{ ...s.td, color: "rgba(255,255,255,0.5)" }}>{c.lessons?.length || 0}</td>
                              <td style={s.td}>
                                <span style={{ ...s.pill, background: c.isPublished ? "rgba(16,185,129,0.1)" : "rgba(245,158,11,0.1)", color: c.isPublished ? "#34d399" : "#fbbf24", border: `1px solid ${c.isPublished ? "rgba(16,185,129,0.25)" : "rgba(245,158,11,0.25)"}` }}>
                                  {c.isPublished ? "● Published" : "● Draft"}
                                </span>
                              </td>
                              <td style={s.td}>
                                <div style={s.actionRow}>
                                  <button style={s.actionBtn} onClick={() => setEditCourse({ ...c })}>Edit</button>
                                  <button style={s.actionBtn} onClick={() => handleTogglePublish(c)}>{c.isPublished ? "Unpublish" : "Publish"}</button>
                                  <button style={{ ...s.actionBtn, ...s.actionDanger }} onClick={() => handleDelete(c._id)}>Delete</button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* CREATE COURSE TAB */}
          {tab === "Create Course" && (
            <div style={s.card}>
              <h3 style={s.cardTitle}>Create New Course</h3>
              <form onSubmit={handleCreate}>
                <div style={s.formGrid}>
                  <div style={s.field}>
                    <label style={s.label}>Course Title *</label>
                    <input style={s.input} placeholder="e.g. Complete React JS Course" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Category *</label>
                    <input style={s.input} placeholder="e.g. Web Development" required value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                  </div>
                </div>
                <div style={s.field}>
                  <label style={s.label}>Description *</label>
                  <textarea style={{ ...s.input, minHeight: 120, resize: "vertical" }} placeholder="Describe what students will learn..." required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                </div>
                <div style={{ ...s.formGrid, gridTemplateColumns: "1fr 1fr" }}>
                  <div style={s.field}>
                    <label style={s.label}>Price ($)</label>
                    <input style={s.input} type="number" min="0" placeholder="0 for free" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Thumbnail URL (optional)</label>
                    <input style={s.input} placeholder="https://..." value={form.thumbnail || ""} onChange={e => setForm({ ...form, thumbnail: e.target.value })} />
                  </div>
                </div>
                <button type="submit" style={s.btnPrimary} disabled={loading}>{loading ? "Creating..." : "Create Course"}</button>
              </form>
            </div>
          )}

          {/* UPLOAD LESSONS TAB */}
          {tab === "Upload Lessons" && (
            <div style={s.card}>
              <h3 style={s.cardTitle}>Add Lesson to Course</h3>
              {courses.length === 0 ? (
                <div style={s.empty}>You need to create a course first. <button style={s.emptyBtn} onClick={() => setTab("Create Course")}>Create course →</button></div>
              ) : (
                <form onSubmit={handleAddLesson}>
                  <div style={s.field}>
                    <label style={s.label}>Select Course *</label>
                    <select style={s.input} required value={lessonForm.courseId} onChange={e => setLessonForm({ ...lessonForm, courseId: e.target.value })}>
                      <option value="">-- Choose a course --</option>
                      {courses.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
                    </select>
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Lesson Title *</label>
                    <input style={s.input} placeholder="e.g. Introduction to React Hooks" required value={lessonForm.title} onChange={e => setLessonForm({ ...lessonForm, title: e.target.value })} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Lesson Content</label>
                    <textarea style={{ ...s.input, minHeight: 120, resize: "vertical" }} placeholder="Write lesson content or notes here..." value={lessonForm.content} onChange={e => setLessonForm({ ...lessonForm, content: e.target.value })} />
                  </div>
                  <div style={s.field}>
                    <label style={s.label}>Video URL (optional)</label>
                    <input style={s.input} placeholder="https://youtube.com/..." value={lessonForm.videoUrl} onChange={e => setLessonForm({ ...lessonForm, videoUrl: e.target.value })} />
                  </div>
                  <button type="submit" style={s.btnPrimary} disabled={loading}>{loading ? "Adding..." : "Add Lesson"}</button>
                </form>
              )}

              {lessonForm.courseId && (
                <div style={{ marginTop: "2rem" }}>
                  <h4 style={{ ...s.cardTitle, fontSize: "0.95rem" }}>Lessons in selected course</h4>
                  {courses.find(c => c._id === lessonForm.courseId)?.lessons?.length > 0 ? (
                    courses.find(c => c._id === lessonForm.courseId).lessons.map((l, i) => (
                      <div key={i} style={s.lessonRow}>
                        <span style={s.lessonNum}>{i + 1}</span>
                        <span style={s.lessonTitle}>{l.title}</span>
                        {l.videoUrl && <a href={l.videoUrl} target="_blank" rel="noreferrer" style={s.lessonLink}>▶ Video</a>}
                      </div>
                    ))
                  ) : <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.9rem" }}>No lessons yet in this course.</p>}
                </div>
              )}
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
  adminAvatar: { width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg,#00c6ff,#0072ff)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "1rem" },
  adminName: { fontSize: "0.9rem", fontWeight: "700", lineHeight: 1.2 },
  adminRole: { fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginTop: 2 },
  logoutBtn: { display: "flex", alignItems: "center", gap: "0.4rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "10px", padding: "0.5rem 1.1rem", color: "#f87171", fontSize: "0.88rem", cursor: "pointer", fontWeight: "600" },
  body: { display: "flex", flex: 1 },
  sidebar: { width: 256, minHeight: "calc(100vh - 74px)", background: "rgba(255,255,255,0.02)", borderRight: "1px solid rgba(255,255,255,0.06)", padding: "1.75rem 1rem", display: "flex", flexDirection: "column", justifyContent: "space-between", flexShrink: 0 },
  sidebarLabel: { fontSize: "0.68rem", color: "rgba(255,255,255,0.2)", letterSpacing: "2.5px", fontWeight: "700", marginBottom: "0.75rem", paddingLeft: "0.5rem" },
  sidebarBtn: { display: "flex", alignItems: "center", gap: "0.85rem", width: "100%", textAlign: "left", padding: "0.8rem 0.75rem", borderRadius: "12px", border: "none", background: "transparent", color: "rgba(255,255,255,0.45)", fontSize: "0.92rem", cursor: "pointer", marginBottom: "0.3rem", fontWeight: "500" },
  sidebarBtnActive: { background: "linear-gradient(135deg,rgba(0,114,255,0.15),rgba(0,198,255,0.08))", color: "#fff", fontWeight: "700", border: "1px solid rgba(0,114,255,0.2)" },
  sidebarIconWrap: { width: 34, height: 34, borderRadius: "9px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  sidebarIconWrapActive: { background: "linear-gradient(135deg,#0072ff,#00c6ff)", color: "#fff" },
  sidebarBottom: { paddingTop: "1rem" },
  sidebarDivider: { height: 1, background: "rgba(255,255,255,0.06)", marginBottom: "1rem" },
  backLink: { display: "flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.3)", fontSize: "0.85rem", background: "none", border: "none", cursor: "pointer", padding: "0.5rem" },
  main: { flex: 1, padding: "2rem 2.5rem", overflowX: "auto" },
  pageHeader: { marginBottom: "2rem", paddingBottom: "1.25rem", borderBottom: "1px solid rgba(255,255,255,0.06)" },
  pageTitle: { fontSize: "1.7rem", fontWeight: "800", margin: "0 0 0.3rem 0" },
  pageSubtitle: { fontSize: "0.92rem", color: "rgba(255,255,255,0.38)", margin: 0 },
  toast: { padding: "0.9rem 1.25rem", borderRadius: "12px", border: "1px solid", marginBottom: "1.5rem", fontSize: "0.9rem", fontWeight: "500" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.25rem", marginBottom: "1.75rem" },
  statCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", display: "flex", alignItems: "center", gap: "1.25rem" },
  statIconBox: { width: 54, height: 54, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  statValue: { fontSize: "2rem", fontWeight: "800", lineHeight: 1 },
  statLabel: { fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: "0.3rem" },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "1.5rem", marginBottom: "1.5rem" },
  cardHeaderRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" },
  cardTitle: { fontSize: "1.05rem", fontWeight: "700", margin: "0 0 1.25rem 0", color: "#fff" },
  courseRow: { display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  courseTitle: { fontSize: "0.95rem", fontWeight: "600" },
  courseMeta: { fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", marginTop: "0.2rem" },
  pill: { padding: "0.25rem 0.7rem", borderRadius: "20px", fontSize: "0.78rem", fontWeight: "600", whiteSpace: "nowrap" },
  empty: { color: "rgba(255,255,255,0.35)", fontSize: "0.95rem", padding: "1rem 0" },
  emptyBtn: { background: "none", border: "none", color: "#60a5fa", cursor: "pointer", fontSize: "0.95rem", textDecoration: "underline" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" },
  th: { padding: "0.85rem 1rem", textAlign: "left", color: "rgba(255,255,255,0.3)", fontWeight: "600", fontSize: "0.75rem", letterSpacing: "0.5px", borderBottom: "1px solid rgba(255,255,255,0.07)", whiteSpace: "nowrap" },
  tr: { borderBottom: "1px solid rgba(255,255,255,0.04)" },
  td: { padding: "1rem", color: "rgba(255,255,255,0.8)", verticalAlign: "middle" },
  actionRow: { display: "flex", gap: "0.5rem" },
  actionBtn: { padding: "0.35rem 0.8rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", cursor: "pointer", fontWeight: "500", whiteSpace: "nowrap" },
  actionDanger: { background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "#f87171" },
  formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
  field: { marginBottom: "1.1rem" },
  label: { display: "block", fontSize: "0.83rem", color: "rgba(255,255,255,0.55)", fontWeight: "600", marginBottom: "0.4rem" },
  input: { width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", padding: "0.75rem 1rem", color: "#fff", fontSize: "0.92rem", outline: "none", boxSizing: "border-box" },
  btnRow: { display: "flex", gap: "0.75rem", marginTop: "0.5rem" },
  btnPrimary: { display: "inline-flex", alignItems: "center", gap: "0.4rem", background: "linear-gradient(135deg,#00c6ff,#0072ff)", border: "none", borderRadius: "12px", padding: "0.75rem 1.5rem", color: "#fff", fontWeight: "700", fontSize: "0.92rem", cursor: "pointer", boxShadow: "0 4px 15px rgba(0,114,255,0.3)" },
  btnSecondary: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "12px", padding: "0.75rem 1.5rem", color: "rgba(255,255,255,0.7)", fontWeight: "600", fontSize: "0.92rem", cursor: "pointer" },
  lessonRow: { display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.65rem 0", borderBottom: "1px solid rgba(255,255,255,0.05)" },
  lessonNum: { width: 26, height: 26, borderRadius: "50%", background: "rgba(0,114,255,0.15)", color: "#60a5fa", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.78rem", fontWeight: "700", flexShrink: 0 },
  lessonTitle: { flex: 1, fontSize: "0.9rem", color: "rgba(255,255,255,0.75)" },
  lessonLink: { fontSize: "0.8rem", color: "#60a5fa", textDecoration: "none" },
};
