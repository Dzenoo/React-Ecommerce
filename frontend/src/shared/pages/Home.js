import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../shared/context/auth-context";
import Footer from "../components/Footer/Footer";
import image from "../../shared/assets/ico.png";
import imagee from "../../shared/assets/icon.png";
import imag from "../../shared/assets/icoo.png";
import img1 from "../../shared/assets/1.png";
import img3 from "../../shared/assets/2.png";
import img2 from "../../shared/assets/3.png";
import hero_img from "../../shared/assets/sli.png";
import "./Home.css";

const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <div className="mainpage">
        <div className="mainpage_sidebar">
          <div className="sidebar_list">
            <div className="line_div">
              <hr />
              <p>Ponuda</p>
            </div>
            <div className="item_sidebar iteO">
              <img src={img2} alt="img2" />
            </div>
            <div className="item_sidebar iteT">
              <img src={img1} alt="img1" />
            </div>
            <div className="item_sidebar iteW">
              <img src={img3} alt="img3" />
            </div>
            <div className="line_div">
              <hr />
            </div>
          </div>
        </div>
        <div className="mainpage_hero">
          <div className="text animationText">
            <h3>Pronađite svoju savršenu već danas</h3>
            <h1> Super povoljne ponude za sve proizvode</h1>
            <p>
              Ovdje ćete pronaći širok izbor visokokvalitetnih proizvoda po
              pristupačnim cijenama. Naš tim je posvećen pružanju odlične usluge
              kupcima i osiguravanju da imate besprijekorno iskustvo kupovine.
              Nudimo brzu i pouzdanu dostavu, jednostavan povrat i siguran
              proces naplate.
            </p>
            <div className="actions_hero">
              <Link className="btn1" to="/products">
                Kupi Sada
              </Link>
              {!authCtx.isLoggedIn && (
                <Link className="btn2" to="/authenticate">
                  Prijavi Se
                </Link>
              )}
            </div>
            <hr />
          </div>
          <div className="hero_imag">
            <img src={hero_img} alt="heroimg" className="animationImg" />
          </div>
        </div>
      </div>
      <div className="after_hero">
        <div className="itemIcon">
          <img src={image} alt="icon1" />
          <h1>Online naručivanje</h1>
        </div>
        <div className="itemIcon">
          <img src={imagee} alt="icon2" />
          <h1>Uspesna kupovina</h1>
        </div>
        <div className="itemIcon">
          <img src={imag} alt="icon3" />
          <h1>Podrška na mreži</h1>
        </div>
      </div>

      {!authCtx.isLoggedIn && (
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
            <Link to="/authenticate">Registruj se</Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
