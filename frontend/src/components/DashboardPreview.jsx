export default function DashboardPreview() {
  return (
    <section className="dashboard-preview-section py-5">
      <div className="container py-5">
        <div className="row align-items-center g-5">
          <div className="col-lg-5">
            <span className="section-kicker">Analytics preview</span>
            <h2 className="display-5 fw-bold mb-3">Reports That Make The System Feel Complete</h2>
            <p className="text-muted fs-5 mb-4">
              Dashboard previews show course stats, user management, enrollments, and learning activity in one professional view.
            </p>
            <div className="row g-3">
              <div className="col-6"><div className="mini-stat"><strong>1,240</strong><span>Users</span></div></div>
              <div className="col-6"><div className="mini-stat"><strong>320</strong><span>Courses</span></div></div>
              <div className="col-6"><div className="mini-stat"><strong>890</strong><span>Enrollments</span></div></div>
              <div className="col-6"><div className="mini-stat"><strong>94%</strong><span>Completion</span></div></div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="analytics-board">
              <div className="analytics-header">
                <div>
                  <small>Admin overview</small>
                  <strong>Platform Activity</strong>
                </div>
                <span>May 2026</span>
              </div>
              <div className="bar-chart">
                {[45, 72, 54, 88, 64, 92, 76].map((height, index) => (
                  <i key={index} style={{ height: `${height}%` }}></i>
                ))}
              </div>
              <div className="analytics-table">
                <div><span>Course approvals</span><strong>24</strong></div>
                <div><span>New students</span><strong>146</strong></div>
                <div><span>Lessons published</span><strong>58</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
