import React from "react";

import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer_list">
        <div className="footer_img">
          <h1 style={{ color: "#fff" }}>AMBI</h1>
          <p>
            Ova aplikacija za elektronsko trgovanje je vlasništvo Ambi. Sva
            prava zadržana. Svi proizvodi i cene navedeni na aplikaciji su
            informativnog karaktera i podložni su promenama bez prethodnog
            obaveštenja. Molimo proverite dostupnost proizvoda i tačnu cenu pri
            kupovini. Ambi se trudi da bude što precizniji u opisima proizvoda,
            ali ne garantujemo da su svi opisi potpuno tačni, kompletni i
            ažurni. Ne snosimo odgovornost za eventualne greške ili propuste u
            opisima proizvoda
          </p>
        </div>

        <div className="footer_item ">
          <h1 style={{ color: "#fff" }}>Kupovina</h1>
          <Link>Uslovi koriscenja</Link>
          <p> Telefon: +381 063 063 063</p>
          <p>Zapratite nas</p>
        </div>

        <div className="footer_item ">
          <h1 style={{ color: "#fff" }}>Kontakt</h1>
          <p> Adresa: Novi Pazar, Srbija</p>
          <p> Telefon: +381 063 063 063</p>
          <p>Zapratite nas</p>
        </div>
      </div>

      <p style={{ textAlign: "center", fontSize: "1.6rem" }}>
        Copyright Ambi &copy; 2022
      </p>
    </>
  );
};

export default Footer;
