export default function Testimonials() {
  const reviews = [
    { name: "Fatima Malik", role: "Web Developer", text: "This LMS completely changed my learning experience. The courses are clear, and the dashboard makes progress easy to follow.", img: "/testonomials/females.png" },
    { name: "Usman Tariq", role: "Data Scientist", text: "The role-based dashboards make the platform feel like a real production system, not just a course list.", img: "/testonomials/males.png" },
    { name: "Zainab Hussain", role: "UX Designer", text: "Clean UI, simple navigation, and a polished learning flow. It feels professional from the first screen.", img: "/testonomials/females.png" },
  ];

  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <span className="section-kicker">Testimonials</span>
          <h2 className="display-5 fw-bold mb-3">What Our Students Say</h2>
          <p className="text-muted fs-5">Minimal social proof for a modern SaaS-style landing page.</p>
        </div>
        <div className="row g-4">
          {reviews.map((review) => (
            <div key={review.name} className="col-md-4">
              <div className="saas-card h-100 p-4">
                <div className="rating mb-3">5.0 rating</div>
                <p className="text-muted fst-italic mb-4">"{review.text}"</p>
                <div className="d-flex align-items-center mt-auto">
                  <img src={review.img} alt={review.name} className="rounded-circle me-3" width="50" height="50" />
                  <div>
                    <h6 className="fw-bold mb-0">{review.name}</h6>
                    <small className="text-muted">{review.role}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
