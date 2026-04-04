import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjE5ZTI0YTRlMGI1MjczMWNjODljODdmODRkYWI2MCIsIm5iZiI6MTc3Mzc4NTE1NC45ODU5OTk4LCJzdWIiOiI2OWI5ZDA0MmQwZTQ5YzIxZWIwMjBiMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6GQYklS2AVZ-F6zWIMJwH5JSry3hDt43efHXP1uqpOM",
    },
  };

  useEffect(() => {
    async function getMovieDetails() {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        options,
      );

      setMovie(data);
    }

    getMovieDetails();
  }, [id]);

  if (!movie) {
    return <div className="movie__details movie__details--loading">Loading...</div>;
  }

  return (
    <section
      className="movie__details"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.92)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path})`,
      }}
    >
      <button
        type="button"
        className="movie__details--back"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon="fa-solid fa-circle-arrow-left" />
      </button>

      <div className="movie__details--content">
        <div className="movie__details--poster">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/400x600?text=No+Poster"
            }
            alt={`${movie.title} poster`}
          />
        </div>

        <div className="movie__details--info">
          <h1 className="movie__details--title">
            <span className="colored__words--white">{movie.title}</span>
          </h1>
          <p className="movie__details--meta">
            <span className="colored__words--white">
              {movie.release_date} • {movie.runtime} mins
            </span>
          </p>
          <p className="movie__details--genres">
            <span className="colored__words--white">
              {movie.genres?.map((genre) => genre.name).join(", ")}
            </span>
          </p>
          <p className="movie__details--overview">
            <span className="colored__words--white">{movie.overview}</span>
          </p>
          <Link to={`/player/${movie.id}`} className="movie__details--play">
            Play Movie
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MovieDetails;
