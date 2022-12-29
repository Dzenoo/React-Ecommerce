import React from "react";

import Input from "../../shared/components/Form/Input";
import Button from "../../shared/components/Form/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validate";
import { useForm } from "../../shared/hooks/form-hook";

const CreateProduct = () => {
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

  const productSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <div className="main">
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
          id="instock"
          type=""
          label="Na Stanju"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          placeholder="Na stanju"
          errorText="Unesite odgovarajucu vrednost"
          onInput={inputHandler}
        />

        <Button type="submit" disabled={!formState.isValid}>
          Kreiraj
        </Button>
      </form>
    </div>
  );
};

export default CreateProduct;
