import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

import Navigation from "./shared/components/Navbar/Navigation";
import Loader from "./shared/components/UIelements/Loader";

const Favorites = React.lazy(() => import("./cart/pages/Favorites"));
const Checkout = React.lazy(() => import("./cart/pages/Checkout"));
const Cart = React.lazy(() => import("./cart/pages/CartPage"));
const Products = React.lazy(() => import("./products/pages/Products"));
const AdminPanel = React.lazy(() => import("./admin/pages/AdminPanel"));
const Home = React.lazy(() => import("./shared/pages/Home"));
const ErrorPage = React.lazy(() => import("./shared/pages/ErrorPage"));
const Auth = React.lazy(() => import("./user/pages/Auth"));
const CreateProduct = React.lazy(() =>
  import("./products/pages/CreateProduct")
);
const UpdateProduct = React.lazy(() =>
  import("./products/pages/UpdateProduct")
);
const ProductDetail = React.lazy(() =>
  import("./products/pages/ProductsDetail")
);

function App() {
  const { token, login, logout, userId, user } = useAuth();

  let routes;
  if (token) {
    if (user && user.isAdmin) {
      routes = (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:pid" element={<ProductDetail />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/new" element={<CreateProduct />} />
          <Route path="/admin/:productId" element={<UpdateProduct />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      );
    } else {
      routes = (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart/checkout" element={<Checkout />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:pid" element={<ProductDetail />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      );
    }
  } else {
    routes = (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:pid" element={<ProductDetail />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/authenticate" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Navigation />
      <main>
        <Suspense
          fallback={
            <div className="center">
              <Loader />
            </div>
          }
        >
          <Routes>{routes}</Routes>
        </Suspense>
      </main>
    </AuthContext.Provider>
  );
}

export default App;
