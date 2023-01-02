import React, { useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import Button from "../../shared/components/Form/Button";
import Modal from "../../shared/components/UIelements/Modal";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import Loader from "../../shared/components/UIelements/Loader";

import "./AdminProductItem.css";

const AdminProductItem = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { _id, image, title, description, price, inStock } = props;
  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  const openErrorModal = () => {
    setModalIsOpen(true);
  };

  const closeErrorModal = () => {
    setModalIsOpen(false);
  };

  const confirmDeleteHandler = async () => {
    setModalIsOpen(false);
    try {
      await sendRequest(`http://localhost:8000/api/products/${_id}`, "DELETE");
      props.onDelete(_id);
    } catch (err) {}
  };

  return (
    <>
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
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
      <div className="product_item" key={_id}>
        <img src={image} alt={title} />

        <div>
          <h1>Naziv: {title}</h1>
          <h2>Na stanju: {inStock}</h2>
          <span className="checkspan">Cena: {price} DIN</span>
          <p>Opis: {description}</p>
        </div>

        <div className="btns">
          <Button to={`/admin/${_id}`}>
            <AiFillEdit />
            Izmeni
          </Button>
          <Button danger onClick={openErrorModal}>
            <AiFillDelete />
            Izbrisi
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminProductItem;
