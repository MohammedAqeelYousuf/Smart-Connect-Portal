import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AppContext from "../../context/AppContext";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError("");

    const newErrors = {};
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email) newErrors.email = "Email is required.";
    else if (!emailPattern.test(email)) newErrors.email = "Invalid email format.";
    if (!password) newErrors.password = "Password is required.";
    if (!role) newErrors.role = "Please select a role.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5500/users");
      if (!response.ok) throw new Error("Network response not OK");

      const users = await response.json();

      const user = users.find(
        (u) =>
          u.email?.trim().toLowerCase() === email.trim().toLowerCase() &&
          u.password === password &&
          u.role?.trim().toLowerCase() === role.trim().toLowerCase()
      );

      if (!user) {
        setGeneralError("Invalid email, password, or role.");
        return;
      }

      const userData = {
        id: user.id,
        name: user.firstName + (user.lastName ? " " + user.lastName : ""),
        email: user.email,
        role: user.role,
      };
      localStorage.setItem("currentUser", JSON.stringify(userData));
      setCurrentUser(userData);

      if (user.role.toLowerCase() === "staff") navigate("/admin");
      else if (user.role.toLowerCase() === "student") navigate("/student");
    } catch (error) {
      console.error("Login error:", error);
      setGeneralError("Server error. Please try again.");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0">
      
      {/* Left Section */}
      <div
        className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white p-5"
        style={{ backgroundColor: "#7ca6ff" }}
      >
        <h2 className="fw-bold">Welcome to SmartCon!</h2>
        <p className="mt-3 text-center" style={{ maxWidth: "400px" }}>
          Your digital gateway to stay updated with all campus happenings, announcements, and more!
          <br /><small>Stay connected, stay informed — all in one place!</small>
        </p>
        <p className="mt-5 mb-0">&copy; 2025 SmartCon. All rights reserved.</p>
      </div>

      {/* Right Section */}
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5 bg-white">
        <div style={{ maxWidth: "350px", width: "100%" }}>
          <h3 className="fw-bold text-center mb-4">Login</h3>
          {generalError && <div className="alert alert-danger">{generalError}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter your registered email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                placeholder="Enter your password"
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Role:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={`form-control ${errors.role ? "is-invalid" : ""}`}
              >
                <option value="">Select role</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
              </select>
              {errors.role && <div className="invalid-feedback">{errors.role}</div>}
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-success w-100">Login</button>
            </div>

            <div className="text-center">
              <Link to="/forgot-password" className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
