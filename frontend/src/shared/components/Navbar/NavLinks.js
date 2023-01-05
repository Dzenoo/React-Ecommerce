import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

import Button from "../Form/Button";

import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const auth = useContext(AuthContext);
  const isLoggedIn = auth.isLoggedIn;

  const logout = () => {
    auth.logout();
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
            <NavLink to="/favorites" style={{ textDecoration: "none" }}>
              <AiFillStar />
            </NavLink>
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
