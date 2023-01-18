import React, { useContext, useEffect, useRef, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";

import "./Home.css";
import Button from "../components/Form/Button";
import image from "../assets/ft.png";
import imagee from "../assets/fte.png";
import imag from "../assets/ftt.png";
import Footer from "../components/Footer/Footer";
import sweater from "../assets/zmp.png";

const Home = () => {
  const { sendRequest } = useHttpClient();
  const [products, setproducts] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchProd = async () => {
      const res = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/products`
      );
      setproducts(res.products);
    };
    fetchProd();
  }, [sendRequest]);

  let someProd = products.slice(0, 3);

  return (
    <>
      <div className="mainpage">
        <div className="text">
          <h1>
            Super povoljne ponude <br />
            <span className="ch"> Za sve proizvode</span>
          </h1>
          <p>
            Ovdje ćete pronaći širok izbor visokokvalitetnih proizvoda po
            pristupačnim cijenama. Naš tim je posvećen pružanju odlične usluge
            kupcima i osiguravanju da imate besprijekorno iskustvo kupovine.
            Nudimo brzu i pouzdanu dostavu, jednostavan povrat i siguran proces
            naplate.
          </p>
          <Link to="/products">Kupi sada</Link>
        </div>

        <div className="products_cart">
          <img src={sweater} />
        </div>
      </div>

      <div className="after_hero animation">
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

      <div className="productSection">
        <h1>Najnoviji Proizvodi</h1>
        <p>Zimska kolekcija</p>
        <div className="productList">
          {someProd.map((item) => (
            <div key={item._id} className="productItem">
              <img src={`${process.env.REACT_APP_ASSETS_URL}/${item.image}`} />
              <h1>{item.title}</h1>
              <p>{item.price} DIN</p>
              <Link to={auth.isLoggedIn ? "/products" : "/authenticate"}>
                <AiOutlineShoppingCart size={30} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="ads"></div>

      <div className="newsletter">
        <div>
          <h1>Registruj se</h1>
          <p>
            Ne zaboravite kreirati račun za pristup korpi,
            <br />
            spremanju porudzbina i korištenje posebnih popusta.
          </p>
        </div>

        <div>
          <Button to="/authenticate">Registruj se</Button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
