import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./users.scss";
import { ApiGet } from "../../services/helpers/API/ApiData";
import UserModel from "./UserModel";
import AccessModel from "./AccessModel";

function Users() {
  const [data, setData] = useState([]);
  const [viewModel, setViewModel] = useState(false);
  const [successModel, setSuccessModel] = useState(false);
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await ApiGet("users/get");
      setData(res.data);

    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleShow = (user) => {
    setViewModel(true);
    setUserData(user);
  };

  const handleShowAccess = (user) => {
    setSuccessModel(true);
    setUserData(user);
  };

  const modalShowHandal = () => {
    setViewModel(false);
    getUsers();
  };

  const modalAccessShowHandal = () => {
    setSuccessModel(false);
    getUsers();
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => {
        if (row.status === "approved") {
          return (
            <p style={{ color: "green", textTransform: "uppercase", fontWeight: "700" }}>
              {row.status}
            </p>
          );
        } else if (row.status === "rejected") {
          return (
            <p style={{ color: "red", textTransform: "uppercase", fontWeight: "700" }}>
              {row.status}
            </p>
          );
        } else {
          return (
            <p style={{ color: "#1b3c5d", textTransform: "uppercase", fontWeight: "700" }}>
              {row.status}
            </p>
          );
        }
      },
      sortable: false,
    },
    {
      name: "Details",
      cell: (row) => (
        <>
        <button className="viewBtn" onClick={() => handleShow(row)}>
          <i className="fa-solid fa-eye"></i>
        </button>
        <button className="viewBtn" onClick={() => handleShowAccess(row)}>
          <i className="fa-solid fa-home"></i>
        </button>
        </>
        
      ),
      sortable: false,
    },
  ];
  return (
    <div className="user-outer">
      <div className="admin-dashboard-content">
        <div className="product-table">
          <DataTable
            title="User List"
            columns={columns}
            data={data}
            pagination
          />
          {viewModel && (
            <UserModel modalShowHandal={modalShowHandal} userData={userData} />
          )}
          {
            successModel && (
              <AccessModel modalAccessShowHandal={modalAccessShowHandal} userData={userData} />
            )}
             
            
            
          
        </div>
      </div>
    </div>
  );
}

export default Users;
