import React, { useState } from "react";
import "../../styles/CreateUser.css";

export default function AdminCreateUser() {
  const [form, setForm] = useState({
    fullName: "",
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

  // Email validation regex
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password constraints validation regex:
  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_])[A-Za-z\d@$!%*?&#^_]{8,}$/;
    return passwordRegex.test(password);
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleCreate = async (e) => {
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

    const nameParts = form.fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    const newUser = {
      firstName,
      middleName: "", // can be extended in UI
      lastName,
      email: form.email,
      password: form.password,
      class: "idofClass", // replace with actual selected class ID or value
      department: "idOfDepartment", // replace with actual department ID or value
      batch: "2025", // adjust or get via UI
      placementStatus: "Not Placed",
      placementCompanies: [],
      noOfSem: 0,
      semCGPA: []
    };

    try {
      const response = await fetch("http://localhost:4000/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (!response.ok) throw new Error("Failed to create user");

      alert("Admin user created!");
      setForm({ fullName: "", email: "", password: "" });
      setShowPassword(false);
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="create-user-modal" style={{ width: 400 }}>
      <h2 className="modal-title">Admin Create User</h2>
      <form
        onSubmit={handleCreate}
        className="form-grid"
        style={{ gridTemplateColumns: "repeat(10, 1fr)", gap: "16px" }}
      >
        <div className="grid-item span-10">
          <label className="modal-label">Full Name:</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            placeholder="Letters and spaces only"
          />
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
        <button
          type="submit"
          className="create-btn"
          style={{ gridColumn: "span 10", marginTop: "30px" }}
        >
          Create
        </button>
      </form>
    </div>
  );
}
