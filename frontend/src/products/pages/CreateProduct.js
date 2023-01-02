import React from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";

import Input from "../../shared/components/Form/Input";
import Button from "../../shared/components/Form/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validate";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import Loader from "../../shared/components/UIelements/Loader";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      inStock: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  let formIsValid = false;
  if (formState.inputs.isValid) {
    formIsValid = true;
  }

  const productSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        "http://localhost:8000/api/products/new",
        "POST",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          price: formState.inputs.price.value,
          inStock: formState.inputs.inStock.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      navigate("/admin");
    } catch (error) {}
  };

  return (
    <div className="main">
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
      <form className="create_form" onSubmit={productSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Naziv"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Unesite validan naziv"
          onInput={inputHandler}
          placeholder="Naziv Artikla"
        />
        <Input
          id="description"
          type="text"
          label="Opis"
          validators={[VALIDATOR_MINLENGTH(20)]}
          errorText="Unesite validan opis"
          placeholder="Opis Artikla"
          onInput={inputHandler}
        />
        <Input
          id="price"
          type="number"
          label="Cena"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Unesite validnu cenu"
          placeholder="Cena Artikla"
          onInput={inputHandler}
        />
        <Input
          id="inStock"
          type="text"
          label="Na Stanju"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          placeholder="Na stanju"
          errorText="Unesite odgovarajucu vrednost"
          onInput={inputHandler}
        />

        <Button type="submit">Kreiraj</Button>
      </form>
    </div>
  );
};

export default CreateProduct;
