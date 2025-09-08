import React, { useState, useEffect } from "react";
import "../../styles/AdminViewProfile.css";

export default function AdminViewProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: ""
  });

  // Replace with real admin user ID or get from authentication context
  const adminUserId = 1;

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`http://localhost:4000/user/${adminUserId}`);
        if (!response.ok) throw new Error("Failed to fetch profile data");
        const data = await response.json();

        // Assuming data has firstName, lastName, and email
        setProfile({
          name: data.firstName + (data.lastName ? " " + data.lastName : ""),
          email: data.email
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    fetchProfile();
  }, [adminUserId]);

  const handleEditProfile = () => {
    alert("Edit Profile Clicked");
  };

  const handleResetPassword = () => {
    alert("Reset Password Clicked");
  };

  return (
    <div className="profile-container">
      <div className="layout">
        <div className="main">
          <h1 className="heading">Profile</h1>
          <hr className="hr" />
          <div className="profileRow">
            <img
              src="https://www.svgrepo.com/show/210944/avatar.svg"
              alt="Profile Avatar"
              className="avatar"
            />
            <div>
              <div className="inputRow">
                <label className="label">Name</label>
                <input
                  name="name"
                  value={profile.name}
                  type="text"
                  readOnly
                  className="input"
                />
              </div>
              <div className="inputRow">
                <label className="label">Email id</label>
                <input
                  name="email"
                  value={profile.email}
                  type="email"
                  readOnly
                  className="input"
                />
              </div>
            </div>
          </div>
          <hr className="hr2" />
          <h2 className="subheading">Account setting</h2>
          <div className="buttonRow">
            <button onClick={handleResetPassword} className="resetBtn">
              Reset Password
            </button>
            <button onClick={handleEditProfile} className="editBtn">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
