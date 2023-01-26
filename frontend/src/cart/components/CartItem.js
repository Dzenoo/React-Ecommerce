import React from "react";

import { useDispatch } from "react-redux";
import { cartActions } from "../../shared/redux/cart-slice";

import "./CartItem.css";

const CartItem = (props) => {
  // Get product details from props from the Product Detail page
  const { id, image, title, price, totalPrice, quantity, size } = props;
  const dispatch = useDispatch();

  // Add product to cart with redux functionality
  const addToCart = () => {
    dispatch(cartActions.AddToCart({ id, title, price }));
  };

  // Remove product from cart with redux
  const removeCartHandler = () => {
    dispatch(cartActions.RemoveFromCart(id));
  };

  return (
    <div className="cart_item">
      <img src={`${process.env.REACT_APP_ASSETS_URL}/${image}`} alt={title} />
      <div className="cart_item_description">
        <div className="text">
          <h1>{title}</h1>
          <p>Cena: {price} DIN</p>
          <span>
            Velicina: <b>{size}</b>
          </span>
          <br />
          <br />
          <span>
            Ukupna cena: <b>{totalPrice} DIN</b>
          </span>
        </div>

        <div className="actions">
          <button onClick={addToCart}>+</button>
          <span className="size">{quantity}</span>
          <button onClick={removeCartHandler}>-</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
