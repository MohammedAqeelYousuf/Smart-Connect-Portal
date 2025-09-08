import React, { useState } from "react";
import "../../styles/AdminViewProfile.css";

export default function AdminEditProfile() {
  // Initial profile values - for demo, same as view
 
  //Initialize editProfile state including avatar fields
const savedAdminProfile = JSON.parse(localStorage.getItem("adminProfile") || "{}");
const [profile, setProfile] = useState({
  name: savedAdminProfile.name || "",
  email: savedAdminProfile.email || "",
  avatarUrl: savedAdminProfile.avatarUrl || "https://www.svgrepo.com/show/210944/avatar.svg",
  avatarFile: null,
});
const [editProfile, setEditProfile] = useState({ ...profile });


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Optional validation: allow only letters and spaces for name
    if (name === "name" && /[^a-zA-Z\s]/.test(value)) return;

    setEditProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Validate email for demo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editProfile.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    setProfile(editProfile);
    localStorage.setItem("adminProfile", JSON.stringify(editProfile));
  
    alert("Profile updated!");
  };

  const handleCancel = () => {
    setEditProfile({ ...profile }); // revert changes
  };

  // Handle avatar file input and preview the image
const handleAvatarChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setProfile((prev) => ({
      ...prev,
      avatarUrl: imageUrl,
      avatarFile: file,
    }));
  }
};






  return (
    <div className="profile-container">
      {/* Top Navigation Bar */}
      
        {/* Main Content */}
        <div className="main">
          <h1 className="heading">Edit Profile</h1>
          <hr className="hr" />
          <div className="profileRow">
            <div>
                <img
                    src={editProfile.avatarUrl || "https://www.svgrepo.com/show/210944/avatar.svg"}
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
            <div>
              <div className="inputRow">
                <label className="label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={editProfile.name}
                  type="text"
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter full name"
                />
              </div>
              <div className="inputRow">
                <label className="label" htmlFor="email">
                  Email id
                </label>
                <input
                  id="email"
                  name="email"
                  value={editProfile.email}
                  type="email"
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>
          <hr className="hr2" />
          <h2 className="subheading">Account setting</h2>
          <div className="buttonRow">
            <button onClick={handleCancel} className="resetBtn" type="button">
              Cancel
            </button>
            <button onClick={handleSave} className="editBtn" type="button">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    
  );
}
