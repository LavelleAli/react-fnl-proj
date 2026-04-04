import React, { useState } from "react";
import "./Login.css";
import { login, signup } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Login = ({ modalState, toggleModal, closeModal, forceOpen = false }) => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  
  const user_auth = async (event) => {
    event.preventDefault();
    let isAuthenticated = false;

    if (signState === "Sign In") {
      isAuthenticated = await login(email, password);
    } else {
      isAuthenticated = await signup(name, email, password);
    }

    if (isAuthenticated && closeModal) {
      closeModal();
    }
  };
  
  return (
    <div className={modalState || forceOpen ? "modal modal--open" : "modal"}>
      <div className="modal__backdrop" onClick={forceOpen ? undefined : toggleModal}></div>
      <div className="modal__shell">
        <div className="modal__half login__modal--left">
          <div className="login">
            <h1 className="login__title">
              <span className="colored__words--white loginTitle">
                {signState}
              </span>
            </h1>
            <p className="login__prompt">
              <span className="colored__words--white">
                {signState === "Sign In"
                  ? "Log in to open the movie library."
                  : "Create an account to start watching."}
              </span>
            </p>
            <form>
              {signState === "Sign Up" ? (
                <input value={name} onChange={(e) => {setName(e.target.value); }} type="text" placeholder="Your Name" required  />
              ) : (
                <></>
              )}
              <input value={email} onChange={(e) => {setEmail(e.target.value);  }} type="email" placeholder="Email" required  />
              <input value={password} onChange={(e) => {setPassword(e.target.value); }} type="password"  placeholder="Password" required  />
              <button className="login__btn" onClick={user_auth} type="submit">
                {signState}
              </button>
              <div className="form__help">
                <div className="remember">
                  <input type="checkbox" />
                  <label>
                    <span className="colored__words--white">Remember Me</span>
                  </label>
                  <p>
                    <span className="colored__words--white">Need Help?</span>
                  </p>
                </div>
              </div>
            </form>

            <div className="modal__overlay modal__loading">
              <FontAwesomeIcon
                icon="fa-solid fa-spinner"
                style={{ color: "rgb(255, 239, 181)" }}
              />
            </div>
            <div className="modal__overlay modal__success">
              You have successfully {signState === "Sign In" ? "Signed In" : "Signed Up"}!
            </div>

            {/* Exit modal btn */}
            {forceOpen ? null : (
              <FontAwesomeIcon className="modal__exit" icon="fa-solid fa-xmark" fade style={{ color: "rgb(255, 239, 181)" }} onClick={toggleModal} />
            )}

              {/* Form Switch */}
            <div className="form__switch">
              {signState === "Sign In" ? (
                <p>
                  New User?{" "}
                  <span className="colored__words--white lgsw" onClick={() => {setSignState("Sign Up"); }}>
                    Sign Up Now
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{" "}
                  <span className="colored__words--white lgsw" onClick={() => { setSignState("Sign In");}}>
                    Sign In Now
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
