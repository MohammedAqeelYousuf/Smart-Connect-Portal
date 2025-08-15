import { Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext"; // Make sure path is correct

import Landing from "./pages/Landing";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import ResetPassword from "./components/auth/ResetPassword";
import Student from "./pages/Student";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <AppProvider>
      <Routes>
        
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        
        <Route path="/student" element={<Student />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
}