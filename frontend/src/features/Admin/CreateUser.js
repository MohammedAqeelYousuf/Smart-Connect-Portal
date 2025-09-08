import React, { useState } from "react";
import "../../styles/CreateUser.css";

const engineeringDepartments = [
  "CSE",
  "ECE",
  "Mechanical",
  "Civil",
  "Electrical",
  "Chemical",
  "Aero",
  "IT",
  "Biomedical",
  "Environmental"
];

const batchOptions = [
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025"
];

export default function CreateUser() {
  const [form, setForm] = useState({
    id: "",
    fullName: "",
    department: "",
    customDepartment: "",
    year: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only letters and spaces in fullName
    if (name === "fullName") {
      if (/[^a-zA-Z\s]/.test(value)) return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Validate email format
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password constraints:
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_])[A-Za-z\d@$!%*?&#^_]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleClose = () => {
    window.location.href = "/";
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!isValidPassword(form.password)) {
      alert(
        "Password must be at least 8 characters, include uppercase & lowercase letters, a number, and a special character."
      );
      return;
    }

    if (form.department === "Other" && form.customDepartment.trim() === "") {
      alert("Please enter a custom department name");
      return;
    }

    const finalDepartment =
      form.department === "Other" ? form.customDepartment.trim() : form.department;

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]");
    existingUsers.push({ ...form, department: finalDepartment });
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Student account created!");

    setForm({
      id: "",
      fullName: "",
      department: "",
      customDepartment: "",
      year: "",
      email: "",
      password: ""
    });
    setShowPassword(false);
  };

  return (
    <div className="create-user-modal">
      <button onClick={handleClose} className="close-btn" title="Close">
        &times;
      </button>
      <h2 className="modal-title">Create Student Account</h2>
      <form onSubmit={handleCreate} className="form-grid">
        <div className="grid-item span-2">
          <label className="modal-label">ID :</label>
          <input name="id" value={form.id} onChange={handleChange} required />
        </div>
        <div className="grid-item span-8">
          <label className="modal-label">Full Name:</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            placeholder="Letters and spaces only"
          />
        </div>
        <div className="grid-item span-6">
          <label className="modal-label">Department:</label>
          <select
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select department
            </option>
            {engineeringDepartments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
          {form.department === "Other" && (
            <input
              type="text"
              name="customDepartment"
              value={form.customDepartment}
              onChange={handleChange}
              placeholder="Enter custom department"
              required
              style={{ marginTop: "8px" }}
            />
          )}
        </div>
        <div className="grid-item span-4">
          <label className="modal-label">Year:</label>
          <select
            name="year"
            value={form.year}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select year
            </option>
            {batchOptions.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="grid-item span-10">
          <label className="modal-label">Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="example@example.com"
          />
        </div>
        <div className="grid-item span-10" style={{ position: "relative" }}>
          <label className="modal-label">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            style={{ paddingRight: "40px" }}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="toggleShowPassBtn"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button type="submit" className="create-btn">
          Create
        </button>
      </form>
    </div>
  );
}
