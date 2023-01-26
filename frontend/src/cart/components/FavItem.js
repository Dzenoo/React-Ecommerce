import React from "react";

import { useDispatch } from "react-redux";
import { FavoriteActions } from "../../shared/redux/favorite-slice";

import "./FavItem.css";

const FavItem = (props) => {
  // Get product details from props from the Favorites page
  const { id, image, title, price, inStock } = props;
  const dispatch = useDispatch();

  // Remove product from favorites
  const removeFromFavorites = () => {
    dispatch(FavoriteActions.RemoveFromFavorite(id));
  };

  return (
    <li className="fav_item">
      <div className="item__image">
        <img src={`${process.env.REACT_APP_ASSETS_URL}/${image}`} alt={title} />
      </div>

      <div className="fav_item_description">
        <div>
          <h1>{title}</h1>
          <p style={{ fontWeight: "bold" }}>Cena: {price}</p>
          <p style={{ fontWeight: "bold" }}>Na stanju: {inStock}</p>
        </div>

        <div>
          <button onClick={removeFromFavorites}>x</button>
        </div>
      </div>
    </li>
  );
};

export default FavItem;
