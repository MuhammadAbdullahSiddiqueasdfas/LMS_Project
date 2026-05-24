export default function CourseCard({ course, onEnroll }) {
    return (
        <div className="col-md-4 mb-4">
            <div className="glass-card h-100 d-flex flex-column">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text flex-grow-1">{course.description.slice(0, 80)}...</p>
                <div className="mt-auto">
                    <p className="mb-1"><strong>Category:</strong> {course.category}</p>
                    <p className="mb-1"><strong>Price:</strong> ${course.price}</p>
                    {onEnroll && (
                        <button className="btn btn-primary w-100" onClick={onEnroll}>Enroll</button>
                    )}
                </div>
            </div>
        </div>
    );
}
