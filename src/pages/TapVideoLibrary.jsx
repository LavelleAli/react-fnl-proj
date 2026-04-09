import React, { useEffect, useMemo, useRef, useState } from "react";
import tapVideoArchive from "../data/tapvideoArchive.json";
import "./TapVideoLibrary.css";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function getYouTubeId(url = "") {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/i,
    /youtube\.com\/embed\/([^?&/]+)/i,
    /youtu\.be\/([^?&/]+)/i,
    /youtube\.com\/shorts\/([^?&/]+)/i,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);

    if (match?.[1]) {
      return match[1];
    }
  }

  return "";
}

function getVimeoId(url = "") {
  return url.match(/vimeo\.com\/(?:video\/)?(\d+)/i)?.[1] || "";
}

function getTitleInitial(title = "") {
  const normalizedTitle = title.trim().replace(/^[^a-z0-9]+/i, "");
  return normalizedTitle.charAt(0).toUpperCase();
}

const TapVideoLibrary = () => {
  const [videos] = useState(tapVideoArchive);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("a-z");
  const [selectedLetter, setSelectedLetter] = useState("ALL");
  const [status] = useState(
    `Showing ${tapVideoArchive.length} TapVideo videos imported from the site's YouTube-linked archive.`
  );
  const [previewVideoId, setPreviewVideoId] = useState(null);
  const hoverDelayRef = useRef(null);
  const previewTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearTimeout(hoverDelayRef.current);
      window.clearTimeout(previewTimeoutRef.current);
    };
  }, []);

  const filteredVideos = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();
    const nextVideos = [...videos];

    const letterFilteredVideos =
      selectedLetter === "ALL"
        ? nextVideos
        : nextVideos.filter(
            (video) => getTitleInitial(video.title) === selectedLetter
          );

    const matchingVideos = normalizedQuery
      ? letterFilteredVideos.filter((video) =>
          [video.title, video.speaker, video.description, video.category]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery)
        )
      : letterFilteredVideos;

    matchingVideos.sort((videoA, videoB) => {
      const comparison = videoA.title.localeCompare(videoB.title);
      return sortOrder === "z-a" ? comparison * -1 : comparison;
    });

    return matchingVideos;
  }, [searchTerm, selectedLetter, sortOrder, videos]);

  function getPreviewUrl(videoUrl) {
    const youtubeId = getYouTubeId(videoUrl);
    const vimeoId = getVimeoId(videoUrl);

    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`;
    }

    if (vimeoId) {
      return `https://player.vimeo.com/video/${vimeoId}?autoplay=1&muted=1&controls=0`;
    }

    return "";
  }

  function startPreview(videoId) {
    window.clearTimeout(hoverDelayRef.current);
    window.clearTimeout(previewTimeoutRef.current);

    hoverDelayRef.current = window.setTimeout(() => {
      setPreviewVideoId(videoId);
      previewTimeoutRef.current = window.setTimeout(() => {
        setPreviewVideoId((currentId) => (currentId === videoId ? null : currentId));
      }, 10000);
    }, 1000);
  }

  function stopPreview(videoId) {
    window.clearTimeout(hoverDelayRef.current);
    window.clearTimeout(previewTimeoutRef.current);
    setPreviewVideoId((currentId) => (currentId === videoId ? null : currentId));
  }

  return (
    <section className="tapvideo-library">
      <div className="tapvideo-library__hero">
        <p className="tapvideo-library__eyebrow">TapVideo Archive</p>
        <h1>All TapVideo Videos</h1>
        <p>{status}</p>
      </div>

      <div className="tapvideo-library__controls">
        <label htmlFor="tapvideo-search">
          <span className="colored__words--white">Search TapVideo Videos</span>
        </label>
        <input
          id="tapvideo-search"
          className="tapvideo-library__input"
          type="text"
          placeholder="Search speaker, title, or topic"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <label htmlFor="tapvideo-sort">
          <span className="colored__words--white">Sort By Title</span>
        </label>
        <select
          id="tapvideo-sort"
          className="tapvideo-library__input tapvideo-library__select"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
        >
          <option value="a-z">Alphabetical: A to Z</option>
          <option value="z-a">Alphabetical: Z to A</option>
        </select>
      </div>

      <div className="tapvideo-library__letterFilter">
        <p className="tapvideo-library__letterLabel">
          <span className="colored__words--white">Browse By Title Letter</span>
        </p>
        <div className="tapvideo-library__letterGrid">
          <button
            type="button"
            className={
              selectedLetter === "ALL"
                ? "tapvideo-library__letterButton tapvideo-library__letterButton--active"
                : "tapvideo-library__letterButton"
            }
            onClick={() => setSelectedLetter("ALL")}
          >
            All
          </button>
          {ALPHABET.map((letter) => (
            <button
              key={letter}
              type="button"
              className={
                selectedLetter === letter
                  ? "tapvideo-library__letterButton tapvideo-library__letterButton--active"
                  : "tapvideo-library__letterButton"
              }
              onClick={() => setSelectedLetter(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      <div className="tapvideo-library__summary">
        {filteredVideos.length} result{filteredVideos.length === 1 ? "" : "s"}
      </div>

      <div className="tapvideo-library__grid">
        {filteredVideos.map((video) => (
          <article
            className="tapvideo-library__card"
            key={video.id}
            onMouseEnter={() => {
              if (video.videoUrl) {
                startPreview(video.id);
              }
            }}
            onMouseLeave={() => stopPreview(video.id)}
          >
            <div className="tapvideo-library__media">
              {previewVideoId === video.id && getPreviewUrl(video.videoUrl) ? (
                <iframe
                  className="tapvideo-library__thumbnail"
                  src={getPreviewUrl(video.videoUrl)}
                  title={`${video.title} preview`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  className="tapvideo-library__thumbnail"
                  src={video.thumbnail || "https://via.placeholder.com/640x360?text=TapVideo"}
                  alt={video.title}
                />
              )}
              {video.videoUrl ? (
                <div className="tapvideo-library__previewHint">
                  Hover for 10s preview
                </div>
              ) : null}
            </div>
            <div className="tapvideo-library__content">
              <p className="tapvideo-library__speaker">{video.speaker}</p>
              <h2>{video.title}</h2>
              <p className="tapvideo-library__description">{video.description}</p>
              <div className="tapvideo-library__actions">
                {video.videoUrl ? (
                  <a href={video.videoUrl} target="_blank" rel="noreferrer">
                    Watch Video
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TapVideoLibrary;
