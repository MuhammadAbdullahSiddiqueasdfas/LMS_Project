import React from 'react';
import './Courses.css';

function Courses() {
  const mockCourses = [
    { id: 1, title: 'Introduction to React', instructor: 'Alice Johnson', price: '$49.99', category: 'Web Development' },
    { id: 2, title: 'Advanced Node.js', instructor: 'Bob Smith', price: '$59.99', category: 'Backend' },
    { id: 3, title: 'UI/UX Design Fundamentals', instructor: 'Carol White', price: '$39.99', category: 'Design' },
    { id: 4, title: 'Fullstack MERN Bootcamp', instructor: 'David Brown', price: '$99.99', category: 'Web Development' },
    { id: 5, title: 'Python for Data Science', instructor: 'Eva Green', price: '$69.99', category: 'Data Science' },
    { id: 6, title: 'Mastering Docker', instructor: 'Frank Black', price: '$44.99', category: 'DevOps' },
  ];

  return (
    <div className="container courses-page">
      <div className="courses-header">
        <h1>Available Courses</h1>
        <p>Explore our wide range of courses and start learning today.</p>
      </div>

      <div className="courses-grid">
        {mockCourses.map(course => (
          <div key={course.id} className="course-card card">
            <div className="course-category">{course.category}</div>
            <h3 className="course-title">{course.title}</h3>
            <p className="course-instructor">By {course.instructor}</p>
            <div className="course-footer">
              <span className="course-price">{course.price}</span>
              <button className="btn">Enroll</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;