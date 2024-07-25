import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { ToggleButton } from "primereact/togglebutton";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Users() {
  const [toggleState, setToggleState] = useState({});

  const handleToggle = (id, value) => {
    setToggleState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

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
        <div className="card flex justify-content-center">
          <ToggleButton
            onIcon="pi pi-check"
            offIcon="pi pi-times"
            checked={toggleState[row.id] || false}
            onChange={(e) => handleToggle(row.id, e.value)}
            className={`w-8rem ${toggleState[row.id] ? 'btn-checked' : 'btn-unchecked'}`}
          />
        </div>
      ),
      sortable: false,
    },
  ];

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

  return (
    <div className="container">
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
