import starlit_background from "../assets/starlit_background.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Nav.css";


const Nav = () => {

  return (
    <div>
      <section id="nav">
        <div className="container">
          <div className="row">
            <div className="nav__box">
              <ul className="nav__list">
                <li className="nav__item">
                  <Link className="nav__link home__link" to="/">
                    <button className="home__btn nav__link">
                      <span className="colored__words--white">
                        <FontAwesomeIcon
                          icon="fa-solid fa-house"
                          bounce
                          style={{ color: "rgb(255, 212, 59)" }}
                        />
                        Home
                      </span>
                    </button>
                  </Link>
                </li>
                <li className="nav__item">
                  <Link className="home__btn nav__link brow__link" to="/browse-movies">
                    <span className="colored__words--white">
                      <i className="fa-solid fa-eye fa-bounce"></i>
                      <FontAwesomeIcon
                        icon="fa-solid fa-eye"
                        bounce
                        style={{ color: "rgb(255, 212, 59)" }}
                      />
                      Browse Movies
                    </span>
                  </Link>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Nav;
