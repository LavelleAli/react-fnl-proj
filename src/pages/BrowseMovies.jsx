import { useState } from "react";
import { Link } from "react-router-dom";
import SearchResults from "../components/SearchResults";
import MovieFilter from "../components/MovieFilter";
import MovieShowcase from "../components/MovieShowcase";

const BrowseMovies = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState({ movies: [], tapVideos: [] });
  const [activeInput, setActiveInput] = useState("");

  function handleSearchResultsChange(nextSearchTerm, nextResults) {
    setSearchTerm(nextSearchTerm);
    setSearchResults(nextResults);
    setActiveInput(nextSearchTerm.trim() ? "search" : "");
  }

  function handleGenreChange(genreId) {
    setSelectedGenre(genreId);
    setActiveInput(genreId ? "genre" : "");
  }

  function searchMovieCard(movie, index) {
    return (
      <div
        className="movie__card--search movie__search--result-card"
        key={`${searchTerm}-${movie.id}`}
        style={{ animationDelay: `${index * 120}ms` }}
      >
        <div className="movie__card--container">
          <Link to={`/movie/${movie.id}`} className="movie__poster">
            <p className="movie__card--item search__results">
              <img
                src={
                  movie.backdrop_path
                    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                    : "https://via.placeholder.com/500x281?text=No+Image"
                }
                alt={movie.title}
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

  function tapVideoCard(video, index) {
    return (
      <div
        className="movie__card--search movie__search--result-card"
        key={`${searchTerm}-${video.id}`}
        style={{ animationDelay: `${index * 120}ms` }}
      >
        <div className="movie__card--container">
          <a
            href={video.videoUrl || video.tapVideoPageUrl}
            className="movie__poster"
            target="_blank"
            rel="noreferrer"
          >
            <p className="movie__card--item search__results">
              <img
                src={
                  video.thumbnail ||
                  "https://via.placeholder.com/500x281?text=TapVideo"
                }
                alt={video.title}
              />
            </p>
            <p className="movie__card--item">
              <span className="colored__words--white">{video.title}</span>
            </p>
          </a>
          <p className="movie__card--item">
            <span className="colored__words--white">{video.speaker}</span>
          </p>
        </div>
      </div>
    );
  }

  const isSearchActive = searchTerm.trim() !== "";

  return (
    <div>
      <h1 className="movie__header">
        <span className="colored__words--white">Starlife Movie Library</span>
      </h1>
      <SearchResults
        onSearchResultsChange={handleSearchResultsChange}
        renderResults={false}
      />
      <MovieFilter
        onGenreChange={handleGenreChange}
        showResults={activeInput === "genre"}
      />
      {activeInput === "search" && isSearchActive && (
        <>
          <div className="movie__info">
            {searchResults.movies.map((movie, index) => searchMovieCard(movie, index))}
          </div>
          {searchResults.tapVideos.length > 0 && (
            <>
              <h2 className="movie__header" style={{ fontSize: "2rem", marginTop: "16px" }}>
                <span className="colored__words--white">TapVideo Results</span>
              </h2>
              <div className="movie__info">
                {searchResults.tapVideos.map((video, index) => tapVideoCard(video, index))}
              </div>
            </>
          )}
          {searchResults.movies.length === 0 && searchResults.tapVideos.length === 0 && (
            <div className="auth__prompt">
              <h2 className="auth__prompt--title">
                <span className="colored__words--white">
                  No movie or TapVideo matches found for "{searchTerm}".
                </span>
              </h2>
              <Link className="home__btn auth__prompt--button" to="/tapvideo-library">
                <span className="colored__words--white">Browse All TapVideo Videos</span>
              </Link>
            </div>
          )}
        </>
      )}
      {!selectedGenre && !isSearchActive && (
        <>
          <div className="auth__prompt" style={{ marginTop: "0" }}>
            <h2 className="auth__prompt--title">
              <span className="colored__words--white">Looking for archive lectures too?</span>
            </h2>
            <Link className="home__btn auth__prompt--button" to="/tapvideo-library">
              <span className="colored__words--white">Open TapVideo Library</span>
            </Link>
          </div>
          <MovieShowcase title={"Action"} genreId={28} />
          <MovieShowcase title={"Comedy"} genreId={35} />
          <MovieShowcase title={"Horror"} genreId={27} />
          <MovieShowcase title={"Romance"} genreId={10749} />
          <MovieShowcase title={"Science Fiction"} genreId={878} />
        </>
      )}
    </div>
  );
};

export default BrowseMovies;
