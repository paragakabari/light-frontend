import { useState } from "react";
import "./product.scss";
import ProductModel from "./ProductModel";
import { NavLink } from "react-router-dom";
export default function Product() {
  const [model, setModel] = useState(false);
  const [productData, setProductData] = useState();
  const products = [
    {
      id: 1,
      image: require("../../../assets/Procuct_light1.webp"),
      name: "Originals Kaval Windbreaker Winter Jacket",
      discription:
        "Minim est enim proident fugiat minim nulla mollit officia pariatur. Fugiat laborum labore duis incididunt excepteur mollit ex nulla quis voluptate. In eiusmod est cupidatat fugiat dolore duis excepteur sint mollit mollit consectetur. Mollit qui ullamco officia fugiat consectetur nulla adipisicing sint enim anim. In voluptate esse Lorem pariatur cillum nulla in deserunt adipisicing. Ad veniam elit ut deserunt id exercitation proident mollit occaecat.",
      price: 19.12,
      originalPrice: 23.9,
      discount: "-20%",
      rating: 5,
      isNew: false,
    },
    {
      id: 2,
      image: require("../../../assets/Procuct_light2.jpg"),
      name: "Juicy Couture Juicy Quilted Terry Track Jacket",

      discription:
        "Minim est enim proident fugiat minim nulla mollit officia pariatur. Fugiat laborum labore duis incididunt excepteur mollit ex nulla quis voluptate. In eiusmod est cupidatat fugiat dolore duis excepteur sint mollit mollit consectetur. Mollit qui ullamco officia fugiat consectetur nulla adipisicing sint enim anim. In voluptate esse Lorem pariatur cillum nulla in deserunt adipisicing. Ad veniam elit ut deserunt id exercitation proident mollit occaecat.",

      price: 11.9,
      originalPrice: 35.9,
      discount: "-20%",
      rating: 5,
      isNew: false,
    },
    {
      id: 3,
      image: require("../../../assets/architecture-wood-villa-mansion-house-chair-1590901-pxhere.com.jpg"),
      name: "Madden By Steve Madden Cale 6",
      discription:
        "Minim est enim proident fugiat minim nulla mollit officia pariatur. Fugiat laborum labore duis incididunt excepteur mollit ex nulla quis voluptate. In eiusmod est cupidatat fugiat dolore duis excepteur sint mollit mollit consectetur. Mollit qui ullamco officia fugiat consectetur nulla adipisicing sint enim anim. In voluptate esse Lorem pariatur cillum nulla in deserunt adipisicing. Ad veniam elit ut deserunt id exercitation proident mollit occaecat.",
      price: 11.9,
      rating: 4,
      isNew: true,
    },
    {
      id: 4,
      image: require("../../../assets/light-wall-ceiling-lamp-room-lighting-666706-pxhere.com.jpg"),
      name: "Brixton Patrol All Terrain Anorak Jacket",
      discription:
        "Minim est enim proident fugiat minim nulla mollit officia pariatur. Fugiat laborum labore duis incididunt excepteur mollit ex nulla quis voluptate. In eiusmod est cupidatat fugiat dolore duis excepteur sint mollit mollit consectetur. Mollit qui ullamco officia fugiat consectetur nulla adipisicing sint enim anim. In voluptate esse Lorem pariatur cillum nulla in deserunt adipisicing. Ad veniam elit ut deserunt id exercitation proident mollit occaecat.",

      price: 29.0,
      rating: 5,
      isNew: false,
    },
    {
      id: 5,
      image: require("../../../assets/Procuct_light1.webp"),
      name: "Originals Kaval Windbreaker Winter Jacket",
      discription:
        "Minim est enim proident fugiat minim nulla mollit officia pariatur. Fugiat laborum labore duis incididunt excepteur mollit ex nulla quis voluptate. In eiusmod est cupidatat fugiat dolore duis excepteur sint mollit mollit consectetur. Mollit qui ullamco officia fugiat consectetur nulla adipisicing sint enim anim. In voluptate esse Lorem pariatur cillum nulla in deserunt adipisicing. Ad veniam elit ut deserunt id exercitation proident mollit occaecat.",
      price: 19.12,
      originalPrice: 23.9,
      discount: "-20%",
      rating: 5,
      isNew: false,
    },
    {
      id: 6,
      image: require("../../../assets/Procuct_light2.jpg"),
      name: "Juicy Couture Juicy Quilted Terry Track Jacket",
      discription:
        "Minim est enim proident fugiat minim nulla mollit officia pariatur. Fugiat laborum labore duis incididunt excepteur mollit ex nulla quis voluptate. In eiusmod est cupidatat fugiat dolore duis excepteur sint mollit mollit consectetur. Mollit qui ullamco officia fugiat consectetur nulla adipisicing sint enim anim. In voluptate esse Lorem pariatur cillum nulla in deserunt adipisicing. Ad veniam elit ut deserunt id exercitation proident mollit occaecat.",

      price: 11.9,
      originalPrice: 35.9,
      discount: "-20%",
      rating: 5,
      isNew: false,
    },
    {
      id: 7,
      image: require("../../../assets/architecture-wood-villa-mansion-house-chair-1590901-pxhere.com.jpg"),
      name: "Madden By Steve Madden Cale 6",
      discription:
        "Minim est enim proident fugiat minim nulla mollit officia pariatur. Fugiat laborum labore duis incididunt excepteur mollit ex nulla quis voluptate. In eiusmod est cupidatat fugiat dolore duis excepteur sint mollit mollit consectetur. Mollit qui ullamco officia fugiat consectetur nulla adipisicing sint enim anim. In voluptate esse Lorem pariatur cillum nulla in deserunt adipisicing. Ad veniam elit ut deserunt id exercitation proident mollit occaecat.",

      price: 11.9,
      rating: 4,
      isNew: true,
    },
    {
      id: 8,
      image: require("../../../assets/light-wall-ceiling-lamp-room-lighting-666706-pxhere.com.jpg"),
      name: "Brixton Patrol All Terrain Anorak Jacket",
      discription:
        "Minim est enim proident fugiat minim nulla mollit officia pariatur. Fugiat laborum labore duis incididunt excepteur mollit ex nulla quis voluptate. In eiusmod est cupidatat fugiat dolore duis excepteur sint mollit mollit consectetur. Mollit qui ullamco officia fugiat consectetur nulla adipisicing sint enim anim. In voluptate esse Lorem pariatur cillum nulla in deserunt adipisicing. Ad veniam elit ut deserunt id exercitation proident mollit occaecat.",

      price: 29.0,
      rating: 5,
      isNew: false,
    },
  ];

  const modalShowHandal=()=>{
    setModel(false)
  }

  const modelShow = (x) => {
    setModel(true);
    setProductData(x);
  };
  return (
    <>
      <div className="container">
        <div className="heading">Product List</div>
        <div className="product-grid">
          {/* Add 10 Card */}
          {products.map((x, i) => {
            return (
              <>
                <div className="product-card" key={i}>
                  <div className="product-image">
                    <img src={x.image} alt="product" />
                  </div>
                  <NavLink className="eye" onClick={() => modelShow(x)}>
                    <i className="fa-solid fa-eye"></i>
                  </NavLink>
                  {/* <div className="add-cart">
                    <NavLink to="/cart">Add To Cart</NavLink>
                  </div> */}
                  <div className="product-details">
                    <div className="product-name">{x.name}</div>
                    <div className="product-price">${x.price}</div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      {model?<ProductModel productData={productData} modalShowHandal={modalShowHandal}/>:""}
      
    </>
  );
}
