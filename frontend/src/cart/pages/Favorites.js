import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

import Button from "../../shared/components/Form/Button";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import Loader from "../../shared/components/UIelements/Loader";
import Card from "../../shared/components/UIelements/Card";

import "./Favorites.css";

const Favorites = () => {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [loadedFavorites, setLoadedFavorites] = useState([]);
  const auth = useContext(AuthContext);
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
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
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
      <ErrorModal error={error} onCancel={clearError} />

      {loadedFavorites.length === 0 && (
        <Card style={{ textAlign: "center", margin: "auto" }}>
          <p>Lista zelja je prazna</p>
        </Card>
      )}

      {loadedFavorites.length >= 1 &&
        loadedFavorites.map((favItem) => (
          <div key={favItem.id} className="fav_item">
            {isLoading && <Loader />}
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/${favItem.image}`}
              alt={favItem.title}
            />
            <h1>{favItem.title}</h1>
            <h3>{favItem.price} Din</h3>

            <Button onClick={() => deleteItemHandler(favItem.id)}>
              Ukloni
            </Button>
          </div>
        ))}
    </div>
  );
};

export default Favorites;
