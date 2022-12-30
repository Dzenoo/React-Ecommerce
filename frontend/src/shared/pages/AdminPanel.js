import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { AiOutlineFolderAdd } from "react-icons/ai";

import Button from "../components/Form/Button";
import Modal from "../components/UIelements/Modal";

import "./AdminPanel.css";

import Slika from "../../shared/assets/img_hero.png";
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    image: Slika,
    title: "Adidas Game",
    price: "6.239",
  },

  {
    id: "p2",
    image: Slika,
    title: "Adidas Game ee ",
    price: "6.239",
  },
];

const DUMMY_USERS = [
  {
    id: "u1",
    title: "Dzenis",
  },

  {
    id: "u2",
    title: "Imran",
  },
];

const AdminPanel = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openErrorModal = () => {
    setModalIsOpen(true);
  };

  const closeErrorModal = () => {
    setModalIsOpen(false);
  };

  const confirmDeleteHandler = () => {
    setModalIsOpen(false);
    console.log("DELETING");
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
            {/* DELETE MODAL*/}
            <Modal
              show={modalIsOpen}
              onCancel={closeErrorModal}
              header="Da li ste sigurni?"
              footer={
                <>
                  <Button inverse onClick={closeErrorModal}>
                    Otkazi
                  </Button>
                  <Button danger onClick={confirmDeleteHandler}>
                    Izbrisi
                  </Button>
                </>
              }
            >
              <h1>Da li ste sigurni da izbrisete artikal?</h1>
            </Modal>

            {DUMMY_PRODUCTS.map((product) => (
              <div className="product_item" key={product.id}>
                <img src={product.image} />

                <div className="btns">
                  <h1>{product.title}</h1>
                  <span className="checkspan">{product.price} DIN</span>
                </div>

                <div className="btns">
                  <Button to={`/admin/${product.id}`}>
                    <AiFillEdit />
                    Izmeni
                  </Button>
                  <Button danger onClick={openErrorModal}>
                    <AiFillDelete />
                    Izbrisi
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* USERS LIST */}

          <div className="flex">
            <h1>Korisnici</h1>
          </div>
          <div className="users_list" id="user_section">
            {DUMMY_USERS.map((user) => (
              <div className="user_item" key={user.id}>
                <CgProfile size={30} />
                <h1>{user.title}</h1>
              </div>
            ))}
          </div>

          <div className="flex">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
