import { createContext } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [errorProduct, setErrorProduct] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/products`
        );
        setProducts(responseData.products);
      } catch (err) {}
    };

    fetchProducts();
  }, []);

  const fetchProductsByCategory = async (category) => {
    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/products`
      );
      let curProducts = [...responseData.products];
      if (category) {
        curProducts = curProducts.filter(
          (product) => product.category === category
        );

        if (curProducts.length === 0) {
          setErrorProduct(true);
        } else {
          setProducts(curProducts);
        }
      }
    } catch (err) {}
  };

  const sortByPrice = () => {
    const sortedProducts = [...products].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
    setProducts(sortedProducts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        fetchProductsByCategory,
        errorProduct,
        sortByPrice,
        sortOrder,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
