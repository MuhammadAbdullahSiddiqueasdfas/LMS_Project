const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/user");
const Course = require("./models/course");
const Enrollment = require("./models/enrollment");

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Connected to MongoDB...");

  // Clean old dummy data only (keep admin)
  await User.deleteMany({ email: { $in: ["instructor@abdrax.com", "student1@abdrax.com", "student2@abdrax.com"] } });
  await Course.deleteMany({ title: { $in: ["Complete MERN Stack Development", "React JS Masterclass", "Node.js & Express API"] } });

  // Create admin if not exists
  const existingAdmin = await User.findOne({ email: "admin@abdrax.com" });
  if (!existingAdmin) {
    await User.create({ name: "Admin", email: "admin@abdrax.com", password: "admin123", role: "admin" });
    console.log("Admin created: admin@abdrax.com");
  }

  // Create instructor
  const instructor = await User.create({
    name: "Usman Tariq",
    email: "instructor@abdrax.com",
    password: "instructor123",
    role: "instructor",
  });
  console.log("Instructor created:", instructor.email);

  // Create 2 students
  const student1 = await User.create({
    name: "Fatima Malik",
    email: "student1@abdrax.com",
    password: "student123",
    role: "student",
  });

  const student2 = await User.create({
    name: "Zainab Hussain",
    email: "student2@abdrax.com",
    password: "student123",
    role: "student",
  });
  console.log("Students created:", student1.email, student2.email);

  // Create 3 courses
  const course1 = await Course.create({
    title: "Complete MERN Stack Development",
    description: "Learn MongoDB, Express, React and Node.js from scratch. Build real-world full stack applications with authentication, REST APIs and deployment.",
    instructor: instructor._id,
    category: "Web Development",
    price: 49,
    isPublished: true,
    thumbnail: "https://res.cloudinary.com/dcbdne09h/image/upload/v1779955710/Mern_api_and_authentication_zewtge.png",
    lessons: [
      { title: "Introduction to MERN Stack", content: "Overview of MongoDB, Express, React, Node.js", order: 1 },
      { title: "Setting Up the Project", content: "Install dependencies and configure the project", order: 2 },
      { title: "Building REST APIs", content: "Create RESTful endpoints with Express", order: 3 },
    ],
  });

  const course2 = await Course.create({
    title: "React JS Masterclass",
    description: "Master React JS with hooks, context API, React Router, and state management. Build modern, responsive web applications.",
    instructor: instructor._id,
    category: "Frontend",
    price: 39,
    isPublished: true,
    thumbnail: "https://res.cloudinary.com/dcbdne09h/image/upload/v1779955703/frontend_development_vf3t9v.png",
    lessons: [
      { title: "React Fundamentals", content: "Components, props, and state basics", order: 1 },
      { title: "React Hooks Deep Dive", content: "useState, useEffect, useContext and custom hooks", order: 2 },
    ],
  });

  const course3 = await Course.create({
    title: "Analytics Dashboard Design",
    description: "Learn to design and build professional analytics dashboards with charts, data visualization and real-time updates.",
    instructor: instructor._id,
    category: "Analytics",
    price: 29,
    isPublished: true,
    thumbnail: "https://res.cloudinary.com/dcbdne09h/image/upload/v1779955703/analyticsdashboarddesign_a9qhy7.png",
    lessons: [
      { title: "Dashboard Design Principles", content: "UI/UX best practices for dashboards", order: 1 },
    ],
  });
  console.log("Courses created:", course1.title, course2.title, course3.title);

  // Enroll students in courses
  await Enrollment.create({ student: student1._id, course: course1._id, progress: 60 });
  await Enrollment.create({ student: student1._id, course: course2._id, progress: 25 });
  await Enrollment.create({ student: student2._id, course: course1._id, progress: 100, isCompleted: true });
  await Enrollment.create({ student: student2._id, course: course3._id, progress: 40 });
  console.log("Enrollments created");

  console.log("\n✅ Seed complete!\n");
  console.log("─────────────────────────────────────");
  console.log("ADMIN       → admin@abdrax.com       / admin123");
  console.log("INSTRUCTOR  → instructor@abdrax.com  / instructor123");
  console.log("STUDENT 1   → student1@abdrax.com    / student123");
  console.log("STUDENT 2   → student2@abdrax.com    / student123");
  console.log("─────────────────────────────────────");
  process.exit();
}).catch(err => { console.error(err); process.exit(1); });
