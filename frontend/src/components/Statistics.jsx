export default function Statistics() {
  const stats = [
    { value: "10K+", label: "Students Worldwide" },
    { value: "500+", label: "Interactive Courses" },
    { value: "120+", label: "Expert Instructors" },
    { value: "95%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="py-5 border-top border-bottom border-secondary border-opacity-25" style={{ background: "linear-gradient(90deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 100%)" }}>
      <div className="container py-4">
        <div className="row text-center g-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="col-6 col-md-3">
              <div className="display-4 fw-bolder text-gradient mb-2">{stat.value}</div>
              <div className="fs-5 text-muted fw-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
