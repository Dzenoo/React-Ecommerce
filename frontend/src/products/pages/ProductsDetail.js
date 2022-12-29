import React from "react";

import ProductDetails from "../components/ProductDetails";

import Slika from "../../shared/assets/sweater.png";
const DUMMY_PRODUCTS = [
  {
    id: "p1",
    image: Slika,
    title: "Adidas Game",
    description:
      "Adidas Game and Go muški duks sa kapuljačom za trening namenjen je svim sportistima i rekreativcima koji nastavljaju rutinu napolju i kada živa u termometru padne. Zagrevanje po hladnoći više nije problem.",
    price: 1623,
    inStock: "ne",
  },

  {
    id: "p2",
    image: Slika,
    title: "Adidas Game ",
    description:
      "Adidas Game and Go muški duks sa kapuljačom za trening namenjen je svim sportistima i rekreativcima koji nastavljaju rutinu napolju i kada živa u termometru padne. Zagrevanje po hladnoći više nije problem.",
    price: 1200,
    inStock: "da",
  },
];

const ProductsDetail = () => {
  return <ProductDetails productsDetail={DUMMY_PRODUCTS} />;
};

export default ProductsDetail;
