import "./index.css";
import Nav from "./components/Nav.jsx";
import Home from "./pages/Home.jsx";
import BrowseMovies from "./pages/BrowseMovies.jsx";
import Footer from "./components/Footer.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse-movies" element={<BrowseMovies />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
