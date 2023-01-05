import React, { useContext } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validate";

import Button from "../../shared/components/Form/Button";
import Input from "../../shared/components/Form/Input";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import Loader from "../../shared/components/UIelements/Loader";
import ImageUpload from "../../shared/components/Form/ImageUpload";

const CreateProduct = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      image: {
        value: null,
        isValid: false,
      },
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
      category: {
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
      const formData = new FormData();
      formData.append("image", formState.inputs.image.value);
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("price", formState.inputs.price.value);
      formData.append("category", formState.inputs.category.value);
      formData.append("inStock", formState.inputs.inStock.value);
      await sendRequest(
        "http://localhost:8000/api/products/new",
        "POST",
        formData,
        { Authorization: "Bearer " + auth.token }
      );
      navigate("/admin");
    } catch (error) {}
  };

  return (
    <div className="main">
      <ErrorModal error={error} onClear={clearError} />
      <form className="create_form" onSubmit={productSubmitHandler}>
        {isLoading && <Loader asOverlay />}
        <ImageUpload
          id="image"
          onInput={inputHandler}
          errorText="Unesite validnu sliku"
        />

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
          id="category"
          element="input"
          type="text"
          label="Kategorija"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Unesite validnu kategoriju"
          onInput={inputHandler}
          placeholder="Kategorija Artikla"
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
