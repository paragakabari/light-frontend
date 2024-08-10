import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ApiGet, ApiDelete } from "../../../services/helpers/API/ApiData";
import "./cart.scss";
import CartTable from "./CartTable";

function Cart() {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    getCart();
  }, []);

  const getCart = () => {
    ApiGet("carts")
      .then((res) => {
        setCartData(res.data.items);
      })
      .catch((err) => {
        // toast.error(`Error: ${err} !`);
      });
  };

  const removeCartItem = (id) => {
    ApiDelete(`carts/delete/${id}`)
      .then((res) => {
        toast.success("Item removed successfully");
        getCart();
      })
      .catch((err) => {
        toast.error("Error deleting product!");
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "100px" }}>
      <CartTable cartData={cartData} onRemoveItem={removeCartItem} />
    </div>
  );
}

export default Cart;
