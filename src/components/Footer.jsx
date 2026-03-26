import starlit_background from '../assets/starlit_background.gif'
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer__container">
        {/* <img className="starlight01" src={starlit_background} alt="" /> */}
        <div className="container">
          <div className="row">
            <div className="footer__media">
              © Lavelle Ali 2026
              <div className="footer__links">
                <a href="#nav">
                  <i
                    className="fa-notdog fa-solid fa-arrow-up fa-bounce"
                    //   style="color: rgb(255, 231, 145)"
                  ></i>
                  <FontAwesomeIcon
                    icon="fa-solid fa-arrow-up"
                    bounce
                    style={{ color: "rgb(255, 212, 59)" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
