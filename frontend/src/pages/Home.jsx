export default function Home() {
    return (
        <section className="bg-dark text-light py-5 text-center">
            <div className="container">
                <h1 className="display-4">Welcome to the LMS</h1>
                <p className="lead">Learn, create, and manage courses – all in one place.</p>
                <a href="/courses" className="btn btn-primary btn-lg m-2">Browse Courses</a>
                <a href="/register" className="btn btn-outline-light btn-lg m-2">Get Started</a>
            </div>
        </section>
    );
}