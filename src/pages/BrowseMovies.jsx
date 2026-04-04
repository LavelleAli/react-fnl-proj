import { useState } from "react";
import { Link } from "react-router-dom";
import SearchResults from "../components/SearchResults";
import MovieFilter from "../components/MovieFilter";
import MovieShowcase from "../components/MovieShowcase";

const BrowseMovies = () => {
  const [selectedGenre, setSelectedGenre] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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
        <div className="movie__info">
          {searchResults.map((movie, index) => searchMovieCard(movie, index))}
        </div>
      )}
      {!selectedGenre && !isSearchActive && (
        <>
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
