import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./adminContect.scss"
import { ApiGet } from "../../services/helpers/API/ApiData";

function AdminContact() {
  // const [toggleState, setToggleState] = useState({});
  const [data,setData]=useState()

  // const handleToggle = (id, value) => {
  //   setToggleState((prevState) => ({
  //     ...prevState,
  //     [id]: value,
  //   }));
  // };

  useEffect(() => {
    getContectList()
  }, [])
  
  const getContectList = ()=>{
    ApiGet("contact/get")
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        // toast.error("Error fetching products!");
      });
  }

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
      name: "Subject",
      selector: (row) => row.subject,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
    }
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
