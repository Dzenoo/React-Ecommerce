import React from "react";
import { useSelector } from "react-redux";
import "./CartPage.css";

import Button from "../../shared/components/Form/Button";
import CartItem from "../components/CartItem";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="cart_wrapper">
      <h1>Korpa</h1>
      {cartItems.length >= 1 && (
        <div className="desc">
          <h1>Opis</h1>
          <h1>Ukupno</h1>
          <h1>Cena</h1>
        </div>
      )}
      <div>
        {cartItems.length === 0 && <div>Korpa je prazna</div>}
        {cartItems.length >= 1 &&
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              quantity={item.quantity}
              totalPrice={item.totalPrice}
              size={item.option}
            />
          ))}
      </div>

      <div className="actions">
        <Button to="/">Nastavi placanje</Button>
        <Button to="/products" inverse>
          Nastavi sa kupovinom
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
