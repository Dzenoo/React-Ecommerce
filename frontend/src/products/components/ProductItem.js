import React from "react";

import Card from "../../shared/components/UIelements/Card";
import Button from "../../shared/components/Form/Button";
import "./ProductItem.css";

const ProductItem = (props) => {
  const { id, image, title, price, description } = props;

  return (
    <Card>
      <li className="item">
        <div className="item__image">
          <img src={image} alt={title} />
        </div>

        <div className="item__text">
          <h1>{title}</h1>
        </div>

        <div className="item__desc">
          <p>{description}</p>
        </div>

        <div className="item__footer">
          <span>
            <p>{price} DIN</p>
          </span>

          <Button to={`/products/${id}`}>Vidi vise</Button>
        </div>
      </li>
    </Card>
  );
};

export default ProductItem;
