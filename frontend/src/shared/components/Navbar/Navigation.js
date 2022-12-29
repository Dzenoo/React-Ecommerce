import React, { useState } from "react";

import NavLinks from "./NavLinks";
import ResponsiveNav from "./ResponsiveNav";
import Backdrop from "../UIelements/Backdrop";

import { BiMenuAltLeft } from "react-icons/bi";
import logo from "../../assets/logo.png";
import "./Navigation.css";

const Navigation = (props) => {
  const [navIsOpen, setNavIsOpen] = useState(false);

  const openNav = () => {
    setNavIsOpen(true);
  };

  const closeNav = () => {
    setNavIsOpen(false);
  };

  return (
    <div className="main_navigation">
      {/* Main Navigation */}
      <BiMenuAltLeft cursor="pointer" className="menu-btn" onClick={openNav} />
      <img src={logo} width={160} height={160} />
      <div className="nav">
        <NavLinks name={props.name} />
      </div>

      {/* Responsive Navigation */}
      {navIsOpen && <Backdrop onClick={closeNav} />}
      <ResponsiveNav show={navIsOpen} onClick={closeNav}>
        <NavLinks name={props.name} />
      </ResponsiveNav>
    </div>
  );
};

export default Navigation;
