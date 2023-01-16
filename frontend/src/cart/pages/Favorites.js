import React from "react";

import { useSelector } from "react-redux";

import "./Favorites.css";

const Favorites = () => {
  const favItems = useSelector((state) => state.favs.items);

  return (
    <div className="fav_list">
      {favItems.map((favItem) => (
        <div key={favItem.id} className="fav_item">
          <img
            src={`${process.env.REACT_APP_ASSETS_URL}/${favItem.image}`}
            alt={favItem.title}
          />
          <h1>{favItem.title}</h1>
          <h1>{favItem.option}</h1>
          <h3>{favItem.price} Din</h3>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
