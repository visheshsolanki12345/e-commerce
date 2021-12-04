import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.product.product_image} alt="ssa" />
      <div>
        <Link to={`/product/${item.product.id}`}>{item.title}</Link>
        <span>{`Price: ₹${item.product.selling_price}`}</span>
        <p onClick={() => deleteCartItems(item.id)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;
