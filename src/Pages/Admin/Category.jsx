import { useState, useEffect } from "react";
import "./productList.scss";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { ApiDelete, ApiGet } from "../../services/helpers/API/ApiData";
import CategoryModel from "./CategoryModel";

export default function Category() {
  const [addModel, setAddModel] = useState(false);
  const [category, setCategory] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    getCategory();
  }, []);

  const modalShowHandal = () => {
    setAddModel(false);
    setEdit(false);
    setEditData(null);
  };

  const handleEdit = (category) => {
    setEdit(true);
    setEditData(category);
    setAddModel(true);
  };


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        ApiDelete(`categories/delete/${id}`)
          .then((res) => {
            getCategory();
            Swal.fire("Deleted!", "Your category has been deleted.", "success");
          })
          .catch((err) => {
            toast.error(err);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your category is safe :)", "error");
      }
    });
  };

  const getCategory = () => {
    ApiGet("categories/getAll")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const columns = [
    { name: "Category Name", selector: (row) => row.name, sortable: true },
    {
      name: "Action",
      cell: (row) => (
        <>
          <button className="editBtn" onClick={() => handleEdit(row)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="deleteBtn" onClick={() => handleDelete(row.id)}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
        </>
      ),
      sortable: false,
    },
  ];

  return (
    <>
      <div className="product-outer">
        <div className="admin-dashboard-content">
          <div className="title">
            <h1>Category List</h1>
            <button
              className="product-add-btn"
              onClick={() => setAddModel(true)}
            >
              Add Category
            </button>
            {addModel && (
              <CategoryModel
                modalShowHandal={modalShowHandal}
                edit={edit}
                initialData={editData}
                getCategoryData={getCategory}
              />
            )}
          </div>
        </div>
        <div className="product-table">
          <DataTable title="" columns={columns} data={category} pagination  />
        </div>
      </div>
    </>
  );
}
