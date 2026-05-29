export default function Testimonials() {
  const reviews = [
    { name: "Sarah Jenkins", role: "Web Developer", text: "This LMS completely changed my learning experience. The courses are top-notch and the platform is incredibly smooth.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "David Chen", role: "Data Scientist", text: "I've tried many platforms, but the analytics and interactive lessons here are unmatched. Highly recommended!", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Emily Watson", role: "UX Designer", text: "The UI is gorgeous. It makes studying feel less like a chore and more like a premium experience.", img: "https://randomuser.me/api/portraits/women/68.jpg" },
  ];

  return (
    <section className="py-5">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold mb-3">What Our Students Say</h2>
          <p className="text-muted fs-5">Join thousands of happy learners achieving their goals.</p>
        </div>
        <div className="row g-4">
          {reviews.map((review, idx) => (
            <div key={idx} className="col-md-4">
              <div className="saas-card h-100 p-4">
                <div className="d-flex text-warning mb-3">
                  ★★★★★
                </div>
                <p className="text-muted fst-italic mb-4">"{review.text}"</p>
                <div className="d-flex align-items-center mt-auto">
                  <img src={review.img} alt={review.name} className="rounded-circle me-3" width="50" height="50" style={{ border: "2px solid #06b6d4" }} />
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
