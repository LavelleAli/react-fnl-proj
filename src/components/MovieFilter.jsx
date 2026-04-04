import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MovieFilter.css";

const MovieFilter = ({ onGenreChange, showResults = true }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjE5ZTI0YTRlMGI1MjczMWNjODljODdmODRkYWI2MCIsIm5iZiI6MTc3Mzc4NTE1NC45ODU5OTk4LCJzdWIiOiI2OWI5ZDA0MmQwZTQ5YzIxZWIwMjBiMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6GQYklS2AVZ-F6zWIMJwH5JSry3hDt43efHXP1uqpOM",
    },
  };

  // This function gets api genre data and displays on the page
  useEffect(() => {
    async function getGenres() {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        options,
      );

      setGenres(data.genres || []);
    }

    getGenres();
  }, []);


  // This function gets the data from the api according to the gener the user selects from the menu
  async function browseMoviesByGenre(genreId) {
    setSelectedGenre(genreId);
    if (onGenreChange) {
      onGenreChange(genreId);
    }

    if (!genreId) {
      setFilteredMovies([]);
      return;
    }

    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}`,
      options,
    );

    setFilteredMovies(data.results || []);
  }


  //  This function is the "framwork" for how the movie should be displayed on the page
  function movieCard(movie, index) {
    return (
      <div
        className="movie__card movie__filter--result-card"
        key={movie.id}
        style={{ animationDelay: `${index * 120}ms` }}
      >
        <div className="movie__card--container">
          <Link to={`/movie/${movie.id}`} className="movie__poster">
            <p className="movie__card--item movie__card--poster">
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                    : "https://via.placeholder.com/500x281?text=No+Image"
                }
                alt={`${movie.title} poster`}
              />
            </p>
            <p className="movie__card--item">
              <span className="colored__words--white">{movie.title}</span>
            </p>
          </Link>
          <p className="movie__card--item">
            <span className="colored__words--white">{movie.release_date}</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="movie__filter">
      <div className="movie__filter--controls">
        <label className="movie__filter--label">
          <span className="colored__words--white">Browse Movies By Genre</span>
        </label>
        <div className="movie__filter--genres">
          <button
            type="button"
            className={
              selectedGenre === ""
                ? "movie__filter--chip movie__filter--chip-active"
                : "movie__filter--chip"
            }
            onClick={() => browseMoviesByGenre("")}
          >
            All Genres
          </button>
          {genres.map((genre) => (
            <button
              type="button"
              key={genre.id}
              className={
                String(selectedGenre) === String(genre.id)
                  ? "movie__filter--chip movie__filter--chip-active"
                  : "movie__filter--chip"
              }
              onClick={() => browseMoviesByGenre(String(genre.id))}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {showResults && (
        <div className="movies movie__filter--results">
          {filteredMovies.slice(0, 9).map((movie, index) => movieCard(movie, index))}
        </div>
      )}
    </section>
  );
};

export default MovieFilter;
