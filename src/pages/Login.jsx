import React, { useState } from "react";
import "./Login.css";
import { login, signup } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "../components/Nav";



const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalState, setModalState] = useState(false);
  
  
  const user_auth = async (event) => {
    event.preventDefault();
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
  };
  

  function toggleModal() {
    setModalState((prevModalState) => !prevModalState);
    
  };

  
  return (
      <div>
      <button className="test__btn" onClick={toggleModal}>Function Test</button>
      <div className={modalState ? "modal modal--open" : "modal"}>
        <div className="modal__half login__modal--left">
            <div className="login">
                <h1 className="login__title">
                    <span className="colored__words--white loginTitle">
                    {signState}
                    </span>
                </h1>
                <form>
                    {signState === "Sign Up" ? (
                        <input value={name} onChange={(e) => { setName(e.target.value);  }} type="text" placeholder="Your Name" required/>
                    ) : (
                        <></>
                    )}
                    <input value={email} onChange={(e) => { setEmail(e.target.value);}} type="email" placeholder="Email" required
                    />
                    <input value={password} onChange={(e) => { setPassword(e.target.value)}} type="password" placeholder="Password" required/>
                    <button className="login__btn" onClick={user_auth} type="submit" >
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
                

                {/* Modal State */}
                <div className="modal__overlay modal__loading">
                    <FontAwesomeIcon icon="fa-solid fa-spinner" style={{color: "rgb(255, 239, 181)",}} />
                </div>
                <div className="modal__overlay modal__success">
                    You have successfully {signState === "Sign In" ? "Signed In" : "Signed Up"}!
                </div>
                <FontAwesomeIcon className='modal__exit' icon="fa-solid fa-xmark" fade style={{color: "rgb(255, 239, 181)",}} onClick={toggleModal} />
                {/* End Modal State */}

                <div className="form__switch">
                    {signState === "Sign In" ? (
                        <p>
                        New User?{" "}
                        <span className="colored__words--white lgsw" onClick={() => { setSignState("Sign Up"); }}>
                            Sign Up Now
                        </span>
                        </p>
                    ) : (
                        <p>
                        Already have an account?{" "}
                        <span className="colored__words--white lgsw" onClick={() => { setSignState("Sign In"); }}>
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
