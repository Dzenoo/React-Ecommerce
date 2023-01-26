import React from "react";

import ProductItem from "./ProductItem";

import "./ProductList.css";

// Product card wrapper
const ProductList = ({ products }) => {
  return (
    <ul className="list">
      {products.map((product) => (
        <ProductItem
          key={product._id}
          id={product._id}
          image={product.image}
          title={product.title}
          description={product.description}
          price={product.price}
          category={product.category}
          inStock={product.inStock}
        />
      ))}
    </ul>
  );
};

export default ProductList;
