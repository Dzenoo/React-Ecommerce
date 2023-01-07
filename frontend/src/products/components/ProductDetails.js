import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../shared/components/Form/Button";
import { cartActions } from "../../shared/redux/cart-slice";
import { FavoriteActions } from "../../shared/redux/favorite-slice";

import "./ProductDetails.css";
import { AuthContext } from "../../shared/context/auth-context";

const size = [
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

  const addToFavoritesHandler = () => {
    dispatch(
      FavoriteActions.AddToFavorite({
        id,
        image,
        title,
        description,
        price,
        inStock,
      })
    );
    toast.success("Dodano u listu zelja!");
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
            <span>{price} DIN</span> |{isInStock}
          </div>
          <p>{description}</p>
        </div>

        <div className="content_mid">
          <select value={option} onChange={(e) => setOption(e.target.value)}>
            {size.map((si, index) => (
              <option key={index}>{si.label}</option>
            ))}
          </select>
          <h1>{option}</h1>
        </div>

        <div className="content_bottom">
          {isAllowedToBuy && (
            <Button to={!isLoggedIn && "/authenticate"} onClick={addToCart}>
              Dodaj u korpu
            </Button>
          )}

          {isAllowedToBuy && (
            <Button
              to={!isLoggedIn && "/authenticate"}
              inverse
              onClick={addToFavoritesHandler}
            >
              Dodaj na listu zelja
            </Button>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
