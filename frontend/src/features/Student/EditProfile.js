import React, { useState, useEffect } from "react";
import "../../styles/ViewProfile.css";

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

export default function EditProfile() {
  const [profile, setProfile] = useState({
    name: "",
    studentId: "",
    email: "",
    department: "CSE",
    batch: "2021",
    semester: 5,
    cgpa: "",
    activeBacklog: "",
    numSemesters: 5,
    sgpa: Array(5).fill(""),
    avatarUrl: "https://www.svgrepo.com/show/210944/avatar.svg",
    avatarFile: null
  });

  // Handle input changes with validation: name no numbers, others normal, semester sync
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedProfile = { ...profile };

    // Name should not contain numbers or special chars
    if (name === "name") {
      if (/[^a-zA-Z\s]/.test(value)) {
        return; // ignore invalid input
      }
      updatedProfile[name] = value;
    }
    // Semester and numSemesters sync and adjust sgpa array
    else if (name === "semester" || name === "numSemesters") {
      updatedProfile.semester = value;
      updatedProfile.numSemesters = value;

      const semCount = Number(value) || 0;
      const currentSgpa = profile.sgpa.slice(0, semCount);
      while (currentSgpa.length < semCount) currentSgpa.push("");
      updatedProfile.sgpa = currentSgpa;
    } else {
      updatedProfile[name] = value;
    }

    setProfile(updatedProfile);
  };

  // Handle SGPA input change with only numbers and decimal allowed
const handleSgpaChange = (index, value) => {
  // Allow only numbers and optional decimal with max 2 digits
  // Also, allow empty string to clear input
  if (value === "" || /^(\d+\.?\d{0,2})?$/.test(value)) {
    // Check numeric value <= 10
    if (value === "" || parseFloat(value) <= 10) {
      const updatedSgpa = [...profile.sgpa];
      updatedSgpa[index] = value;
      setProfile((prev) => ({
        ...prev,
        sgpa: updatedSgpa
      }));
    }
  }
};


  // Calculate CGPA from SGPA values
  useEffect(() => {
    const sgpaNumbers = profile.sgpa
      .map((s) => parseFloat(s))
      .filter((num) => !isNaN(num) && num >= 0 && num <= 10);
    const avg =
      sgpaNumbers.length > 0
        ? (sgpaNumbers.reduce((acc, val) => acc + val, 0) / sgpaNumbers.length).toFixed(2)
        : "";
    if (avg !== profile.cgpa) {
      setProfile((prev) => ({ ...prev, cgpa: avg }));
    }
  }, [profile.sgpa]);

  // Handle avatar file input and preview the image
 const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({
      ...prev,
      avatarUrl: imageUrl,
      avatarFile: file
    }));
  }
};


  // On submit validate email, save to localStorage and alert user
  const handleSubmit = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Save profile data (include avatar) to localStorage 
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("Profile updated and saved!");
  };

  return (
    <form className="profile-container" onSubmit={handleSubmit}>
      <div className="main">
        <h1 className="heading">Edit Profile</h1>
        <hr className="hr" />

        <div className="profile-row">
          <div>
            <img
                src={profile.avatarUrl}
                alt="Profile Avatar"
                className="avatar"
                style={{ cursor: "pointer" }}
                onClick={() => document.getElementById("avatarInput").click()}

              />

              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />

          </div>

          <div className="profile-columns">
            <div>
              <label className="label">Name</label>
              <input
                className="input"
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter full name"
                readOnly
              />
            </div>
            <div>
              <label className="label">Student id</label>
              <input
                className="input"
                type="text"
                name="studentId"
                value={profile.studentId}
                onChange={handleChange}
                placeholder="Enter student ID"
                readOnly
              />
            </div>
            <div>
              <label className="label">Email id</label>
              <input
                className="input"
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter email address"
                readOnly
              />
            </div>
          </div>
          <div className="profile-columns">
            <div className="form-group">
              <label className="label">Department</label>
              <select
                className="input"
                name="department"
                value={profile.department}
                onChange={handleChange}
                readOnly
              >
               
                <option value="" disabled>
                  Select department
                </option>
                {engineeringDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="label">Batch</label>
              <select
                className="input"
                name="batch"
                value={profile.batch}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select batch
                </option>
                {batchOptions.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Semester</label>
              <input
                className="input"
                type="number"
                min="1"
                name="semester"
                value={profile.semester}
                onChange={handleChange}
                placeholder="Current semester number"
              />
            </div>
          </div>
        </div>

        <h2 className="subheading">Academic Profile</h2>
        <hr className="hr" />
        <div className="academic-row">
          <div>
            <label className="label">CGPA (calculated)</label>
            <input
              className="input-short"
              type="text"
              name="cgpa"
              value={profile.cgpa}
              readOnly
              placeholder="7.50"
            />
          </div>
          <div>
            <label className="label">Active Backlog</label>
            <input
              className="input-short"
              type="text"
              name="activeBacklog"
              value={profile.activeBacklog}
              onChange={handleChange}
              placeholder="0"
            />
          </div>
        </div>
        <div className="academic-row">
          <label className="label">No. of Semesters</label>
          <input
            className="input-short"
            type="number"
            min="1"
            name="numSemesters"
            value={profile.numSemesters}
            onChange={handleChange}
            placeholder="Total number of semesters"
          />
        </div>

        <table className="semester-table">
          <thead>
            <tr>
              <th>SEMESTER</th>
              {[...Array(Number(profile.numSemesters) || 0)].map((_, i) => (
                <th key={i}>{i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SGPA</td>
              {profile.sgpa.map((sgpaVal, i) => (
                <td key={i}>
                  <input
                    className="input-short"
                    type="text"
                    value={sgpaVal}
                    onChange={(e) => handleSgpaChange(i, e.target.value)}
                    placeholder={`S${i + 1} GPA`}
                    maxLength={4}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <hr className="hr" />
        <h2 className="subheading">Account Setting</h2>
        <div className="button-row">
          <button className="reset-btn" type="button" onClick={() => alert("Reset Password")}>
            Reset Password
          </button>
          <button className="edit-btn" type="submit">
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}
