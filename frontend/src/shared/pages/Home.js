import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../hooks/http-hook";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom";

import "./Home.css";
import Button from "../components/Form/Button";
import image from "../assets/icon.png";
import imagee from "../assets/ico.png";
import Footer from "../components/Footer/Footer";
import imag from "../assets/icoo.png";

const Home = () => {
  const { sendRequest, isLoading, error, clearError } = useHttpClient();
  const [products, setproducts] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchProd = async () => {
      const res = await sendRequest("http://localhost:8000/api/products/");
      setproducts(res.products);
    };
    fetchProd();
  }, [sendRequest]);

  let someProd = products.slice(0, 4);

  return (
    <>
      <div className="mainpage">
        <div className="text">
          <h1>
            Super povoljne ponude <br />
            <span className="ch"> Za sve proizvode</span>
          </h1>
          <p>Ovdje ćete pronaći širok izbor proizvoda po odličnim cijenama</p>
          <Button to="/products">Kupi sada</Button>
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

      <div className="productSection">
        <h1>Najnoviji Proizvodi</h1>
        <p>Zimska kolekcija</p>
        <div className="productList">
          {someProd.map((item) => (
            <div key={item.id} className="productItem">
              <img src={`http://localhost:8000/${item.image}`} />
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

      <Footer />
    </>
  );
};

export default Home;
