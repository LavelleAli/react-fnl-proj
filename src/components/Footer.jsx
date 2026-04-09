import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.css";

const Footer = () => {
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const updateArrowPosition = () => {
      const scrollTop = window.scrollY;
      const viewportBottom = scrollTop + window.innerHeight;
      const pageBottom = document.documentElement.scrollHeight;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = viewportBottom >= pageBottom - 1;

      setIsFloating(!isAtTop && !isAtBottom);
    };

    updateArrowPosition();
    window.addEventListener("scroll", updateArrowPosition);
    window.addEventListener("resize", updateArrowPosition);

    return () => {
      window.removeEventListener("scroll", updateArrowPosition);
      window.removeEventListener("resize", updateArrowPosition);
    };
  }, []);

  return (
    <div>
      <footer className="footer__container">
        <div className="container">
          <div className="row">
            <div className="footer__media">
              <div className="footer__links">
                <span className="colored__words--white">© Lavelle Ali 2026</span>
                <a
                  href="#nav"
                  className={`footer__arrow-link ${isFloating ? "footer__arrow-link--floating" : ""}`}
                >
                  <FontAwesomeIcon
                    icon="fa-solid fa-arrow-up"
                    bounce
                    className="footer__arrow-icon"
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
