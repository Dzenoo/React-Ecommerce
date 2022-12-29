import React from "react";

import ProductItem from "./ProductItem";

import "./ProductList.css";

const ProductList = (props) => {
  return (
    <ul className="list">
      {props.products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          image={product.image}
          title={product.title}
          description={product.description}
          price={product.price}
          inStock={product.inStock}
        />
      ))}
    </ul>
  );
};

export default ProductList;
