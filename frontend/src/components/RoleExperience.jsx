export default function RoleExperience() {
  const roles = [
    {
      title: "Student",
      label: "Learning portal",
      items: ["Browse courses", "Track progress", "Manage enrollments"],
    },
    {
      title: "Instructor",
      label: "Teaching workspace",
      items: ["Create courses", "Upload lessons", "Manage students"],
    },
    {
      title: "Admin",
      label: "Control center",
      items: ["Manage users", "Monitor platform", "View analytics"],
    },
  ];

  return (
    <section className="role-section py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="section-kicker">Role-based experience</span>
          <h2 className="display-5 fw-bold mb-3">One Platform, Three Powerful Roles</h2>
          <p className="text-muted fs-5">Each user type gets a focused dashboard with the right permissions and actions.</p>
        </div>
        <div className="row g-4">
          {roles.map((role) => (
            <div className="col-md-4" key={role.title}>
              <div className="saas-card role-card h-100 p-4">
                <span className="badge badge-soft mb-3">{role.label}</span>
                <h3 className="fw-bold mb-4">{role.title}</h3>
                <ul className="list-unstyled mb-0">
                  {role.items.map((item) => (
                    <li className="check-line mb-3" key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
