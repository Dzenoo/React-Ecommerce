import React, { useEffect, useState } from "react";

import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import Loader from "../../shared/components/UIelements/Loader";
import ProductDetails from "../components/ProductDetails";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

const ProductsDetail = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProduct, setLoadedProduct] = useState([]);
  const productId = useParams().pid;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/products/${productId}`
        );
        setLoadedProduct(responseData.product);
      } catch (err) {}
    };

    fetchProducts();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <Loader asOverlay />}
      <ProductDetails productDetail={loadedProduct} />
    </>
  );
};

export default ProductsDetail;
