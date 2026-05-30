export default function Features() {
  const features = [
    { icon: "AU", title: "Secure Authentication", desc: "Protected login and account security for every user." },
    { icon: "CM", title: "Course Management", desc: "Create, update, and organize courses efficiently." },
    { icon: "SL", title: "Interactive Learning", desc: "Access lessons, courses, and progress tracking." },
    { icon: "IW", title: "Instructor Workspace", desc: "Manage lessons, students, and learning content." },
    { icon: "AC", title: "Administrative Control", desc: "Monitor users, courses, and system activity." },
    { icon: "LA", title: "Learning Analytics", desc: "Track engagement and learning performance." },
  ];

  return (
    <section id="features" className="section-band py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="section-kicker">Platform features</span>
          <h2 className="display-5 fw-bold mb-3">Everything Your LMS Needs</h2>
          <p className="text-muted fs-5">Core modules are presented clearly for students, instructors, admins, and evaluators.</p>
        </div>
        <div className="row g-4">
          {features.map((feature) => (
            <div key={feature.title} className="col-md-6 col-lg-4">
              <div className="saas-card feature-card h-100 p-4">
                <div className="feature-icon mb-4">{feature.icon}</div>
                <h4 className="fw-bold mb-2">{feature.title}</h4>
                <p className="text-muted mb-0">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
