import "./Landing.css";
import Earth from "../assets/earthRotatingGif.gif";


const Landing = () => {
  return (
    <div className="landing__section">
      <h1 className="movie__header">
        <span className="colored__words--white">Starlife Media Library</span>
      </h1>
      <img className="test__img" src={Earth} alt="" /> // Placeholder for a another image png, svg, || gif
      <h1 className="page__header">
        <span className="colored__words--white">Featured Movies</span>
      </h1>
    </div>
  );
};

export default Landing;
