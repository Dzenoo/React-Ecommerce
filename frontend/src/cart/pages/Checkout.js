import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { VALIDATOR_REQUIRE } from "../../shared/util/validate";
import { ToastContainer, toast } from "react-toastify";

import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import Loader from "../../shared/components/UIelements/Loader";
import Button from "../../shared/components/Form/Button";
import Input from "../../shared/components/Form/Input";

import "react-toastify/dist/ReactToastify.css";
import "./Checkout.css";

const Checkout = () => {
  // Get http properties from custom hook (useHttp)
  const { sendRequest, isLoading, error, clearError } = useHttpClient();

  // Get form handling properties from custom hook (useForm)
  // Initialy form validity is set to false
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },

      surname: {
        value: "",
        isValid: false,
      },

      city: {
        value: "",
        isValid: false,
      },
      country: {
        value: "",
        isValid: false,
      },
      postalcode: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // Get cart items and subtotal from redux
  const cartItems = useSelector((state) => state.cart.items);
  const subTotal = useSelector((state) => state.cart.subTotal);

  // Process checkout function
  const checkOrderCartHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/orders/new`,
        "POST",
        // Send to backend user information and current cart items
        JSON.stringify({
          name: formState.inputs.name.value,
          surname: formState.inputs.surname.value,
          city: formState.inputs.city.value,
          country: formState.inputs.country.value,
          postalcode: formState.inputs.postalcode.value,
          phone: formState.inputs.phone.value,
          product: cartItems,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      toast.success("Uspesno obavljena porudzbina!");
    } catch (error) {
      toast.error("Porudzbina se ne moze obaviti. Pokusajte ponovo kasnije");
      alert(error);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "#fff" }}>Porudzbina</h1>
      <ToastContainer />
      <div className="checkout_section">
        {/* Http handling loading and possible errors */}
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <Loader asOverlay />}

        {/* Show form */}
        <div className="checkout_form">
          <h1>Detalji porudzbine</h1>
          <hr />
          <form onSubmit={checkOrderCartHandler}>
            <div className="formflex">
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
            </div>

            <Input
              element="input"
              id="city"
              label="Grad"
              type="text"
              placeholder="Grad"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Unesite ispravan Grad"
            />

            <Input
              element="input"
              label="Drzava"
              id="country"
              type="text"
              placeholder="Drzava"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Unesite ispravnu drzavu"
            />

            <Input
              element="input"
              label="Postanski broj"
              id="postalcode"
              type="number"
              placeholder="Postanski broj"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Unesite ispravan postanski broj"
            />

            <Input
              element="input"
              label="Telefon"
              id="phone"
              type="number"
              placeholder="Telefon"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Unesite ispravan broj"
            />

            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label for="vehicle1" style={{ fontSize: "20px" }}>
              Placanje pouzecem
            </label>
            <br />
            <br />

            <Button type="submit" disabled={!formState.isValid}>
              Zavrsi porudzbinu
            </Button>
          </form>
        </div>
        {/* Show cart items */}
        <div className="checkout_cart">
          <h1>Porudzbina</h1>
          {cartItems.map((item) => (
            <div className="checkout_cart_item" key={item.id}>
              <img
                src={`${process.env.REACT_APP_ASSETS_URL}/${item.image}`}
                alt={item.title}
              />

              <div className="teks">
                <h1>{item.title}</h1>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "2rem" }}
                >
                  <p>
                    {item.quantity} x {item.price}
                  </p>
                  <span>
                    <b> {item.totalPrice} DIN</b>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Show subtotal  */}
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
