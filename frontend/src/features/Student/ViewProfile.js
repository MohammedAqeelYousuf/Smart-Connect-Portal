import React from "react";
import "../../styles/ViewProfile.css"; // Adjust path if your css is elsewhere

export default function ViewProfile() {
  return (
    <div className="profile-container">
       
      <div className="main">
        <h1 className="heading">Profile</h1>
        <hr className="hr" />

        <div className="profile-row">
          <img
            src="https://www.svgrepo.com/show/210944/avatar.svg"
            alt="Profile Avatar"
            className="avatar"
          />
          <div className="profile-columns">
            <div>
              <label className="label">Name</label>
              <input className="input" type="text" value="" readOnly />
            </div>
            <div>
              <label className="label">Student id</label>
              <input className="input" type="text" value="" readOnly />
            </div>
            <div>
              <label className="label">Email id</label>
              <input className="input" type="email" value="" readOnly />
            </div>
          </div>
          <div className="profile-columns">
            <div>
              <label className="label">Department</label>
              <input className="input" type="text" value="" readOnly />
            </div>
            <div>
              <label className="label">Batch</label>
              <input className="input" type="text" value="" readOnly />
            </div>
            <div>
              <label className="label">Semester</label>
              <input className="input" type="number" value="" readOnly />
            </div>
          </div>
        </div>

        <h2 className="subheading">Academic Profile</h2>
        <hr className="hr" />

        <div className="academic-row">
          <div>
            <label className="label">CGPA</label>
            <input className="input-short" type="text" value="" readOnly />
          </div>
          <div>
            <label className="label">Active Backlog</label>
            <input className="input-short" type="text" value="1" readOnly />
          </div>
        </div>
        <div className="academic-row">
          <label className="label">No. of Semesters</label>
          <input className="input-short" type="number" value="5" readOnly />
        </div>

        <table className="semester-table">
          <thead>
            <tr>
              <th>SEMESTER</th>
              <th>1</th>
              <th>2</th>
              <th>3</th>
              <th>4</th>
              <th>5</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SGPA</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <hr className="hr" />
        <h2 className="subheading">Account setting</h2>
        <div className="button-row">
          <button className="reset-btn" onClick={() => alert("Reset Password")}>Reset Password</button>
          <button className="edit-btn" onClick={() => alert("Edit Profile")}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
}
