import { useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";

import ProductList from "../components/ProductList";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import Loader from "../../shared/components/UIelements/Loader";
import Button from "../../shared/components/Form/Button";

const Products = () => {
  // Get http methods from custom http hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  // Store products in state
  const [loadedProducts, setLoadedProducts] = useState([]);
  // Handle products error state, when change category
  const [prodError, setProdError] = useState(false);
  // Categories
  const categoryButtons = ["Trenerke", "Jakne", "Duksevi"];

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products`
        );
        setLoadedProducts(responseData.products);
      } catch (err) {}
    };

    fetchProducts();
  }, []);

  // Fetch products by category
  const fetchProducts = async (category) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/products`
      );
      if (category) {
        const curProducts = responseData.products.filter(
          (product) => product.category === category
        );

        if (curProducts.length === 0) {
          setProdError(true);
        } else {
          setLoadedProducts(curProducts);
        }
      } else {
        setLoadedProducts(responseData.products);
      }
    } catch (err) {}
  };

  // Category function
  const findByCategory = (event, category) => {
    event.preventDefault();
    fetchProducts(category);
  };

  // Category error removed
  const productError = () => {
    setProdError(false);
  };

  return (
    <div className="products_wrapper">
      <div className="prod_banner">
        <h1>AMBI SHOP</h1>
        <p>NASI PROIZVODI</p>
      </div>

      {/* Sidebar for categories */}
      <div className="actions">
        {categoryButtons.map((button) => (
          <Button onClick={(event) => findByCategory(event, button)}>
            {button}
          </Button>
        ))}
      </div>

      {/* Div for handling error, loading and Products */}
      <div>
        <ErrorModal
          show={prodError}
          error="Ne Moze se naci artikal za datu kategoriju"
          onClear={productError}
        />
        <ErrorModal error={error} onClear={clearError} />
        {isLoading && <Loader asOverlay />}
        <ProductList products={loadedProducts} />
      </div>
    </div>
  );
};

export default Products;
