import { useContext, useState } from "react";
import { ProductContext } from "../../shared/context/product-context";
import ProductList from "../components/ProductList";

const Products = () => {
  const categoryButtons = ["Trenerke", "Jakne", "Duksevi"];
  const productCtx = useContext(ProductContext);

  const findByCategory = (event, category) => {
    event.preventDefault();
    productCtx.fetchProductsByCategory(category);
  };

  return (
    <>
      <div className="products_container">
        <div className="filters">
          <div className="category">
            <h2>Kategorije</h2>
            {categoryButtons.map((button) => (
              <button
                key={button}
                onClick={(event) => findByCategory(event, button)}
              >
                {button}
              </button>
            ))}
          </div>

          <div className="sort">
            <h2>Sortiraj po ceni</h2>
            <button onClick={productCtx.sortByPrice}>
              {productCtx.sortOrder === "asc" ? "Rastuće" : "Padajuće"}
            </button>
          </div>
        </div>
        <div className="products">
          <h1 style={{ textAlign: "center", color: "#fff" }}>
            Istaknuti Proizvodi
          </h1>
          <ProductList products={productCtx.products} />
        </div>
      </div>
    </>
  );
};

export default Products;
