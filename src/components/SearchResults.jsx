import React, { useState } from "react";
import axios from "axios";
import "./SearchResults.css";


const SearchResults = () => {
  const [movieSearched, setMovieSearched] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);

  async function searchMovie(event) {
    const searchValue = event.target.value;
    setMovieSearched(searchValue);

    const { data } = await axios.get(
      `http://www.omdbapi.com/?apikey=e8773e4&s=${searchValue || ""}`,
    );

    setFoundMovies(data.Search || []);
  }

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
    );
  }

  return (
    <div>
      
      <ul>
        <li className="nav__item search__bar">
          <div className="search__wrapper">
            <label className="nav__link nav__label" htmlFor="movieSearchTerm">
              <span className="colored__words--white">
                
                Search Movies :
              </span>
            </label>
            {/* <select id="filterType" className="nav__label nav__link">
              <option value="title">Title</option>
              <option value="year">Year</option>
              <option value="imdbID">imdbID</option>
            </select> */}
            <input
              className="search__movie--input"
              type="text"
              id="movieSearchTerm"
              placeholder="Type a title, year, or imdbID"
              autoComplete="off"
              value={movieSearched}
              onChange={searchMovie}
            />
          </div>
        </li>
      </ul>
      <div className="movie__info">
        {foundMovies.map((movie) => movieInfo(movie))}
      </div>
    </div>
  );
};

export default SearchResults;
