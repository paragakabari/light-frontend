import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./users.scss";
import { ApiGet } from "../../services/helpers/API/ApiData";
import AllCartModel from "./AllCartModel";

function AllCart() {
  const [data, setData] = useState([]);
  const [viewModel, setViewModel] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await ApiGet("carts/getAll");
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
      name: "Status",
      selector: (row) => (
        row.userId.status === "approved" ? (
          <p style={{ color: "green", textTransform: "uppercase", fontWeight: "700" }}>{row.userId.status}</p>
        ) : (
          <p style={{ color: "red", textTransform: "uppercase", fontWeight: "700" }}>{row.userId.status}</p>
        )
      ),
      sortable: false,
    },
    {
      name: "All Item",
      selector: (row) => row.items.length,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.userId.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.userId.email,
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.userId.role,
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
            title="All Cart"
            columns={columns}
            data={data}
            pagination
          />
          {viewModel && (
            <AllCartModel modalShowHandal={modalShowHandal} userData={userData} />
          )}
        </div>
      </div>
    </div>
  );
}

export default AllCart;
