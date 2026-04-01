import React, { useState, useEffect } from "react";
import "./Player.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    publish_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjE5ZTI0YTRlMGI1MjczMWNjODljODdmODRkYWI2MCIsIm5iZiI6MTc3Mzc4NTE1NC45ODU5OTk4LCJzdWIiOiI2OWI5ZDA0MmQwZTQ5YzIxZWIwMjBiMTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6GQYklS2AVZ-F6zWIMJwH5JSry3hDt43efHXP1uqpOM",
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos`, options)
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      
        <FontAwesomeIcon
          className="player__backBtn"
          icon="fa-solid fa-circle-arrow-left"
          style={{ color: "rgb(255, 239, 181)", fontSize: "2.5rem" }}
          onClick={() => {
            navigate("/");
          }}
        />
      
      <iframe
        width="90%"
        height="90%"
        src={`https://www.youtube.com/embed/${apiData.key}`}
        title="trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <div className="player__info">
        <p>
          <span className="colored__words--white">
            {apiData?.published_at?.slice(0, 10)}
          </span>
        </p>
        <p>
          <span className="colored__words--white">{apiData.name}</span>
        </p>
        <p>
          {" "}
          <span className="colored__words--white">{apiData.type}</span>
        </p>
      </div>
    </div>
  );
};

export default Player;
