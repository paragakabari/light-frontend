import React, { useState } from "react";
import "./userModel.scss";
import { ApiPut } from "../../services/helpers/API/ApiData";
import toast from "react-hot-toast";

function UserModel({ userData, modalShowHandal }) {
  const [status, setStatus] = useState(userData.status);
  
  const updateStatus = (data, newStatus) => {
    ApiPut("users/update-status/" + data.id, { status: newStatus })
      .then((res) => {
        setStatus(newStatus);
        toast.success(`${data.role} ${newStatus} !`);
      })
      .catch((err) => {
        toast.error(`Error: ${err} !`);
      });
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={modalShowHandal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2>User Detail</h2>
        <div className="main-content">
          <table className="user-details-table">
            <tbody>
              <tr>
                <th>Name:</th>
                <td>{userData.name}</td>
              </tr>
              <tr>
                <th>Email:</th>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <th>Role:</th>
                <td>{userData.role}</td>
              </tr>
              <tr>
                <th>Status:</th>
                <td className="status">
                  <span
                    style={{
                      fontWeight: "700",
                      textTransform: "capitalize",
                      color: status === "approved" ? "green" : "red",
                    }}
                  >
                    {status}
                  </span>
                  <div className="btn-outer">
                    {status === "pending" && (
                      <>
                        <button
                          className="approve"
                          onClick={() => updateStatus(userData, "approved")}
                        >
                          APPROVE
                        </button>
                      </>
                    )}
                    {status !== "rejected" && (
                      <button
                        className="reject"
                        onClick={() => updateStatus(userData, "rejected")}
                      >
                        REJECT
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              {userData.documentUrl && (
                <tr>
                  <th>Document:</th>
                  <td>
                    <img
                      src={`${userData.documentUrl}`}
                      alt="Document"
                      className="document-img"
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserModel;
