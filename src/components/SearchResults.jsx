import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./SearchResults.css";
import tapVideoArchive from "../data/tapvideoArchive.json";
import { searchTapVideoEntries } from "../lib/tapvideo";

const SearchResults = ({ onSearchResultsChange, renderResults = true }) => {
  const [movieSearched, setMovieSearched] = useState("");
  const [foundMovies, setFoundMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjE5ZTI0YTRlMGI1MjczMWNjODljODdmODRkYWI2MCIsIm5iZiI6MTc3Mzc4NTE1NC45ODU5OTk4LCJzdWIiOiI2OWI5ZDA0MmQwZTQ5YzIxZWIwMjBiMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6GQYklS2AVZ-F6zWIMJwH5JSry3hDt43efHXP1uqpOM",
    },
  };

  // This function is meant to retrive movies from the api when the user types in the searchbar
  async function searchMovie(event) {
    const searchTerm = event.target.value;
    setMovieSearched(searchTerm);
    const nextTapVideoResults = searchTapVideoEntries(tapVideoArchive, searchTerm);

    if (!searchTerm.trim()) {
      setFoundMovies([]);
      if (onSearchResultsChange) {
        onSearchResultsChange(searchTerm, { movies: [], tapVideos: [] });
      }
      return;
    }

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchTerm)}`,
      options,
    );

    const nextResults = data.results || [];
    setFoundMovies(nextResults);
    if (onSearchResultsChange) {
      onSearchResultsChange(searchTerm, {
        movies: nextResults,
        tapVideos: nextTapVideoResults,
      });
    }
  }

  function movieInfo(movie) {
    return (
      <div className="movie__card--search" key={movie.id}>
        <div className="movie__card--container">
          <Link to={`/movie/${movie.id}`} className="movie__poster">
            <p className="movie__card--item search__results">
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                    : <></>
                }
                alt={`${movie.title}`}
              />
            </p>
            <p className="movie__card--item"><span className="colored__words--white">{movie.title}</span></p>
          </Link>
          <p className="movie__card--item"><span className="colored__words--white">{movie.release_date}</span></p>
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
              <span className="colored__words--white">Search Movies :</span>
            </label>
            <input
              className="search__movie--input"
              type="text"
              id="movieSearchTerm"
              placeholder="Type a movie title"
              autoComplete="off"
              value={movieSearched}
              onChange={searchMovie}
            />
          </div>
        </li>
      </ul>
      {renderResults && (
        <div className="movie__info">
          {foundMovies.map((movie) => movieInfo(movie))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
