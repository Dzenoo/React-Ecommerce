import React from "react";

import "./Favorites.css";

import { useSelector } from "react-redux";
import Card from "../../shared/components/UIelements/Card";

import FavItem from "../components/FavItem";

const Favorites = () => {
  const favItems = useSelector((state) => state.favorite.favItems);

  return (
    <>
      <div>
        <div className="center">
          <h1>Lista zelja</h1>
        </div>
        {favItems.length === 0 && (
          <Card className="card">
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
              description={item.description}
            />
          ))}
      </div>
    </>
  );
};

export default Favorites;
