export default function ContactSection() {
  return (
    <section id="contact" className="contact-section py-5">
      <div className="container py-5">
        <div className="row g-4 align-items-stretch">
          <div className="col-lg-5">
            <span className="section-kicker">Contact</span>
            <h2 className="display-5 fw-bold mb-3">Need LMS Support?</h2>
            <p className="text-muted fs-5 mb-4">
              Reach the team for course help, instructor onboarding, or platform administration questions.
            </p>
            <div className="contact-list">
              <div><strong>Email</strong><span>abdraxofficial@gmail.com</span></div>
              <div><strong>Location</strong><span>Punjab, Pakistan</span></div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="saas-card p-4 h-100">
              <div className="row g-3">
                <div className="col-md-6">
                  <input className="form-control form-control-lg" placeholder="Your name" />
                </div>
                <div className="col-md-6">
                  <input className="form-control form-control-lg" placeholder="Email address" />
                </div>
                <div className="col-12">
                  <input className="form-control form-control-lg" placeholder="Subject" />
                </div>
                <div className="col-12">
                  <textarea className="form-control form-control-lg" rows="4" placeholder="Message"></textarea>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary-custom btn-lg px-5 rounded-pill" type="button">Send Message</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
