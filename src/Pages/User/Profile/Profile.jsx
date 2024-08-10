import React from "react";
import "./profile.scss";

function Profile() {
  return (
    <>
      <div className="main-content">
          <h1>Profile</h1>
        <table className="user-details-table">
          <tbody>
            <tr>
              <th>Name:</th>
              <td>{localStorage.getItem("name")}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{localStorage.getItem("email")}</td>
            </tr>
            <tr>
              <th>Role:</th>
              <td>{localStorage.getItem("role")}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Profile;
