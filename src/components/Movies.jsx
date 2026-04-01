import "./Movies.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjE5ZTI0YTRlMGI1MjczMWNjODljODdmODRkYWI2MCIsIm5iZiI6MTc3Mzc4NTE1NC45ODU5OTk4LCJzdWIiOiI2OWI5ZDA0MmQwZTQ5YzIxZWIwMjBiMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6GQYklS2AVZ-F6zWIMJwH5JSry3hDt43efHXP1uqpOM",
    },
  };

  // This function put the movies on the page;
  async function getMovies() {
    const { data } = await axios.get(
      "https://api.themoviedb.org/3/movie/now_playing",
      options,
      "http://www.omdbapi.com/?apikey=e8773e4&s=Demon+Slayer",
    );
    // console.log(data.results);
    setMovies(data.results || data.Search);
  }

  useEffect(() => {
    getMovies();
  }, []);

  function movieInfo(movie) {
    return (
      <div className="movie__card" key={movie.imdbID || movies.id}>
        <div className="movie__card--container">
          <p className="movie__card--item movie__card--poster">
            <img
              src={`https://image.tmdb.org/t/p/w500` + movie.backdrop_path}
              alt=""
            />
          </p>
          <p className="movie__card--item">
            {movie.original_title}
          </p>
          <p className="movie__card--item">
            <b>Type:</b> {movie.Type}
          </p>
          <p className="movie__card--item">
            {movie.release_date}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="movies">
        {movies?.map((movie) => movieInfo(movie)).slice(0, 8)}
      </div>
    </div>
  );
};

export default Movies;
