import React from "react";

import "./Home.css";
import Button from "../components/Form/Button";
import image from "../assets/icon.png";
import imagee from "../assets/ico.png";
import imag from "../assets/icoo.png";

const Home = () => {
  return (
    <>
      <div className="mainpage">
        <div className="text">
          <h1>
            Super povoljne ponude <br />
            <span className="ch"> Za sve proizvode</span>
          </h1>
          <p>Ovdje ćete pronaći širok izbor proizvoda po odličnim cijenama</p>
          <Button>Kupi sada</Button>
        </div>
      </div>

      <div className="after_hero">
        <div className="item">
          <img src={image} />
          <h1>Online naručivanje</h1>
        </div>
        <div className="item">
          <img src={imagee} />
          <h1>Uspesna kupovina</h1>
        </div>
        <div className="item">
          <img src={imag} />
          <h1>Podrška na mreži</h1>
        </div>
      </div>

      <div className="newsletter">
        <div>
          <h1>Registruj se</h1>
          <p>
            Ne zaboravite kreirati račun za pristup historiji narudžbi,
            <br />
            spremanje artikala na svoju listu želja i korištenje posebnih
            popusta.
          </p>
        </div>

        <div>
          <Button to="/authenticate">Registruj se</Button>
        </div>
      </div>
    </>
  );
};

export default Home;
