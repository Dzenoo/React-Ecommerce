import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import Loader from "../../shared/components/UIelements/Loader";
import ProductDetails from "../components/ProductDetails";

const ProductsDetail = () => {
  // Get http methods from custom http hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // Store product in state
  const [loadedProduct, setLoadedProduct] = useState([]);
  // Get product by id from params
  const productId = useParams().pid;

  // Fetch product by id
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products/${productId}`
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
