import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import Navigation from "./shared/components/Navbar/Navigation";
import Loader from "./shared/components/UIelements/Loader";

const Cart = React.lazy(() => import("./cart/pages/CartPage"));
const Products = React.lazy(() => import("./products/pages/Products"));
const AdminPanel = React.lazy(() => import("./shared/pages/AdminPanel"));
const Home = React.lazy(() => import("./shared/pages/Home"));
const About = React.lazy(() => import("./shared/pages/About"));
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
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = true;

  let routes;
  if (!isLoggedIn) {
    routes = (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:pid" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/authenticate" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:pid" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/admin"
          element={isAdmin ? <AdminPanel /> : <h1>Not allowed</h1>}
        />
        <Route
          path="/admin/new"
          element={isAdmin ? <CreateProduct /> : <h1>Not allowed</h1>}
        />
        <Route
          path="/admin/:productId"
          element={isAdmin ? <UpdateProduct /> : <h1>Not allowed</h1>}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </>
    );
  }

  return (
    <main>
      <Navigation />
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
  );
}

export default App;
