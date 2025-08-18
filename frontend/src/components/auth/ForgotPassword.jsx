import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!code.trim()) {
      newErrors.code = "Code is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Password reset code verified!");
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
          <h3 className="fw-bold text-center mb-4">Forgot Password?</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Code:</label>
              <input
                type="text"
                className={`form-control ${errors.code ? "is-invalid" : ""}`}
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              {errors.code && <div className="invalid-feedback">{errors.code}</div>}
            </div>

            <button type="submit" className="btn btn-success w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
