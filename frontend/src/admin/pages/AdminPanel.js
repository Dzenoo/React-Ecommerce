import React, { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { CgProfile } from "react-icons/cg";
import { AiOutlineFolderAdd } from "react-icons/ai";

import AdminProductItem from "../components/AdminProductItem";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import Button from "../../shared/components/Form/Button";
import Loader from "../../shared/components/UIelements/Loader";

import "./AdminPanel.css";

const AdminPanel = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  // USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/users/"
        );
        setUsers(responseData.users);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);

  //PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/products/"
        );
        setProducts(responseData.products);
      } catch (err) {}
    };
    fetchProducts();
  }, [sendRequest]);

  const deleteProductHandler = (deletedProductId) => {
    setProducts((prevPlaces) =>
      prevPlaces.filter((p) => p.id !== deletedProductId)
    );
  };

  return (
    <>
      <div className="admin_wrapper">
        <div className="admin__center">
          <div className="flex">
            <h1>Artikli</h1>
            <Button action to="/admin/new">
              <AiOutlineFolderAdd />
              Dodaj Artikal
            </Button>
          </div>
          <div className="product_list" id="artikli_section">
            {/* ARTIKLI */}
            {products.map((product) => (
              <AdminProductItem
                key={product._id}
                _id={product._id}
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                inStock={product.inStock}
                onDelete={deleteProductHandler}
              />
            ))}
          </div>

          {/* USERS LIST */}

          <div className="flex">
            <h1>Korisnici</h1>
          </div>
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && <Loader />}
          <div className="users_list" id="user_section">
            {users.map((user) => (
              <div className="user_item" key={user.id}>
                <CgProfile size={30} />
                <h1>{user.name}</h1>
                <b>{user.email}</b>
              </div>
            ))}
          </div>

          {/* PORUDZBINE */}

          {/* <div className="flex">
            <h1>Porudzbine</h1>
          </div>
          <div className="orders_section">
            <div className="item">
              <h1>John</h1>
              <h1>Doe</h1>
              <address>Neka adresa</address>
              ||
              <img src={Slika} />
              <h1>Adidas Hero</h1>
              <h1>2000 DIN</h1>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
