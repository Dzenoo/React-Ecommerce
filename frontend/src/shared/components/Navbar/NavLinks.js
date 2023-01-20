import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { AuthContext } from "../../context/auth-context";

import Button from "../Form/Button";
import "./NavLinks.css";

const NavLinks = (props) => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const auth = useContext(AuthContext);
  const isLoggedIn = auth.isLoggedIn;
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate("/");
    localStorage.removeItem("cart");
    localStorage.removeItem("subTotal");
  };

  return (
    <>
      {isLoggedIn && (
        <NavLink to="/admin" className="hide">
          ad
        </NavLink>
      )}
      <ul className="menu">
        {/* Always Reachable */}
        <li>
          <NavLink to="/">Pocetna</NavLink>
        </li>

        <li>
          <NavLink to="/products">Artikli</NavLink>
        </li>

        {/* Authenticated */}
        {isLoggedIn && (
          <li className="bar">
            <NavLink to="/cart" style={{ textDecoration: "none" }}>
              <AiOutlineShoppingCart />
            </NavLink>
            <span>{totalQty}</span>
          </li>
        )}

        {isLoggedIn && (
          <li className="bar">
            <Link
              to={`/${auth.userId}/favorites`}
              style={{ textDecoration: "none" }}
            >
              <AiOutlineHeart />
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <Button inverse onClick={logout}>
            Izloguj se
          </Button>
        )}

        {/* to="/authenticate" */}
        {!isLoggedIn && (
          <Button inverse to="/authenticate">
            Uloguj se
          </Button>
        )}
      </ul>
    </>
  );
};

export default NavLinks;
