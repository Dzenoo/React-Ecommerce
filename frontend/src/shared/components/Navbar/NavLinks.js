import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AuthActions } from "../../redux/auth-slice";

import Button from "../Form/Button";
import UserItem from "../../../user/components/UserItem";

import "./NavLinks.css";

const NavLinks = (props) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const logout = () => {
    dispatch(AuthActions.logout());
  };

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

        <li>
          <Link to="/about">O nama</Link>
        </li>

        {/* Authenticated */}
        {isLoggedIn && (
          <li className="cart_bar">
            <AiOutlineShoppingCart />
            <span>2</span>
          </li>
        )}

        {isLoggedIn && <UserItem name="Dzenis" />}

        {/* Admin */}

        {isLoggedIn && (
          <li>
            <Link to="/admin">Admin panel</Link>
          </li>
        )}

        {/* to="/authenticate" */}
        {!isLoggedIn && <Button to="/authenticate">Uloguj se</Button>}

        {isLoggedIn && (
          <li>
            {/* to="/" */}
            <Button onClick={logout}>Izloguj se</Button>
          </li>
        )}
      </ul>
    </>
  );
};

export default NavLinks;
