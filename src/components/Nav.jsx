import { Link } from "react-router-dom";
import "./Nav.css";
import React, { useState } from "react";



const Nav = () => {
  const [modalState, setModalState] = useState(false);

  function toggleModal() {
    setModalState((prevModalState) => !prevModalState);
    
  };

  

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
                  <Link to="/login">
                  <button className="home__btn nav__link" onClick={toggleModal}>
                    <span className="colored__words--white">
                      Login
                    </span>
                  </button>
                  
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
