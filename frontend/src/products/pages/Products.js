import React, { useEffect, useState } from "react";
import ProductList from "../components/ProductList";

import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import Loader from "../../shared/components/UIelements/Loader";

const Products = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/products/"
        );
        setLoadedProducts(responseData.products);
      } catch (err) {}
    };

    fetchProducts();
  }, [sendRequest]);

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
      <ProductList products={loadedProducts} />
    </div>
  );
};

export default Products;
