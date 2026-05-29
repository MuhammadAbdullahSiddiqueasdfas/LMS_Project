export default function HowItWorks() {
  const steps = [
    { num: "1", title: "Create Account", desc: "Sign up in seconds and get instant access to our entire catalog." },
    { num: "2", title: "Enroll in Course", desc: "Choose from hundreds of top-tier courses across multiple fields." },
    { num: "3", title: "Start Learning", desc: "Learn at your own pace with lifetime access and progress tracking." },
  ];

  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">How It Works</h2>
          <p className="text-muted fs-5">Start your learning journey in three simple steps.</p>
        </div>
        <div className="row g-4 position-relative">
          {/* Timeline line connecting steps on large screens */}
          <div className="d-none d-lg-block position-absolute top-50 start-0 w-100 border-top border-secondary opacity-25" style={{ zIndex: 0 }}></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="col-lg-4 position-relative" style={{ zIndex: 1 }}>
              <div className="text-center">
                <div 
                  className="d-flex align-items-center justify-content-center mx-auto rounded-circle mb-4 shadow"
                  style={{ width: "80px", height: "80px", background: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)", fontSize: "2rem", fontWeight: "bold" }}
                >
                  {step.num}
                </div>
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
