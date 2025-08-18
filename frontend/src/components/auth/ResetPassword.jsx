import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm password";
    } else if (confirmPassword !== newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Password has been reset successfully!");
  };

  return (
    <div className="container-fluid vh-100 d-flex p-0">
      
      {/* Left Section */}
      <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white p-5" style={{ backgroundColor: "#7ca6ff" }}>
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
          <h3 className="fw-bold text-center mb-4">Reset Password</h3>
          <form onSubmit={handleReset}>
            <div className="mb-3">
              <label className="form-label">New Password:</label>
              <input
                type="password"
                className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {errors.newPassword && <div className="invalid-feedback">{errors.newPassword}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Confirm Password:</label>
              <input
                type="password"
                className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
            </div>

            <button type="submit" className="btn btn-success w-100">Reset</button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default ResetPassword;
