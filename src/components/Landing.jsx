import "./Landing.css";
import SearchResults from "./SearchResults";
import starlit_background from '../assets/starlit_background.gif'

const Landing = () => {
  

  return (
    <div className='landing__section'>
      <img className="starlight01" src={starlit_background} alt="" />
      <h1 className="movie__header">
        <span className="colored__words--white">Starlife Media Library</span>
      </h1>
      <SearchResults />
    </div>
  );
};

export default Landing;
