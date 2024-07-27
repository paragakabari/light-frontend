import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { Switch } from "@mui/material";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./users.scss"

function Users() {
  // Initialize state for switch values
  
  // Handle switch state change
  const handleSwitchChange = (id) => (event) => {
    setSwitchStates({
      ...switchStates,
      [id]: event.target.checked,
    });
  };
  
  // Define columns
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Director",
      selector: (row) => row.director,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <div>
          <Switch
            checked={switchStates[row.id] || false}
            onChange={handleSwitchChange(row.id)}
            inputProps={{ "aria-label": "Switch demo" }}
            />
        </div>
      ),
      sortable: false,
    },
  ];
  
  // Define data
  const data = [
    {
      id: 1,
      title: "The Shawshank Redemption",
      director: "Frank Darabont",
      year: "1994",
    },
    {
      id: 2,
      title: "The Godfather",
      director: "Francis Ford Coppola",
      year: "1972",
    },
    {
      id: 3,
      title: "The Dark Knight",
      director: "Christopher Nolan",
      year: "2008",
    },
  ];
  const [switchStates, setSwitchStates] = useState(
    data.reduce((acc, item) => {
      acc[item.id] = true; 
      return acc;
    }, {})
  );
  console.log(switchStates)
  
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
        </div>
      </div>
    </div>
  );
}

export default Users;
