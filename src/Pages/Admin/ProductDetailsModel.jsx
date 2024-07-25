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
            <h2>Product Name:- {props.data.productName}</h2>
            <h4>Price:- ${props.data.price}</h4>
            <p>Description:- {props.data.description}</p>
            {(props.data.images)?.map((img, index) => {
              return (
                <div className="model-images" key={index}>
                  <img src={img} alt={`Product Image ${index + 1}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsModel;
