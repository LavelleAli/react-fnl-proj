import React, { useState, useEffect } from "react";
import "./MovieShowcase.css";
import { Link } from "react-router-dom";

const MovieShowcase = ({ modalState, title, category, genreId }) => {
  const [movieRes, setMovieRes] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjE5ZTI0YTRlMGI1MjczMWNjODljODdmODRkYWI2MCIsIm5iZiI6MTc3Mzc4NTE1NC45ODU5OTk4LCJzdWIiOiI2OWI5ZDA0MmQwZTQ5YzIxZWIwMjBiMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6GQYklS2AVZ-F6zWIMJwH5JSry3hDt43efHXP1uqpOM",
    },
  };


  // This mounts the movies on the page automatically;
  useEffect(() => {
    const endpoint = genreId
      ? `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`
      : `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}`;

    fetch(
      endpoint,
      options,
    )
      .then((res) => res.json())
      .then((res) => setMovieRes(res.results))
      .catch((err) => console.error(err));
  }, [category, genreId]);

  useEffect(() => {
    const movieCards = document.querySelectorAll(".movie__display");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("movie__display--visible");
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    movieCards.forEach((card) => observer.observe(card));

    return () => {
      movieCards.forEach((card) => observer.unobserve(card));
    };
  }, [movieRes]);

  function featuredMovies(movies, index) {
    return (
      <div className="container" key={movies.id}>
        <div className="row">
          <div
            className="movie__display"
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            
              <Link to={`/movie/${movies.id}`} className="movie__poster">
                <img
                  src={`https://image.tmdb.org/t/p/w500` + movies.backdrop_path}
                  alt=""
                />
              </Link>

            <p className="movie__title">
              <span className="colored__words--white">
                {movies.title}
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
          {movieRes.slice(0, 6).map((movies, index) => featuredMovies(movies, index))}
        </div>
      </div>
    </div>
  );
};

export default MovieShowcase;
