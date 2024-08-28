import { useState, useEffect } from "react";
import "./productList.scss";
import AddProductModel from "./AddProductModel";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ProductDetailsModel from "./ProductDetailsModel";
import toast from "react-hot-toast";
import { ApiDelete, ApiGet } from "../../services/helpers/API/ApiData";

export default function ProductList() {
  const [addModel, setAddModel] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [viewModelData, setViewModelData] = useState({});
  const [products, setProducts] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    getProduct();
  }, []);

  const modalShowHandal = () => {
    setAddModel(false);
    setEdit(false);
    setViewModel(false);
    setEditData(null);
  };

  const handleEdit = (product) => {
    setEdit(true);
    setEditData(product);
    setAddModel(true);
  };

  const handleShow = (product) => {
    setViewModelData(product);
    setViewModel(true);
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
        ApiDelete(`products/delete/${id}`)
          .then((res) => {
            getProduct();
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          })
          .catch((err) => {
            toast.error(err);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your product is safe :)", "error");
      }
    });
  };

  const getProduct = () => {
    ApiGet("products/getAll")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const columns = [
    { name: "Product Name", selector: (row) => row.name, sortable: true },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "200px",
    },
    { name: "Price", selector: (row) => row.price, sortable: true },
    {
      name: "Dealer Price",
      selector: (row) => row.dealerPrice,
      sortable: true,
    },
    {
      name: "Manufacturer Name",
      selector: (row) => row.manufacturername,
      sortable: true,
    },
    {
      name: "Manufacturer Number",
      selector: (row) => row.manufacturernumber,
      sortable: true,
    },
    {
      name: "Manufacturer Address",
      selector: (row) => row.manufactureraddress,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <>
        {/* {console.log(row.category)} */}
          <button className="editBtn" onClick={() => handleEdit(row)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="deleteBtn" onClick={() => handleDelete(row.id)}>
            <i className="fa-solid fa-trash-can"></i>
          </button>
          <button className="viewBtn" onClick={() => handleShow(row)}>
            <i className="fa-solid fa-eye"></i>
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
            <h1>Product List</h1>
            <button
              className="product-add-btn"
              onClick={() => setAddModel(true)}
            >
              Add Product
            </button>
            {addModel && (
              <AddProductModel
                modalShowHandal={modalShowHandal}
                edit={edit}
                initialData={editData}
                getProductData={getProduct}
              />
            )}
            {viewModel && (
              <ProductDetailsModel
                modalShowHandal={modalShowHandal}
                data={viewModelData}
              />
            )}
          </div>
        </div>
        <div className="product-table">
          <DataTable title="" columns={columns} data={products} pagination  />
        </div>
      </div>
    </>
  );
}
