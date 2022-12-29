import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "../../shared/hooks/form-hook";

import Slika from "../../shared/assets/img_hero.png";
import Loader from "../../shared/components/UIelements/Loader";
import Input from "../../shared/components/Form/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validate";
import Button from "../../shared/components/Form/Button";
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    image: Slika,
    title: "Adidas Game",
    description:
      "Adidas Game and Go muški duks sa kapuljačom za trening namenjen je svim sportistima i rekreativcima koji nastavljaju rutinu napolju i kada živa u termometru padne. Zagrevanje po hladnoći više nije problem.",
    price: 1600,
    inStock: "da",
  },

  {
    id: "p2",
    image: Slika,
    title: "Adidas Game ",
    description: "Neki opis.",
    price: 1200,
    inStock: "ne",
  },
];

const UpdateProduct = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const productId = useParams().productId;

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },

      description: {
        value: "",
        isValid: true,
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

  const identifiedProduct = DUMMY_PRODUCTS.find((p) => p.id === productId);

  useEffect(() => {
    if (identifiedProduct) {
      setFormData(
        {
          title: {
            value: identifiedProduct.title,
            isValid: true,
          },

          description: {
            value: identifiedProduct.description,
            isValid: true,
          },

          price: {
            value: identifiedProduct.price,
            isValid: true,
          },

          inStock: {
            value: identifiedProduct.inStock,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedProduct]);

  const productUpdateHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (isLoading) {
    return (
      <div className="center">
        <Loader />
      </div>
    );
  }

  return (
    <form className="create_form" onSubmit={productUpdateHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Naziv"
        placeholders="Naziv"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Unesi validan naziv"
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />

      <Input
        id="desc"
        type="text"
        label="Opis"
        placeholders="Opis"
        validators={[VALIDATOR_MINLENGTH(20)]}
        errorText="Unesi validan opis (20)"
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Input
        id="price"
        element="input"
        type="number"
        label="Cena"
        placeholders="Cena"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Unesi validnu cenu"
        onInput={inputHandler}
        initialValue={formState.inputs.price.value}
        initialValid={formState.inputs.price.isValid}
      />

      <Input
        id="instock"
        element="input"
        type="text"
        label="Na stanju"
        placeholders="Da li je na stanju"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Unesi validan input"
        onInput={inputHandler}
        initialValue={formState.inputs.inStock.value}
        initialValid={formState.inputs.inStock.isValid}
      />

      <Button type="submit" disabled={!formState.isValid}>
        Update
      </Button>
    </form>
  );
};

export default UpdateProduct;
