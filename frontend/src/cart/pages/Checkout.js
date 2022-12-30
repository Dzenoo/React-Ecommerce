import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../shared/hooks/form-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validate";

import Button from "../../shared/components/Form/Button";
import Input from "../../shared/components/Form/Input";
import "./Checkout.css";

const Checkout = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },

      surname: {
        value: "",
        isValid: false,
      },

      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const cartItems = useSelector((state) => state.cart.items);
  const subTotal = useSelector((state) => state.cart.subTotal);

  const checkOrderCartHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);

    // save order in mongodb
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Checkout</h1>
      <div className="checkout_section">
        <div className="checkout_form">
          <h1>Detalji porudzbine</h1>
          <hr />

          <form onSubmit={checkOrderCartHandler}>
            <Input
              element="input"
              label="Ime"
              id="name"
              type="text"
              placeholder="Ime"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Unesite ispravno ime"
            />

            <Input
              element="input"
              id="surname"
              label="Prezime"
              type="text"
              placeholder="Prezime"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Unesite ispravno prezime"
            />

            <Input
              element="input"
              id="address"
              label="Adresa"
              type="text"
              placeholder="Adresa"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Unesite ispravnu adresu"
            />

            <Button type="submit">Zavrsi porudzbinu</Button>
          </form>
        </div>
        <div className="checkout_cart">
          <h1>Porudzbina</h1>

          {cartItems.map((item) => (
            <div className="checkout_cart_item" key={item.id}>
              <img src={item.image} alt={item.title} />
              <h1>{item.title}</h1>
              <span>
                {item.totalPrice} <b>DIN</b>
              </span>
            </div>
          ))}

          <div className="subtotal">
            <h1>Ukupno:</h1>
            <h2>{subTotal} DIN</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
