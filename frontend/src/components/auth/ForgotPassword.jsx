
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Loginimage from "../../assets/login-image.png"; // replace with your image path
import "../../styles/Auth.css";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const validateEmail = () => {
    let newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCode = () => {
    let newErrors = {};
    if (!code.trim()) {
      newErrors.code = "Verification code is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!validateEmail()) return;
    await fetch("http://localhost:5000/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStep(2);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!validateCode()) return;
    const res = await fetch("http://localhost:5000/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });
    if (res.ok) {
      window.location.href = "/reset-password?email=" + email;
    } else {
      setErrors({ code: "Invalid verification code" });
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-left">
        <h2>Welcome to SmartCon!</h2>
        <img src={Loginimage} alt="SmartCon" className="img-fluid" />
        <p className="auth-footer">© 2025 SmartCon. All rights reserved.</p>
      </div>

      <div className="auth-right"style={
          isMobile
            ? { backgroundImage: `url(${Loginimage})`, backgroundSize: "cover", backgroundPosition: "center" }
            : {}
        }>
        <div className="auth-card">
          <h3 className="text-center mb-4">Forgot Password?</h3>

          {step === 1 ? (
            <form onSubmit={handleSendCode}>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <button type="submit" className="auth-btn w-100">
                Send Code
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode}>
              <div className="mb-3">
                <label>Verification Code</label>
                <input
                  type="text"
                  className={`form-control ${errors.code ? "is-invalid" : ""}`}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                {errors.code && (
                  <div className="invalid-feedback">{errors.code}</div>
                )}
              </div>
              <button type="submit" className="auth-btn w-100">
                Verify Code
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
