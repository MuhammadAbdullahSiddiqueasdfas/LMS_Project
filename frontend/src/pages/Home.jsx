import Hero from "../components/Hero";
import Features from "../components/Features";
import PopularCourses from "../components/Landing/PopularCourses";
import HowItWorks from "../components/HowItWorks";
import InstructorSection from "../components/InstructorSection";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Landing/Footer";

export default function Home() {
    return (
        <div className="bg-dark text-light overflow-hidden">
            <Hero />
            <Statistics />
            <Features />
            <PopularCourses />
            <HowItWorks />
            <InstructorSection />
            <Testimonials />
            
            {/* Call To Action Before Footer */}
            <section className="py-5 text-center" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
                <div className="container py-5">
                    <h2 className="display-4 fw-bolder mb-3">Start Your Learning Journey Today</h2>
                    <p className="lead text-muted mb-4">Join our community and transform your skills with the best courses.</p>
                    <a href="/register" className="btn btn-primary-custom btn-lg px-5 py-3 rounded-pill fw-bold shadow-lg">Register Now</a>
                </div>
            </section>
            
            <Footer />
        </div>
    );
}