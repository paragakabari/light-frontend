import React, { useState } from "react";
import "./ProductModel.scss";
import img1 from "../../../assets/light3.webp";
import img2 from "../../../assets/celling Light.jpg";
import img3 from "../../../assets/celling Light4.jpg";
import img4 from "../../../assets/light1.webp";

function ProductModel(props) {
  const product = props.productData;
  const [quantity, setQuantity] = useState(0);
  const [mainImg, setMainImg] = useState(product ? product.image : "");
  const [activeImg, setActiveImg] = useState(null);

  const imgs = [product.image,img1, img2, img3, img4];

  return (
    <>
      <div className="popup-overlay">
        <div className="popup">
          <button className="close-btn" onClick={props.modalShowHandal}>
            <i className="fa-solid fa-xmark"></i>
          </button>
          <div className="main-detail-grid">
            <div className="sub-item">
              <div className="border">
                {imgs.map((x, i) => {
                          const isActive = x === activeImg;
                  return (
                    <img
                      key={i}
                      className={`product-other-image ${
                        isActive ? "active" : ""
                      }`}
                      src={x}
                      alt="Product"
                      onClick={() => {
                        setMainImg(x);
                        setActiveImg(x);
                      }}
                    />
                  );
                })}
              </div>
              <div className="border">
                <img
                  src={mainImg}
                  className="display-image"
                  alt="display-image"
                />
              </div>
            </div>
            <div className="sub-item border">
              <div>
                <h3>{product ? product.name : "Title"}</h3>
                <h4>${product ? product.price : "00.00"}</h4>
                <p>{product ? product.discription : "discription"}</p>
              </div>
              <hr />

              <div className="buy-section">
                <div className="quantity-outer">
                  <button
                    onClick={() =>
                      quantity > 0 ? setQuantity(quantity - 1) : quantity
                    }
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <button className="buy-btn">Add to Cart</button>
                <button className="buy-btn">Buy Now</button>
              </div>
              <hr />
              <div className="services">
                <div className="services-inner">
                  <div className="service-icon">
                    <i className="fa-solid fa-truck"></i>
                  </div>
                  <div>
                    <h5>Free Delivery</h5>
                    <span>
                      Enter your postal code for Delivery Availability
                    </span>
                  </div>
                </div>
                <hr />
                <div className="services-inner">
                  <div className="service-icon">
                    <i className="fa-solid fa-rotate-left"></i>
                  </div>
                  <div>
                    <h5>Return Delivery</h5>
                    <span>Free 30 Days Delivery Returns </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProductModel;
