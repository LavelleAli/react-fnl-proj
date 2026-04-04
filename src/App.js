import "./index.css";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import BrowseMovies from "./pages/BrowseMovies.jsx";
import Login from "./pages/Login.jsx";
import Player from "./pages/Player.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, logout } from "./firebase";

function App() {
  const [modalState, setModalState] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  function openModal() {
    setModalState(true);
  }

  function toggleModal() {
    setModalState((prev) => !prev);
  }

  function closeModal() {
    setModalState(false);
  }

  async function handleLogout() {
    await logout();
    setModalState(false);
  }

  function renderAuthPrompt(message) {
    return (
      <div className="auth__prompt">
        <h2 className="auth__prompt--title">
          <span className="colored__words--white">{message}</span>
        </h2>
        <button className="home__btn auth__prompt--button" onClick={openModal}>
          <span className="colored__words--white">Log In To Continue</span>
        </button>
      </div>
    );
  }

  if (authLoading) {
    return <div className="auth__loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        <Nav openModal={openModal} currentUser={currentUser} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<Home modalState={modalState} />} />
          <Route path="/browse-movies" element={<BrowseMovies />} />
          <Route
            path="/movie/:id"
            element={
              currentUser
                ? <MovieDetails />
                : renderAuthPrompt("Log in to view movie details.")
            }
          />
          <Route
            path="/player/:id"
            element={
              currentUser
                ? <Player />
                : renderAuthPrompt("Log in to play movies.")
            }
          />
        </Routes>
        <Login modalState={modalState} toggleModal={toggleModal} closeModal={closeModal} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
