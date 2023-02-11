import React from "react";
import { Link } from "react-router-dom";

import Button from "../../shared/components/Form/Button";
import "./ProductItem.css";

// Product card
const ProductItem = (props) => {
  // Get product properties
  const { id, image, title, price } = props;

  return (
    <li className="item">
      <div className="item__image">
        <Link to={`/products/${id}`}>
          <img
            src={`${process.env.REACT_APP_ASSETS_URL}/${image}`}
            alt={title}
          />
        </Link>
      </div>
      <div className="item__text">
        <h1>{title}</h1>
      </div>
      <div className="item__footer">
        <span>
          <p>{price} DIN</p>
        </span>
      </div>
    </li>
  );
};

export default ProductItem;
