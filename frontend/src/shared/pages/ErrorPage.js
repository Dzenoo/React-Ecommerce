import React from "react";

import "./ErrorPage.css";

import Errorr from "../assets/errorr.png";

const About = () => {
  return (
    <>
      <h1 className="center">Greska</h1>
      <div className="center">
        <img src={Errorr} alt="errorr" />
      </div>
    </>
  );
};

export default About;
