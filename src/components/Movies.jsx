import './Movies.css'
import axios from "axios";
import React, { useEffect, useState } from "react";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  // This function put the movies on the page;
  async function getMovies() {
    const { data } = await axios.get(
      "http://www.omdbapi.com/?apikey=e8773e4&s=Demon+Slayer",
    )
    setMovies(data.Search || [])
  }

  useEffect(() => {
    getMovies();
  }, []);

  function movieInfo(movie) {
    return (
      <div className="movie__card" key={movie.imdbID}>
        <div className="movie__card--container">
          <p className="movie__card--item movie__card--poster">
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
          </p>
          <p className="movie__card--item">
            <b>Title:</b> {movie.Title}
          </p>
          <p className="movie__card--item">
            <b>Type:</b> {movie.Type}
          </p>
          <p className="movie__card--item">
            <b>Year:</b> {movie.Year}
          </p>
          <p className="movie__card--item">
            {/* <b>imdbID:</b> {movie.imdbID} */}
          </p>
        </div>
      </div>
    )
  }


  return (
    <div>
      <div className="movies">
        {movies.map((movie) => movieInfo(movie))}
      </div>
    </div>
  );
};

export default Movies;
