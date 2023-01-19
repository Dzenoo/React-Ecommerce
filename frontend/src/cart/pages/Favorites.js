import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../shared/hooks/http-hook";
import { useSelector } from "react-redux";

import "./Favorites.css";
import { useParams } from "react-router-dom";

const Favorites = () => {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [loadedFavorites, setLoadedFavorites] = useState([]);
  const userId = useParams().userId;

  useEffect(() => {
    const fetchUserFavorites = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/favorites/${userId}`
        );
        setLoadedFavorites(responseData.favorites);
      } catch (err) {}
    };

    fetchUserFavorites();
  }, [sendRequest, userId]);

  const deleteItemHandler = async (id) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/favorites/${id}`,
        "DELETE",
        null
      );

      onDeleteHandler(id);
    } catch (err) {}
  };

  const onDeleteHandler = (currId) => {
    setLoadedFavorites((prevFav) => {
      return prevFav.filter((f) => f._id !== currId);
    });
  };

  return (
    <div className="fav_list">
      {loadedFavorites.map((favItem) => (
        <div key={favItem.id} className="fav_item">
          <img
            src={`${process.env.REACT_APP_ASSETS_URL}/${favItem.image}`}
            alt={favItem.title}
          />
          <h1>{favItem.title}</h1>
          <h3>{favItem.price} Din</h3>

          <button onClick={() => deleteItemHandler(favItem.id)}>Ukloni</button>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
