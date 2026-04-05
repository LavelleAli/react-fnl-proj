import Landing from "../components/Landing";
import MovieShowcase from "../components/MovieShowcase";
// import "./Home.css";

const Home = ({ modalState }) => {
  return (
    <>
      <Landing />
      {/* <SearchResults /> */}
      <MovieShowcase title={"Top Picks For You"} category={"now_playing"} />
      <MovieShowcase title={"Top Rated"} category={"top_rated"} />
      <MovieShowcase title={"Popular"} category={"popular"} />
      <MovieShowcase title={"Upcoming"} category={"upcoming"} />
    </>
  );
};

export default Home;
