import { useState, useEffect } from "react";
import "./productList.scss";
import AddProductModel from "./AddProductModel";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ProductDetailsModel from "./ProductDetailsModel";
import toast from "react-hot-toast";
import { ApiDelete, ApiGet } from "../../services/helpers/API/ApiData";

export default function ProductList() {
  const [addmodel, setAddModel] = useState(false);
  const [viewModel, setViewModel] = useState(false);
  const [viewModelData, setViewModelData] = useState({});
  const [products, setProducts] = useState();
  const [edit, setEdit] = useState(false);

  const modalShowHandal = () => {
    setAddModel(false);
    setEdit(false);
    setViewModel(false);
  };

  const handleEdit = (id) => {
    setEdit(true);
    console.log("Edit product with id:", id);
    setAddModel(true);
  };

  const handleShow = (row) => {
    setViewModelData(row);
    setViewModel(true);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleDelete = (id) => {
    console.log("Delete product with id:", id);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn-success",
        cancelButton: "deleteBtn",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          ApiDelete("products/delete/" + id)
            .then((res) => {
              getProduct();
              setProducts(res.data.results);
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            })
            .catch((err) => {
              console.log("ERR", err);
              toast.error("Error adding product!");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      width: "200px",
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Seller Price",
      selector: (row) => row.sellerPrice,
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
          <button className="editBtn" onClick={() => handleEdit(row.id)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>

          <button className="deleteBtn" onClick={() => handleDelete(row.id)}>
            <i className="fa-solid fa-trash-can"></i>
          </button>

          <button className="editBtn" onClick={() => handleShow(row)}>
            <i className="fa-solid fa-eye"></i>
          </button>
        </>
      ),
      sortable: false,
    },
  ];

  function getProduct() {
    ApiGet("products/get")
      .then((res) => {
        setProducts(res.data.results);
        toast.success("Product Get Successfully !");
      })
      .catch((err) => {
        console.log("ERR", err);
        toast.error("Error adding product!");
      });
  }

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
            {addmodel && (
              <AddProductModel modalShowHandal={modalShowHandal} edit={edit} getProductData={getProduct}/>
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
          <DataTable title="" columns={columns} data={products} pagination />
        </div>
      </div>
    </>
  );
}
