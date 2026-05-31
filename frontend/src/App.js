import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { ModalProvider, useModal } from "./context/ModalContext";
import Navbar from "./components/Navbar";
import AuthModal from "./components/AuthModal";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import StudentDashboard from "./pages/StudentDashboard";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function ModalRedirect({ mode }) {
  const { openLogin, openRegister } = useModal();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
    if (mode === "login") openLogin();
    else openRegister();
  }, []);

  return null;
}

function AppContent() {
  const { modal, closeModal, switchModal } = useModal();

  return (
    <>
      <Navbar />
      {modal && <AuthModal mode={modal} onClose={closeModal} onSwitch={switchModal} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetail />} />

        <Route path="/login" element={<ModalRedirect mode="login" />} />
        <Route path="/register" element={<ModalRedirect mode="register" />} />

        <Route path="/student/dashboard" element={
          <ProtectedRoute allowedRoles={["student"]}><StudentDashboard /></ProtectedRoute>
        } />
        <Route path="/instructor/dashboard" element={
          <ProtectedRoute allowedRoles={["instructor"]}><InstructorDashboard /></ProtectedRoute>
        } />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <ModalProvider>
          <AppContent />
        </ModalProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
