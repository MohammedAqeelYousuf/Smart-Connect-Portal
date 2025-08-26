import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext"; // Make sure path is correct

import Landing from "./pages/Landing";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Student from "./pages/Student";
import Admin from "./pages/Admin";
import StudentAnnouncement from "./features/Student/StudentAnnouncement";
import FeedbackForm from "./features/Student/FeedbackForm";
import AdminDashboard from "./features/Admin/Dashboard";
import Announcements from "./features/Admin/Annoucment";
import ExamSchedule from "./features/Admin/ExamSchedule";
import Placement from "./features/Admin/Placement";
import CompanyDetails from "./features/common/CompanyDetails";
import Navbar from "./components/Navbar";
import "./App.css";
import StudentPlacement from "./features/Student/StudentPlacement";
import ViewBatch from "./features/Admin/ViewBatch";

export default function App() {
  return (
    <>
    <Navbar />
    <AppProvider>
      <Routes>
        
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        
        <Route path="student/" element={<Student />}>
          {/* <Route path="" element={} /> */}
          <Route path="announcement/" element={<StudentAnnouncement />} />
          <Route path="feedback/" element={<FeedbackForm />} />
          <Route path="examschedule/" element={<ExamSchedule role={"student"} />} />
          <Route path="placement/" element={<StudentPlacement />} />
          <Route path="company/:id" element={<CompanyDetails />} />
        </Route>
        <Route path="admin/" element={<Admin />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="announcement/" element={<Announcements />} />
          <Route path="examschedule/" element={<ExamSchedule role={"admin"} />} />
          <Route path="placement/" element={<Placement />} />
          <Route path="company/:id" element={<CompanyDetails />} />
          <Route path="batch/:id" element={<ViewBatch />} />
        </Route>

        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </AppProvider>
    </>
  );
}