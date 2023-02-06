import React from "react";
import { useSelector } from "react-redux";

import Button from "../../shared/components/Form/Button";
import Card from "../../shared/components/UIelements/Card";
import Footer from "../../shared/components/Footer/Footer";
import CartItem from "../components/CartItem";

import "./CartPage.css";

const CartPage = () => {
  // Select cart items from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff" }}>Korpa</h1>
      <div className="cart_container animation">
        {/* If cart is empty */}
        {cartItems.length === 0 && (
          <Card style={{ textAlign: "center", margin: "auto" }}>
            <p> Korpa je prazna</p>
          </Card>
        )}
        <div className="cart_wrapper">
          {/* When cart is fill with products */}
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
          {/* If product is in cart, enable button to go to checkout */}
          {cartItems.length >= 1 && (
            <Button to="/cart/checkout">Nastavi placanje</Button>
          )}
          <Button to="/products" inverse>
            Nastavi sa kupovinom
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
