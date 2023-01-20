import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { cartActions } from "../../shared/redux/cart-slice";

import Button from "../../shared/components/Form/Button";
import "react-toastify/dist/ReactToastify.css";
import "./ProductDetails.css";

const SKU = [
  {
    label: "XS",
    val: "XS",
  },
  {
    label: "S",
    val: "S",
  },
  {
    label: "M",
    val: "M",
  },
  {
    label: "L",
    val: "L",
  },
  {
    label: "XL",
    val: "XL",
  },
  {
    label: "XXL",
    val: "XXL",
  },
];

const ProductDetails = (props) => {
  const [option, setOption] = useState("S");
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext);
  const isLoggedIn = auth.isLoggedIn;

  const { id, title, image, description, price, category, inStock } =
    props.productDetail;

  const dispatch = useDispatch();

  let isInStock;
  let isAllowedToBuy = false;

  switch (inStock) {
    case "ne":
      {
        isInStock = <h4 className="stc-red">Nije na stanju</h4>;
        isAllowedToBuy = false;
      }
      break;

    case "da": {
      isInStock = <h4 className="stc-green">Na stanju</h4>;
      isAllowedToBuy = true;
    }
  }

  const addToCart = () => {
    dispatch(cartActions.AddToCart({ id, image, title, price, option }));
    toast.success("Dodano u korpu!");
  };

  const sendToBackend = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/favorites/add`,
        "POST",
        JSON.stringify({ title, image, price }),
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        }
      );
      toast.success("Dodano u listu zelja!");
    } catch (err) {}
  };

  return (
    <div className="product_details_container">
      <div className="product_details_image">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/${image}`} alt={title} />
      </div>

      <div className="product_details_content">
        <div className="content_top">
          <span>{category}</span>
          <h1>{title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "2em" }}>
            <span>{price} DIN</span> | {isInStock}
          </div>
          <p>{description}</p>
        </div>
        <div className="content_mid">
          <select value={option} onChange={(e) => setOption(e.target.value)}>
            {SKU.map((size, index) => (
              <option key={index}>{size.label}</option>
            ))}
          </select>
          <h1>{option}</h1>

          {isAllowedToBuy && (
            <Button to={!isLoggedIn && "/authenticate"} onClick={addToCart}>
              Dodaj u korpu
            </Button>
          )}

          <Button
            inverse
            to={!isLoggedIn && "/authenticate"}
            onClick={sendToBackend}
          >
            Dodaj u listu zelja
          </Button>
        </div>
        <div>
          <details>
            <summary>Besplatna dostava</summary>
            <p>
              Isporučite svoje artikle direktno na vaša vrata uz našu ponudu
              besplatne dostave! Nema više brige o dodatnim troškovima dostave -
              mi se brinemo o tome umjesto vas. Kupujte sada i dobijte besplatnu
              isporuku kupovine za sve narudžbe iznad 6000 Din.
            </p>
          </details>

          <details>
            <summary>Vreme dostave</summary>
            <p>
              Dobijte svoju narudžbinu brzo uz našu efikasnu uslugu dostave!
              Razumemo da želite kupovinu što je prije moguće, zato obrađujemo i
              šaljemo vašu narudžbu u roku od 1-2 radna dana. Predviđeno vrijeme
              isporuke za standardnu ​​dostavu je 3-4 radnih dana od datuma
              isporuke.
            </p>
          </details>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
