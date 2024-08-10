import { useEffect, useState } from "react";
import "./product.scss";
import ProductModel from "./ProductModel";
import { ApiGet } from "../../../services/helpers/API/ApiData";
export default function Product() {
  const [model, setModel] = useState(false);
  const [productData, setProductData] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    ApiGet("products/getAll")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        // toast.error("Error fetching products!");
      });
  };

  const modalShowHandal = () => {
    setModel(false);
  };

  const modelShow = (x) => {
    setModel(true);
    setProductData(x);
  };
  return (
    <>
      <div className="container">
        <div className="heading">Product List</div>
        <div className="product-grid">
          {products?.map((x, i) => {
            return (
              <>
                <div className="product-card" key={i}>
                  <div className="product-image" onClick={() => modelShow(x)}>
                    {x.images.map((y,index)=>{
                      return(
                        <img src={y} alt="product" key={index} />
                      )
                    })}
                  </div>
                  <span className="eye" onClick={() => modelShow(x)}>
                    <i className="fa-solid fa-eye"></i>
                  </span>
               
                  <div className="product-details">
                    <div className="product-name">{x.name}</div>
                    <div className="product-price">&#8377;{x.price}</div>
                    {localStorage.getItem("role") === "seller" && (
                      <div className="product-price">
                        Seller Price: &#8377;{x.sellerPrice}
                      </div>
                    )}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {model ? (
        <ProductModel
          productData={productData}
          modalShowHandal={modalShowHandal}
        />
      ) : (
        ""
      )}
    </>
  );
}
