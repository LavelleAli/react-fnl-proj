import "./index.css";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import BrowseMovies from "./pages/BrowseMovies.jsx";
import Login from "./pages/Login.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

function App() {
  const [modalState, setModalState] = useState(false);

  function openModal() {
    setModalState(true);
  }

  function toggleModal() {
    setModalState((prev) => !prev);
  }

  return (
    <Router>
      <div className="App">
        <Nav openModal={openModal} />
        <Routes>
          <Route path="/" element={<Home modalState={modalState} />} />
          <Route path="/browse-movies" element={<BrowseMovies />} />
        </Routes>
        <Login modalState={modalState} toggleModal={toggleModal} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
