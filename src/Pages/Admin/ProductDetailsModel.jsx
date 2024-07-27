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
          <div className="main-content">
            <h2>Product Name:- {props.data.name}</h2>
            <h4>Price:- ${props.data.price}</h4>
            <h4>Seller Price:- ${props.data.sellerPrice}</h4>
            <p>Description:- {props.data.description}</p>
            {/* {(props.data.image)?.map((img, index) => {
              return (
                <div className="model-images" key={index}>
                  <img src={img} alt={`Product Image ${index + 1}`} />
                </div>
              );
            })} */}
            <br /><br />
            <h4>Manufacturer Details:</h4>
            <h5 className="manufacturer">Name:- {props.data.manufacturername}</h5>
            <h5 className="manufacturer">Number:- {props.data.manufacturernumber}</h5>
            <h5 className="manufacturer">Address:- {props.data.manufactureraddress}</h5>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsModel;
