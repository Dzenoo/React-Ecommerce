import React from "react";

import "./Footer.css";
import logo from "../../assets/logo.png";
import Button from "../Form/Button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer_list">
        <img src={logo} alt="logo" />
        <div className="footer_item img">
          <h3>Kontakt</h3>
          <p> Adresa: Novi Pazar, Srbija</p>
          <p> Telefon: +381 063 063 063</p>
          <p>Zapratite nas</p>
        </div>

        <div className="footer_item">
          <h3>Moj Profil</h3>
          <ul>
            <Link to="/authenticate">Uloguj se</Link>
            <Link to="/cart">Korpa</Link>
            <Link to="/favorites">Lista zelja</Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
