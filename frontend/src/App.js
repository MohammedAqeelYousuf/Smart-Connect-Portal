import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider } from "./context/AppContext";


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
import StudentDashboard from "./features/Student/StudentDashboard";
import AddCompanyDetails from "./features/Admin/AddCompanyDetails";
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateCompanyDetails from "./features/Admin/UpdateCompanyDetails";
import ViewProfile from "./features/Student/ViewProfile";
import AdminCreateUser from "./features/Admin/AdminCreate";
import AdminEditProfile from "./features/Admin/AdminEditProfile";
import AdminViewProfile from "./features/Admin/AdminViewProfile";
import CreateUser from "./features/Admin/CreateUser";
import EditProfile from "./features/Student/EditProfile";
import ProfileResetPassword from "./features/Admin/ProfileResetPassword";


export default function App() {
  const location = useLocation();

 
  const hideNavbarRoutes = ["/", "/login", "/forgot-password", "/reset-password"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="student/" element={<Student />}>
          <Route path="" element={<StudentDashboard/>} />
          <Route path="profile/" element={<ViewProfile/>} />
          <Route path="edit-profile/" element={<EditProfile/>} />
          <Route path="announcement/" element={<StudentAnnouncement />} />
          <Route path="feedback/" element={<FeedbackForm />} />
          <Route path="examschedule/" element={<ExamSchedule role={"student"} />} />
          <Route path="placement/" element={<StudentPlacement />} />
          <Route path="company/:id" element={<CompanyDetails />} />
        </Route>

        <Route path="admin/" element={<Admin />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="admin-create-profile/" element={<AdminCreateUser />} />
          <Route path="admin-edit-profile/" element={<AdminEditProfile/>} />
          <Route path="admin-view-profile/" element={<AdminViewProfile/>} />
          <Route path="user-create-profile/" element={<CreateUser/>} />
          <Route path="reset-password/" element={<ProfileResetPassword/>} />
          <Route path="announcement/" element={<Announcements />} />
          <Route path="examschedule/" element={<ExamSchedule role={"admin"} />} />
          <Route path="placement/" element={<Placement />} />
          <Route path="company/view/:id" element={<CompanyDetails />} />
          <Route path="company/add" element={<AddCompanyDetails />} />
          <Route path="company/edit/:id" element={<UpdateCompanyDetails />} />
          <Route path="batch/view/:id" element={<ViewBatch />} />
        </Route>

         <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </>
  );
}
