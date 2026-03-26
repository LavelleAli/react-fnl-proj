import starlit_background from '../assets/starlit_background.gif'
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <footer className="footer__container">
        <div className="container">
          <div className="row">
            <div className="footer__media">
              <div className="footer__links">
              <span className="colored__words--white">© Lavelle Ali 2026</span>
                <a href="#nav">
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
