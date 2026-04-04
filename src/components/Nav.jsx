import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = ({ openModal, currentUser, onLogout }) => {
  return (
    <div>
      <section id="nav">
        <div className="container">
          <div className="row">
            <div className="nav__box">
              <ul className="nav__list">
                <li className="nav__item">
                  <Link 
                    className="nav__link home__link" 
                    to="/">
                    <button className="home__btn nav__link">
                      <span className="colored__words--white">
                       
                        Home
                      </span>
                    </button>
                  </Link>
                </li>
                <li className="nav__item">
                  <Link
                    className="home__btn nav__link brow__link"
                    to="/browse-movies"
                  >
                    <span className="colored__words--white">
                      Browse Movies
                    </span>
                  </Link>
                </li>
                
                <li className="nav__item">
                  {currentUser ? (
                    <button className="home__btn nav__link" onClick={onLogout}>
                      <span className="colored__words--white">
                        Logout
                      </span>
                    </button>
                  ) : (
                    <button className="home__btn nav__link" onClick={openModal}>
                      <span className="colored__words--white">
                        Login
                      </span>
                    </button>
                  )}
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
