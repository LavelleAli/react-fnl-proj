import React, { useState, useEffect } from "react";
import "./MovieShowcase.css";
import { Link } from "react-router-dom";

const MovieShowcase = ({ modalState, title, category, id }) => {
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
    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setMovieRes(res.results))
      .catch((err) => console.error(err));
  }, []);

  function featuredMovies(movies) {
    return (
      <div className="container" key={movies.id}>
        <div className="row">
          <div className="movie__display">
            
              <Link to={`/player/${movies.id}`} className="movie__poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500` + movies.backdrop_path}
                  alt=""
                />
              </Link>

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
    <div className={modalState ? "home home--faded" : "home"}>
      <div className="movie__list--wrapper">
        <h2 className="feature__list">{title ? title : "Popular Movies"}</h2>
        <div className="movie__list">
          {movieRes.map((movies) => featuredMovies(movies)).slice(0, 4)}
        </div>
      </div>
    </div>
  );
};

export default MovieShowcase;
