# 📚 Abdrax Learner — Full Stack MERN Learning Management System

> **Course:** MERN Stack Web Development | **Assessment:** Final Project | **Marks:** 100
> **Author:** Muhammad Abdullah Siddique

---

## 🌐 Live Project

| Layer | URL |
|-------|-----|
| Frontend | `http://localhost:3000` |
| Backend API | `http://localhost:5000/api` |
| Database | MongoDB Atlas — `abdrax_lms` |

---

## 📌 What We Built

A complete, production-ready **Learning Management System** built on the MERN stack with:

- 🔐 JWT-based authentication with role validation
- 👥 Three role-based dashboards (Admin, Instructor, Student)
- 📚 Full course management with lessons
- 🎓 Student enrollment with progress tracking
- 📊 Admin analytics and user management
- 🎨 Modern dark UI with glassmorphism design
- 🔒 Protected routes with role-based access control

---

## 🏗️ Project Structure

```
LMS/
│
├── backend/                        # Node.js + Express API
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authcontroller.js       # Register, Login, GetMe
│   │   ├── coursecontroller.js     # Course CRUD + lessons
│   │   ├── enrollcontroller.js     # Enroll, MyCourses, Progress
│   │   └── usercontroller.js       # Users, Analytics, Status
│   ├── middleware/
│   │   ├── authmiddleware.js       # JWT protect middleware
│   │   ├── rolemiddleware.js       # Role-based authorize()
│   │   └── errormiddleware.js      # Global error handler
│   ├── models/
│   │   ├── user.js                 # User schema (bcrypt)
│   │   ├── course.js               # Course schema + lessons
│   │   └── enrollment.js           # Enrollment + progress
│   ├── routes/
│   │   ├── authroutes.js           # /api/auth
│   │   ├── courseroutes.js         # /api/courses
│   │   ├── userroutes.js           # /api/users
│   │   └── enrollroutes.js         # /api/enroll
│   ├── utils/
│   │   └── generatetoken.js        # JWT token generator
│   ├── seed.js                     # Database seeder
│   ├── .env                        # Environment variables
│   ├── .env.example                # Environment template
│   ├── package.json
│   └── server.js                   # Express app entry point
│
├── frontend/                       # React JS Application
│   ├── public/
│   │   ├── logo/
│   │   │   ├── logo.png            # Abdrax Learner logo
│   │   │   └── favicon.png         # Browser favicon
│   │   ├── testonomials/
│   │   │   ├── males.png
│   │   │   └── females.png
│   │   ├── index.html
│   │   └── manifest.json
│   │
│   └── src/
│       ├── components/
│       │   ├── Landing/
│       │   │   ├── PopularCourses.jsx   # Landing course cards
│       │   │   └── Footer.jsx           # Site footer
│       │   ├── AuthModal.jsx            # Login/Register popup
│       │   ├── ContactSection.jsx       # Contact form
│       │   ├── CourseCard.jsx           # Reusable course card
│       │   ├── DashboardPreview.jsx     # Landing mockup
│       │   ├── Features.jsx             # Features section
│       │   ├── Hero.jsx                 # Hero section
│       │   ├── HowItWorks.jsx           # Steps section
│       │   ├── InstructorSection.jsx    # Instructor showcase
│       │   ├── Navbar.jsx               # Adaptive navbar
│       │   ├── ProtectedRoute.jsx       # Role-based guard
│       │   ├── RoleExperience.jsx       # Role cards
│       │   ├── Statistics.jsx           # Stats section
│       │   └── Testimonials.jsx         # Reviews section
│       │
│       ├── context/
│       │   ├── AuthContext.js           # JWT auth state
│       │   └── ModalContext.js          # Login/Register modal state
│       │
│       ├── pages/
│       │   ├── AdminDashboard.jsx       # Admin panel
│       │   ├── InstructorDashboard.jsx  # Instructor panel
│       │   ├── StudentDashboard.jsx     # Student panel
│       │   ├── About.jsx                # About page
│       │   ├── Courses.jsx              # Course listing
│       │   ├── CourseDetail.jsx         # Course detail
│       │   ├── Home.jsx                 # Landing page
│       │   ├── Login.jsx                # Login redirect
│       │   └── Register.jsx             # Register redirect
│       │
│       ├── services/
│       │   └── api.js                   # Axios + JWT interceptor
│       │
│       ├── App.js                       # Routes + providers
│       ├── index.js                     # React entry point
│       └── index.css                    # Global styles
│
├── .gitignore
└── README.md
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js | JavaScript runtime |
| Express.js | REST API framework |
| MongoDB Atlas | NoSQL cloud database |
| Mongoose | ODM for MongoDB |
| JWT | Token-based authentication |
| Bcryptjs | Password hashing |
| Dotenv | Environment variables |
| Nodemon | Dev auto-restart |
| CORS | Cross-origin requests |

### Frontend
| Technology | Purpose |
|-----------|---------|
| React JS 18 | UI library |
| React Router v6 | Client-side routing |
| Axios | HTTP client with JWT interceptor |
| Bootstrap 5 | Responsive styling |
| Lucide React | Icon library |
| Context API | Global state management |

---

## 👥 User Roles

### 🛡 Admin
- View all users with role, status, join date
- Activate / Deactivate users
- Delete users
- View all courses — publish/unpublish/delete
- Analytics dashboard (users, courses, enrollments)
- Reports with role distribution charts

### 👨‍🏫 Instructor
- Create new courses with title, description, category, price
- Edit and delete own courses
- Publish / Unpublish courses
- Upload lessons to courses (title, content, video URL)
- View own course statistics

### 🎓 Student
- Browse all published courses
- Search courses by title or category
- Enroll in courses
- Track learning progress (25% / 50% / 75% / 100%)
- View enrolled courses with progress bars
- Profile page with enrollment stats

---

## 🔌 API Reference

### Authentication
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login + get JWT |
| GET | `/api/auth/me` | Private | Get current user |

### Courses
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/courses` | Public | Get all published courses |
| GET | `/api/courses/:id` | Public | Get course by ID |
| POST | `/api/courses` | Instructor | Create course |
| PUT | `/api/courses/:id` | Instructor/Admin | Update course |
| DELETE | `/api/courses/:id` | Instructor/Admin | Delete course |
| POST | `/api/courses/:id/lessons` | Instructor | Add lesson |
| GET | `/api/courses/instructor/my-courses` | Instructor | Own courses |

### Users (Admin only)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/users` | Admin | Get all users |
| GET | `/api/users/analytics` | Admin | Platform analytics |
| DELETE | `/api/users/:id` | Admin | Delete user |
| PUT | `/api/users/:id/status` | Admin | Toggle active status |
| PUT | `/api/users/profile` | Any | Update own profile |

### Enrollments
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/enroll` | Student | Enroll in course |
| GET | `/api/enroll/my-courses` | Student | Get enrolled courses |
| PUT | `/api/enroll/:id/progress` | Student | Update progress |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/MuhammadAbdullahSiddiqueasdfas/LMS_Project.git
cd LMS_Project
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Copy the environment template:
```bash
copy .env.example .env
```

Edit `.env` with your values:
```env
PORT=5000
MONGO_URI=mongodb+srv://your_user:your_pass@cluster0.xxxxx.mongodb.net/abdrax_lms
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Seed the database with demo data:
```bash
node seed.js
```

Start the backend:
```bash
npm start
```
Backend runs at: `http://localhost:5000`

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```
Frontend runs at: `http://localhost:3000`

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 🛡 Admin | `admin@abdrax.com` | `admin123` |
| 👨‍🏫 Instructor | `instructor@abdrax.com` | `instructor123` |
| 🎓 Student | `student1@abdrax.com` | `student123` |
| 🎓 Student | `student2@abdrax.com` | `student123` |

---

## 🗄️ Database Schema

### User
```js
{ name, email, password (hashed), role, isActive, timestamps }
```

### Course
```js
{ title, description, instructor (ref), category, price, thumbnail, lessons[], isPublished, timestamps }
```

### Enrollment
```js
{ student (ref), course (ref), progress (0-100), completedLessons[], isCompleted, timestamps }
```

---

## 📊 Marking Scheme

| Criteria | Marks |
|----------|-------|
| UI/UX Design | 15 |
| React Implementation | 15 |
| Backend API Development | 20 |
| Database Design | 15 |
| Authentication & Security | 15 |
| Role-Based Functionality | 10 |
| Code Quality & Structure | 5 |
| Deployment & Testing | 5 |
| **Total** | **100** |

---

## 🚀 Deployment

| Layer | Platform |
|-------|----------|
| Frontend | Vercel / Netlify |
| Backend | Render / Railway |
| Database | MongoDB Atlas |

---

## 👨‍💻 Author

**Muhammad Abdullah Siddique**
Hunarmand Punjab — MERN Stack Web Development

---

## 📜 License

This project is developed for educational purposes.
