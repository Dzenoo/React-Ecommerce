import React from "react";
import { useSelector } from "react-redux";


import Button from "../../shared/components/Form/Button";
import Card from "../../shared/components/UIelements/Card";
import CartItem from "../components/CartItem";

import "./CartPage.css";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Korpa</h1>
      <div className="cart_container">
        <div className="cart_wrapper">
          {cartItems.length === 0 && (
            <Card style={{ textAlign: "center", margin: "auto" }}>
              Korpa je prazna
            </Card>
          )}
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
          {cartItems.length >= 1 && (
            <Button to="/cart/checkout">Nastavi placanje</Button>
          )}
          <Button to="/products" inverse>
            Nastavi sa kupovinom
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
