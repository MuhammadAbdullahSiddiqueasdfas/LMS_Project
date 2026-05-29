export default function Features() {
  const features = [
    { icon: "📚", title: "Course Management", desc: "Easily organize and structure your learning materials." },
    { icon: "🎥", title: "Video Lessons", desc: "High-quality video streaming for immersive learning." },
    { icon: "📈", title: "Analytics Dashboard", desc: "Track progress and performance in real-time." },
    { icon: "🔐", title: "Secure Auth", desc: "Bank-level security for your personal data." },
    { icon: "👨‍🏫", title: "Instructor Panel", desc: "Powerful tools for educators to manage students." },
    { icon: "🧑‍🎓", title: "Student Dashboard", desc: "A clean, focused space for students to learn." },
  ];

  return (
    <section className="py-5" style={{ backgroundColor: "rgba(30, 41, 59, 0.3)" }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">Why Choose Our Platform</h2>
          <p className="text-muted fs-5">Everything you need to learn and teach effectively.</p>
        </div>
        <div className="row g-4">
          {features.map((feature, idx) => (
            <div key={idx} className="col-md-6 col-lg-4">
              <div className="saas-card h-100 p-4 text-center">
                <div className="display-4 mb-3">{feature.icon}</div>
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
