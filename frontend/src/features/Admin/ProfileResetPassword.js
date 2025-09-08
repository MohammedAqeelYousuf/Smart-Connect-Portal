import React, { useState } from "react";
import "../../styles/CreateUser.css"; // Reuse existing styles for consistency

export default function ProfileResetPassword() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Regex for password validation (at least 8 chars, uppercase, lowercase, number, special char)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_])[A-Za-z\d@$!%*?&#^_]{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = (field) => {
    if (field === "current") setShowCurrentPassword((prev) => !prev);
    else if (field === "new") setShowNewPassword((prev) => !prev);
    else if (field === "confirm") setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve saved user password (simulating login state). For demo, assume first user in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.length === 0) {
      alert("No user data found. Please create an account first.");
      return;
    }
    const savedPassword = users[0].password; // Change logic as per your auth flow

    if (form.currentPassword !== savedPassword) {
      alert("Current password does not match.");
      return;
    }

    if (!passwordRegex.test(form.newPassword)) {
      alert(
        "New password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character."
      );
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    // Update password in localStorage (demo logic)
    users[0].password = form.newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    alert("Password successfully reset!");

    setForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setShowCurrentPassword(false);
    setShowNewPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <div className="create-user-modal" style={{ width: 450 }}>
      <h2 className="modal-title">Reset Password</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        {/* Current Password */}
        <div className="grid-item span-10" style={{ position: "relative" }}>
          <label className="modal-label">Current Password:</label>
          <input
            type={showCurrentPassword ? "text" : "password"}
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            required
            placeholder="Enter current password"
            style={{ paddingRight: "40px" }}
          />
          <button
            type="button"
            onClick={() => toggleShowPassword("current")}
            className="toggleShowPassBtn"
            aria-label={showCurrentPassword ? "Hide password" : "Show password"}
          >
            {showCurrentPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* New Password */}
        <div className="grid-item span-10" style={{ position: "relative" }}>
          <label className="modal-label">New Password:</label>
          <input
            type={showNewPassword ? "text" : "password"}
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            required
            placeholder="Enter new password"
            style={{ paddingRight: "40px" }}
          />
          <button
            type="button"
            onClick={() => toggleShowPassword("new")}
            className="toggleShowPassBtn"
            aria-label={showNewPassword ? "Hide password" : "Show password"}
          >
            {showNewPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Confirm New Password */}
        <div className="grid-item span-10" style={{ position: "relative" }}>
          <label className="modal-label">Confirm New Password:</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm new password"
            style={{ paddingRight: "40px" }}
          />
          <button
            type="button"
            onClick={() => toggleShowPassword("confirm")}
            className="toggleShowPassBtn"
            aria-label={
              showConfirmPassword ? "Hide password" : "Show password"
            }
          >
            {showConfirmPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" className="create-btn" style={{ marginTop: "24px" }}>
          Reset Password
        </button>
      </form>
    </div>
  );
}
