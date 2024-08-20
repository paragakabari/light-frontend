import React, { useEffect, useState } from "react";
import "./productDetailsModel.scss";
import { ApiGet } from "../../services/helpers/API/ApiData";
import toast from "react-hot-toast";

function ProductDetailsModel(props) {
  const [category, setCategory] = useState("");

  useEffect(() => {
    getCategory();
  },[]); 

  const getCategory = () => {
    ApiGet("categories/getAll")
      .then((res) => {
        const matchedCategory = res.data.find(x => x.id === props.data.category);
        if (matchedCategory) {
          setCategory(matchedCategory.name);
        } else {
          setCategory("Unknown Category");
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <div className="popup-overlay">
        <div className="popup">
          <button className="close-btn" onClick={props.modalShowHandal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <h2>Product Detail</h2>
          <div className="main-content">
            <table className="user-details-table">
              <tbody>
                <tr>
                  <th>Product Name:- </th>
                  <td>{props.data.name}</td>
                </tr>
                <tr>
                  <th>Price:- </th>
                  <td>{props.data.price}</td>
                </tr>
                <tr>
                  <th>Dealer Price:- </th>
                  <td>{props.data.dealerPrice}</td>
                </tr>
                <tr>
                  <th>Description:- </th>
                  <td>{props.data.description}</td>
                </tr>
                <tr>
                  <th>Category:- </th>
                  <td>{category}</td>
                </tr>
                <tr>
                  <th>Image:- </th>
                  <td className="img-contener">
                    {props.data.images?.map((x, i) => (
                      <div key={i}>
                        <img
                          src={x}
                          alt="Product"
                          className="document-img"
                        />
                      </div>
                    ))}
                  </td>
                </tr>
                <tr>
                  <th>Manufacturer Details:- </th>
                  <td>
                    <table>
                      <tbody>
                        <tr>
                          <th>Name:-</th>
                          <td>{props.data.manufacturername}</td>
                        </tr>
                        <tr>
                          <th>Number:-</th>
                          <td>{props.data.manufacturernumber}</td>
                        </tr>
                        <tr>
                          <th>Address:-</th>
                          <td>{props.data.manufactureraddress}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsModel;
