import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./users.scss";
import { ApiGet } from "../../services/helpers/API/ApiData";
import UserModel from "./UserModel";

function Users() {
  const [data, setData] = useState([]);
  const [viewModel, setViewModel] = useState(false);
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

  const modalShowHandal = () => {
    setViewModel(false);
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
      name: "Details",
      cell: (row) => (
        <button className="viewBtn" onClick={() => handleShow(row)}>
          <i className="fa-solid fa-eye"></i>
        </button>
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
        </div>
      </div>
    </div>
  );
}

export default Users;
