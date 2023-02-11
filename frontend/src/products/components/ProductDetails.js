import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { cartActions } from "../../shared/redux/cart-slice";
import { Size } from "../../shared/data/Helpers";

import Button from "../../shared/components/Form/Button";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../shared/assets/log.png";
import "./ProductDetails.css";

const ProductDetails = (props) => {
  // Initial Size
  const [option, setOption] = useState("S");
  // Get object from http custom hook
  const { sendRequest } = useHttpClient();
  // Get auth object from context
  const auth = useContext(AuthContext);
  // Check if user is logged in from the auth object
  const isLoggedIn = auth.isLoggedIn;

  // Favorites to prevent adding same product
  const [loadedFavorites, setloadedFavorites] = useState([]);

  // Getting product details
  const { id, title, image, description, price, category, inStock } =
    props.productDetail;

  const dispatch = useDispatch();

  // Define variables for check product is inStock and if its allowed to buy
  let isInStock;
  let isAllowedToBuy = false;

  switch (inStock) {
    // If inStock value is "ne" then disable button to add to cart and favorites
    case "ne":
      {
        isInStock = <h4 className="stc-red">Nije na stanju</h4>;
        isAllowedToBuy = false;
      }
      break;
    // If inStock value is "da" then enable button to add to cart and favorites
    case "da": {
      isInStock = <h4 className="stc-green">Na stanju</h4>;
      isAllowedToBuy = true;
    }
  }

  // Redux function for adding to cart
  const addToCart = () => {
    dispatch(cartActions.AddToCart({ id, image, title, price, option }));
    toast.success("Dodano u korpu!");
  };

  // Function for adding favorites
  const sendToBackend = async () => {
    const currProd = loadedFavorites.find((prod) => prod.title === title);
    if (currProd) {
      toast.error("Artikal je vec dodan!");
      return false;
    }

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

  // Get favorites
  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/favorites/${auth.userId}`
        );
        setloadedFavorites(responseData.favorites);
      } catch (err) {}
    };

    fetchUserFavorites();
  }, [sendRequest, auth.userId]);

  return (
    <>
      <div className="product_details_container">
        <div className="column_first slide_column_f">
          <h2>Proizvodi / {category}</h2>
          {isInStock}
          <p>{description}</p>
          <hr />
          <div className="flex_div">
            <select value={option} onChange={(e) => setOption(e.target.value)}>
              {Size.map((size, index) => (
                <option key={index}>{size.label}</option>
              ))}
            </select>
            <h1>{option}</h1>
          </div>
          {isAllowedToBuy && (
            <Button to={!isLoggedIn && "/authenticate"} onClick={addToCart}>
              Dodaj u korpu
            </Button>
          )}
          <Button
            action
            to={!isLoggedIn && "/authenticate"}
            onClick={sendToBackend}
          >
            Dodaj u listu zelja
          </Button>
        </div>
        <div className="column_second slide_column_t">
          <img
            src={`${process.env.REACT_APP_ASSETS_URL}/${image}`}
            alt={title}
          />
          <h1>{title}</h1>
          <p>{price} DIN</p>
        </div>
        <div className="column_third slide_column_f">
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
              isporuke za standardnu d​ostavu je 3-4 radnih dana od datuma
              isporuke.
            </p>
          </details>
          <details>
            <summary>Nacin Placanja</summary>
            <p>
              Placanje se vrsi pouzecem, placanjem postaru odredjeni iznos novca
            </p>
          </details>
          <hr />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProductDetails;
