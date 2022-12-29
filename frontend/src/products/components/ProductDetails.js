import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../../shared/components/Form/Button";

import "./ProductDetails.css";

const SKU = [
  {
    label: "XS",
    val: "XS",
  },
  {
    label: "S",
    val: "S",
  },
  {
    label: "M",
    val: "M",
  },
  {
    label: "L",
    val: "L",
  },
  {
    label: "XL",
    val: "XL",
  },
  {
    label: "XXL",
    val: "XXL",
  },
];

const ProductDetails = (props) => {
  const [option, setOption] = useState();

  const productId = useParams().pid;
  let productContent = props.productsDetail.find((p) => p.id === productId);

  const { title, image, description, price, inStock } = productContent;

  let isInStock;
  let isAllowedToBuy = false;

  switch (inStock) {
    case "ne":
      {
        isInStock = <h4 className="stc-red">Nije na stanju</h4>;
        isAllowedToBuy = false;
      }
      break;

    case "da": {
      isInStock = <h4 className="stc-green">Na stanju</h4>;
      isAllowedToBuy = true;
    }
  }

  return (
    <div className="product_details_container">
      <div className="product_details_image">
        <img src={image} alt={title} />
      </div>

      <div className="product_details_content">
        <div className="content_top">
          <h1>{title}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "2em" }}>
            <span>{price} DIN</span> |{isInStock}
          </div>

          <p>{description}</p>
        </div>

        <div className="content_mid">
          <select value={option} onChange={(e) => setOption(e.target.value)}>
            {SKU.map((size) => (
              <option>{size.label}</option>
            ))}
          </select>
          <h1>{option}</h1>
        </div>

        <div className="content_bottom">
          {isAllowedToBuy && <Button>Dodaj u korpu</Button>}
          <Button>Dodaj na listu zelja</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
