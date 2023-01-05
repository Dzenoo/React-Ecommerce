import React from "react";
import { useSelector } from "react-redux";

import FavItem from "../components/FavItem";
import Card from "../../shared/components/UIelements/Card";

import "./Favorites.css";

const Favorites = () => {
  const favItems = useSelector((state) => state.favorite.favItems);

  return (
    <>
      <h1 className="center">Lista zelja</h1>
      <div className="fav_container">
        {favItems.length === 0 && (
          <Card className="card center">
            <h1>Lista zelja je prazna</h1>
          </Card>
        )}
        {favItems.length >= 1 &&
          favItems.map((item) => (
            <FavItem
              id={item.id}
              key={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
              inStock={item.inStock}
              description={item.description}
            />
          ))}
      </div>
    </>
  );
};

export default Favorites;
