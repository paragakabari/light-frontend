import React from "react";
import "./userModel.scss";
import { ApiPut } from "../../services/helpers/API/ApiData";
import toast from "react-hot-toast";

function AllCartModel({ userData, modalShowHandal }) {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <button className="close-btn" onClick={modalShowHandal}>
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h2>Detail</h2>
        <div className="main-content">
          <p style={{ color: "#ed3237", fontWeight: "700" }}>Total Items: {userData?.items?.length}</p>
          <table className="user-details-table">
            <tbody>
              {userData?.items?.map((x, i) => (
                <tr key={i}>
                  <td style={{ padding: "30px" }}>
                    <strong style={{ color: "#ed3237", padding: "30px" }}>Item {i + 1}</strong>
                    <table className="item-details">
                      <tbody>
                        <tr>
                          <th>Name</th>
                          <td>{x.productId.name}</td>
                        </tr>
                        <tr>
                          <th>Price</th>
                          <td>{x.productId.price}</td>
                        </tr>
                        <tr>
                          <th>Dealer Price</th>
                          <td>{x.productId.dealerPrice}</td>
                        </tr>
                        <tr>
                          <th>Description</th>
                          <td>{x.productId.description}</td>
                        </tr>
                        <tr>
                          <th>Images</th>
                          <td>
                            {x?.productId?.images?.map((img, index) => (
                              <img src={img} alt="Product Image" height={"200px"} width={"200px"} key={index} />
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <th>Manufacturer Address</th>
                          <td>{x.productId.manufactureraddress}</td>
                        </tr>
                        <tr>
                          <th>Manufacturer Name</th>
                          <td>{x.productId.manufacturername}</td>
                        </tr>
                        <tr>
                          <th>Manufacturer Number</th>
                          <td>{x.productId.manufacturernumber}</td>
                        </tr>
                        <tr>
                          <th>Quantity</th>
                          <td style={{ color: "#ed3237", fontWeight: "700" }}>{x.quantity}</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllCartModel;
