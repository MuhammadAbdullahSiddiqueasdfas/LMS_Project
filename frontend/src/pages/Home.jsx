import { Link } from "react-router-dom";
import { useModal } from "../context/ModalContext";
import Hero from "../components/Hero";
import Features from "../components/Features";
import PopularCourses from "../components/Landing/PopularCourses";
import RoleExperience from "../components/RoleExperience";
import HowItWorks from "../components/HowItWorks";
import DashboardPreview from "../components/DashboardPreview";
import InstructorSection from "../components/InstructorSection";
import Testimonials from "../components/Testimonials";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Landing/Footer";

export default function Home() {
  const { openRegister } = useModal();

  return (
    <div className="landing-page text-light overflow-hidden">
      <Hero />
      <Features />
      <PopularCourses />
      <RoleExperience />
      <HowItWorks />
      <DashboardPreview />
      <InstructorSection />
      <Testimonials />
      <ContactSection />

      <section className="final-cta py-5 text-center">
        <div className="container py-5">
          <span className="section-kicker">Ready to begin</span>
          <h2 className="display-5 fw-bolder mb-3">Start Your Learning Journey Today</h2>
          <p className="lead text-muted mb-4">Join a role-based learning platform built for students, instructors, and administrators.</p>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
            <button onClick={openRegister} className="btn btn-primary-custom btn-lg px-5 py-3 rounded-pill fw-bold">Register</button>
            <Link to="/courses" className="btn btn-outline-light btn-lg px-5 py-3 rounded-pill fw-bold">Explore Courses</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
