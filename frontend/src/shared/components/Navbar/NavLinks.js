import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

import Button from "../Form/Button";
import UserItem from "../../../user/components/UserItem";

import "./NavLinks.css";

const NavLinks = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const totalQty = useSelector((state) => state.cart.totalQuantity);

  return (
    <>
      <ul className="menu">
        {/* Always Reachable */}
        <li>
          <Link to="/">Pocetna</Link>
        </li>

        <li>
          <Link to="/products">Artikli</Link>
        </li>

        {/* Authenticated */}
        {isLoggedIn && (
          <li className="bar">
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <AiOutlineShoppingCart />
            </Link>
            <span>{totalQty}</span>
          </li>
        )}

        {isLoggedIn && (
          <li className="bar">
            <Link to="/favorites" style={{ textDecoration: "none" }}>
              <AiFillStar />
            </Link>
          </li>
        )}

        {isLoggedIn && <UserItem name="Dzenis" />}

        {/* Admin */}

        {isLoggedIn && (
          <li>
            <Link to="/admin">Admin</Link>
          </li>
        )}

        {/* to="/authenticate" */}
        {!isLoggedIn && <Button to="/authenticate">Uloguj se</Button>}
      </ul>
    </>
  );
};

export default NavLinks;
