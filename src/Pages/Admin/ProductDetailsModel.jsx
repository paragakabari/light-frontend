import React from "react";
import "./productDetailsModel.scss";

function ProductDetailsModel(props) {
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
                  <th>Image:- </th>
                  <td className="img-contener">
                    {props.data.images?.map((x, i) => {
                      return (
                        <div href={x} target="" key={i}>
                          <img
                            
                            src={x}
                            alt="Document"
                            className="document-img"
                          />
                        </div>
                      )
                    })}
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
