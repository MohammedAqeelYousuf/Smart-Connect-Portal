import React, { useState, useEffect } from "react";
import "../../styles/AdminViewProfile.css";
import { useNavigate } from "react-router-dom";

import ProfileResetPassword from "./ProfileResetPassword";

export default function AdminViewProfile() {
  const [profile, setProfile] = useState({
    name: "",
    email: ""
  });
  const navigate =useNavigate();

  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);

  // Example admin user ID (replace with real auth context/user)
  const adminUserId = 1;

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`http://localhost:4000/user/${adminUserId}`);
        if (!response.ok) throw new Error("Failed to fetch profile data");
        const data = await response.json();

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

  // Show modal
  const handleResetPassword = () => {
    setShowResetPasswordModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowResetPasswordModal(false);
  };

  // Optional: Close alert for edit profile (can be updated to navigation)
  const handleEditProfile = () => {
    navigate("/admin/admin-edit-profile");
  };

  // Scroll lock and unlock with modal open/close
  useEffect(() => {
    if (showResetPasswordModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [showResetPasswordModal]);

  return (
    <>
      <div className={`profile-container ${showResetPasswordModal ? "blurred" : ""}`}>
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

      {/* Modal Overlay and Content */}
      {showResetPasswordModal && (
      <div className="modalOverlay">
        <ProfileResetPassword onClose={handleCloseModal} />
      </div>
    )}
    </>
  );
}
