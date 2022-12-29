import React from "react";

import { useDispatch } from "react-redux";
import { cartActions } from "../../shared/redux/cart-slice";

import "./CartItem.css";

const CartItem = (props) => {
  const { id, image, title, price, totalPrice, quantity, size } = props;
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(cartActions.AddToCart({ id, title, price }));
  };

  const removeCartHandler = () => {
    dispatch(cartActions.RemoveFromCart(id));
  };

  return (
    <div className="cart_item">
      <img src={image} alt={title} />
      <div className="cart_item_description">
        <h1>{title}</h1>
        <p style={{ fontWeight: "bold" }}>{price} DIN</p>
      </div>
      <span className="size">{size}</span>
      <div className="actions">
        <button onClick={addToCart}>+</button>
        <span className="size">{quantity}</span>
        <button onClick={removeCartHandler}>-</button>
      </div>
      <div className="cart_item_totalPrice">
        <span>{totalPrice} DIN</span>
      </div>
    </div>
  );
};

export default CartItem;
