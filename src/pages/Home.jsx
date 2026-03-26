import React, { useState, useEffect } from "react";
import Landing from "../components/Landing";
import "./Home.css";

const Home = () => {
  const [movieRes, setMovieRes] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjE5ZTI0YTRlMGI1MjczMWNjODljODdmODRkYWI2MCIsIm5iZiI6MTc3Mzc4NTE1NC45ODU5OTk4LCJzdWIiOiI2OWI5ZDA0MmQwZTQ5YzIxZWIwMjBiMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6GQYklS2AVZ-F6zWIMJwH5JSry3hDt43efHXP1uqpOM",
    },
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/top_rated", options)
      .then((res) => res.json())
      .then((res) => setMovieRes(res.results))
      .catch((err) => console.error(err));
  }, []);

  console.log(movieRes);

  function featuredMovies(movies) {
    return (
      <div className="container">
        <div className="row">
          <div className="movie__display">
            <p className="movie__poster">
              <img
                src={`https://image.tmdb.org/t/p/w500` + movies.backdrop_path}
                alt=""
              />
            </p>

            <p className="movie__title">
              <span className="colored__words--white">
                {movies.original_title}
              </span>
            </p>

            <p className="movie__overview">
              <span className="colored__words--white">{movies.overview}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Landing />
      <h1 className="page__header">
        <span className="colored__words--white">Featured Movies</span>
      </h1>
      <div className="movie__list--wrapper">
        <div className="movie__list">
          {movieRes.map((movies) => featuredMovies(movies))}
        </div>
      </div>
    </>
  );
};

export default Home;
