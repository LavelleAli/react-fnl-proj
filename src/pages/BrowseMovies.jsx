import React from "react";
import Movies from "../components/Movies";
import SearchResults from "../components/SearchResults";

const BrowseMovies = () => {
  return (
    <div>
      <h1 className="movie__header">
        <span className="colored__words--white">Starlife Movie Library</span>
      </h1>
      <SearchResults/>
      <Movies />
    </div>
  );
};

export default BrowseMovies;
