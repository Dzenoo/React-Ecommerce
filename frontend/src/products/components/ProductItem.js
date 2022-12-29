import React from "react";

import Card from "../../shared/components/UIelements/Card";
import Button from "../../shared/components/Form/Button";
import "./ProductItem.css";

const ProductItem = (props) => {
  const { id, image, title, price, description, inStock } = props;

  let stockContent;
  if (inStock === "ne") {
    stockContent = <h3 className="stc_red">Nije Na stanju</h3>;
  } else if (inStock === "da") {
    stockContent = <h3 className="stc_green">Na stanju</h3>;
  }

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
            <p>{price}</p> RSD
          </span>

          {/* Prikazi detalje */}
          <Button to={`/products/${id}`}>Vidi vise</Button>
        </div>
      </li>
    </Card>
  );
};

export default ProductItem;
