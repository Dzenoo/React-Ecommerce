import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

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
  const [orders, setOrders] = useState([]);
  const auth = useContext(AuthContext);

  // USERS
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
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
          `${process.env.REACT_APP_BACKEND_URL}/products`
        );
        setProducts(responseData.products);
      } catch (err) {}
    };
    fetchProducts();
  }, [sendRequest]);

  //DELETE PRODUCTS HANDLER
  const deleteProductHandler = (deletedProductId) => {
    setProducts((prevPlaces) =>
      prevPlaces.filter((p) => p._id !== deletedProductId)
    );
  };

  // ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/orders`
        );
        setOrders(responseData.orders);
      } catch (err) {}
    };
    fetchOrders();
  }, [sendRequest]);

  //DELETE ORDER HANDLER
  const onDelete = (enteredId) => {
    setOrders((prevOrders) => prevOrders.filter((o) => o._id !== enteredId));
  };

  //DELETE ORDER
  const deleteOrderHandler = async (enteredId) => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/orders/${enteredId}`,
        "DELETE",
        null,
        {
          Authorization: "Bearer " + auth.token,
        }
      );
    } catch (err) {}
    onDelete(enteredId);
  };

  return (
    <>
      <div className="admin_wrapper">
        <div className="admin__center animation">
          <div className="flex">
            <h1>Artikli</h1>
            <h2>Ukupno artikala: {products.length}</h2>
            <Button action to="/admin/new">
              <AiOutlineFolderAdd />
              Dodaj Artikal
            </Button>
          </div>
          <div className="product_list">
            {/* ARTIKLI */}
            {products.map((product) => (
              <AdminProductItem
                key={product._id}
                _id={product._id}
                image={product.image}
                title={product.title}
                description={product.description}
                price={product.price}
                category={product.category}
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

          {/* ORDERS */}
          <div className="flex">
            <h1>Porudzbine</h1>
            <h2>Ukupno porudzbina {orders.length}</h2>
          </div>
          <div className="orders_section animation_fast">
            {orders.map((order) => (
              <div key={order._id} className="naslovi">
                <Button danger onClick={() => deleteOrderHandler(order._id)}>
                  Izbrisi
                </Button>
                <h3>Informacije o kupcu</h3>
                <p>
                  Id: <b>{order._id}</b>
                </p>
                <p>
                  Ime: <b>{order.customer.name}</b>
                </p>
                <p>
                  Prezime:<b>{order.customer.surname}</b>
                </p>
                <p>
                  Grad:<b> {order.customer.city}</b>
                </p>
                <p>
                  Drzava:<b>{order.customer.country}</b>
                </p>
                <p>
                  Postanski broj: <b>{order.customer.postalcode}</b>
                </p>
                <p>
                  Telefon: <b> {order.customer.phone}</b>
                </p>
                {order.items.product.map((item) => (
                  <div key={item._id} className="product_info">
                    <h3>Informacije o proizvodu</h3>
                    <p>
                      Ime <b>{item.title}</b>
                    </p>

                    <p>
                      Cena: <b>{item.price} DIN</b>
                    </p>
                    <p>
                      Kolicina:<b> {item.quantity}</b>
                    </p>
                    <p>
                      Velicina: <b>{item.option}</b>
                    </p>
                    <p>
                      Ukupna cena: <b>{item.totalPrice} DIN</b>
                    </p>

                    <img
                      src={`${process.env.REACT_APP_ASSETS_URL}/${item.image}`}
                      alt={item.title}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
