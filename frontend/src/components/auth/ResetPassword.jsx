
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/Auth.css";
import Loginimage from "../../assets/login-image.png"; 

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const email = new URLSearchParams(window.location.search).get("email");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const validate = () => {
    let newErrors = {};
    if (!password.trim()) {
      newErrors.password = "New password is required";
    }
    if (!confirm.trim()) {
      newErrors.confirm = "Please confirm password";
    } else if (confirm !== password) {
      newErrors.confirm = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const handleReset = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await fetch("http://localhost:5000/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert("Password reset successful!");
      window.location.href = "/login";
    } else {
      alert("Failed to reset password. Try again.");
    }
  };

  return (
    <div className="auth-container">
    
      <div className="auth-left">
        <h2>Welcome to SmartCon!</h2>
        <img src={Loginimage} alt="Reset" className="img-fluid" />
        <p className="auth-footer">© 2025 SmartCon. All rights reserved.</p>
      </div>

     
      <div className="auth-right" style={
          isMobile
            ? { backgroundImage: `url(${Loginimage})`, backgroundSize: "cover", backgroundPosition: "center" }
            : {}
        }>
        <div className="auth-card">
          <h3 className="text-center mb-4">Reset Password</h3>
          <form onSubmit={handleReset}>
            <div className="mb-3">
              <label>New Password</label>
              <input
                type="password"
                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className={`form-control ${errors.confirm ? "is-invalid" : ""}`}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              {errors.confirm && (
                <div className="invalid-feedback">{errors.confirm}</div>
              )}
            </div>

            <button type="submit" className="auth-btn w-100">
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
