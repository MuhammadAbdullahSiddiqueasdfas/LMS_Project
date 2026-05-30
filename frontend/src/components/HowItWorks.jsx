export default function HowItWorks() {
  const steps = [
    { num: "1", title: "Register Account", desc: "Create a secure student, instructor, or admin account." },
    { num: "2", title: "Explore Courses", desc: "Browse courses, view details, and choose a learning path." },
    { num: "3", title: "Start Learning", desc: "Enroll, follow lessons, and track your progress." },
  ];

  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="section-kicker">Simple flow</span>
          <h2 className="display-5 fw-bold mb-3">How It Works</h2>
          <p className="text-muted fs-5">A clean three-step student journey from account creation to learning.</p>
        </div>
        <div className="row g-4 position-relative">
          <div className="d-none d-lg-block position-absolute top-50 start-0 w-100 border-top border-secondary opacity-25" style={{ zIndex: 0 }}></div>
          {steps.map((step) => (
            <div key={step.num} className="col-lg-4 position-relative" style={{ zIndex: 1 }}>
              <div className="text-center">
                <div className="step-circle mx-auto mb-4">{step.num}</div>
                <h4 className="fw-bold mb-2">{step.title}</h4>
                <p className="text-muted px-4">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
