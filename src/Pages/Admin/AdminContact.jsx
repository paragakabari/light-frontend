import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { ToggleButton } from "primereact/togglebutton";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./adminContect.scss"

function AdminContact() {
  const [toggleState, setToggleState] = useState({});

  const handleToggle = (id, value) => {
    setToggleState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const columns = [
    
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    }
  ];

  const data = [
    {
      id: 1,
      email: "The Shawshank Redemption",
      description: "Frank Darabont",
      name: "1994",
    },
    {
      id: 2,
      email: "The Godfather",
      description: "Francis Ford Coppola",
      name: "1972",
    },
    {
      id: 3,
      email: "The Dark Knight",
      description: "Christopher Nolan",
      name: "2008",
    },
  ];

  return (
    <div className="contect-outer">
      <div className="admin-dashboard-content">
        <div className="product-table">
          <DataTable
            title="Contact List"
            columns={columns}
            data={data}
            pagination
          />
        </div>
      </div>
    </div>
  );
}

export default AdminContact;
