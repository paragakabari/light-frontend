import React, { useEffect, useState } from "react";
import "./ProductModel.scss";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ApiPost } from "../../../services/helpers/API/ApiData";

function ProductModel(props) {
  const product = props.productData;
  const [quantity, setQuantity] = useState(1);
  const [mainImg, setMainImg] = useState(product.images[0]);
  const [activeImg, setActiveImg] = useState(null);
  const [localStorageData, setLocalStorageData] = useState({});
  const navigate = useNavigate();

  const imgs = product.images;

  useEffect(() => {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      data[key] = localStorage.getItem(key);
    }
    setLocalStorageData(data);
  }, []);

  const cartHandl = (id, quantity) => {
    if (
      localStorageData.role === "user" ||
      localStorageData.role === "seller"
    ) {
      addCart(id, quantity);
    } else {
      toast.error("Please Login First !");
      navigate("/login");
    }
  };

  const addCart = (id, quantity) => {
    const data = {
      productId: id,
      quantity: quantity,
    };
    ApiPost("carts/add", data)
      .then((res) => {
        toast.success("Product Added to Cart Successfully!");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

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
                <h3>{product.name}</h3>
                <h4>Price: &#8377;{product.price}</h4>
                {localStorage.getItem("role") === "seller" && (
                  <h4 className="product-price">
                    Dealer Price: &#8377;{product.sellerPrice}
                  </h4>
                )}
                <p>{product.description}</p>
              </div>
              <hr />

              <div className="buy-section">
                <div className="quantity-outer">
                  <button
                    onClick={() =>
                      quantity > 1 ? setQuantity(quantity - 1) : quantity
                    }
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
                <button
                  className="buy-btn"
                  onClick={() => cartHandl(product.id, quantity)}
                >
                  Add to Cart
                </button>
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
                    <span>Free 30 Days Delivery Returns</span>
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
