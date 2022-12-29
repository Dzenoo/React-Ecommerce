import React from "react";
import ProductList from "../components/ProductList";

import Slika from "../../shared/assets/sweater.png";
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
    description:
      "Adidas Game and Go muški duks sa kapuljačom za trening namenjen je svim sportistima i rekreativcima koji nastavljaju rutinu napolju i kada živa u termometru padne. Zagrevanje po hladnoći više nije problem.",
    price: 2000,
    inStock: "ne",
  },
];

const Products = () => {
  return (
    <div>
      <ProductList products={DUMMY_PRODUCTS} />
    </div>
  );
};

export default Products;
