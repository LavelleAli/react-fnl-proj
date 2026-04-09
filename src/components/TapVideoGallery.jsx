import React, { useEffect, useMemo, useRef, useState } from "react";
import "./TapVideoGallery.css";

const DEFAULT_FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80";

function getYouTubeId(url) {
  if (!url) {
    return "";
  }

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

function getVimeoId(url) {
  if (!url) {
    return "";
  }

  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  return match?.[1] ?? "";
}

function normalizeVideo(video) {
  const sourceUrl = video.videoUrl || video.embedUrl || video.sourceUrl || "";
  const youtubeId = getYouTubeId(sourceUrl);
  const vimeoId = getVimeoId(sourceUrl);

  let embedUrl = "";
  let provider = "external";

  if (youtubeId) {
    provider = "youtube";
    embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
  } else if (vimeoId) {
    provider = "vimeo";
    embedUrl = `https://player.vimeo.com/video/${vimeoId}`;
  }

  const previewUrl =
    provider === "youtube"
      ? `${embedUrl}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0`
      : provider === "vimeo"
        ? `${embedUrl}?autoplay=1&muted=1&controls=0`
        : "";

  const thumbnail =
    video.thumbnail ||
    (youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : "") ||
    DEFAULT_FALLBACK_THUMBNAIL;

  return {
    id: video.id || sourceUrl || video.tapVideoPageUrl || video.title,
    title: video.title || "Untitled TapVideo entry",
    speaker: video.speaker || "TapVideo Archive",
    description: video.description || "TapVideo archive listing",
    category: video.category || "Archive",
    sourceUrl,
    provider,
    embedUrl,
    previewUrl,
    thumbnail,
    tapVideoPageUrl: video.tapVideoPageUrl || "",
  };
}

const TapVideoGallery = ({
  title = "TapVideo Gallery",
  subtitle = "Browse archive entries and play supported YouTube or Vimeo videos.",
  videos = [],
}) => {
  const normalizedVideos = useMemo(
    () => videos.map((video) => normalizeVideo(video)),
    [videos]
  );

  const [selectedVideoId, setSelectedVideoId] = useState(
    normalizedVideos[0]?.id ?? null
  );
  const [previewVideoId, setPreviewVideoId] = useState(null);
  const hoverDelayRef = useRef(null);
  const previewTimeoutRef = useRef(null);

  const selectedVideo =
    normalizedVideos.find((video) => video.id === selectedVideoId) ||
    normalizedVideos[0] ||
    null;

  useEffect(() => {
    return () => {
      window.clearTimeout(hoverDelayRef.current);
      window.clearTimeout(previewTimeoutRef.current);
    };
  }, []);

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

  if (!normalizedVideos.length) {
    return (
      <section className="tapvideo">
        <div className="tapvideo__hero">
          <p className="tapvideo__eyebrow">TapVideo Archive</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="tapvideo__empty">
          Add TapVideo entries with `title`, `speaker`, and a supported
          `videoUrl` to populate this gallery.
        </div>
      </section>
    );
  }

  return (
    <section className="tapvideo">
      <div className="tapvideo__hero">
        <p className="tapvideo__eyebrow">TapVideo Archive</p>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="tapvideo__layout">
        <article className="tapvideo__playerCard">
          <div className="tapvideo__media">
            {selectedVideo?.embedUrl ? (
              <iframe
                src={selectedVideo.embedUrl}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="tapvideo__placeholder">
                <img src={selectedVideo?.thumbnail} alt={selectedVideo?.title} />
                <div className="tapvideo__placeholderOverlay">
                  <p>No direct embed detected for this TapVideo entry.</p>
                  {selectedVideo?.sourceUrl ? (
                    <a href={selectedVideo.sourceUrl} target="_blank" rel="noreferrer">
                      Watch Video
                    </a>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          <div className="tapvideo__details">
            <div className="tapvideo__meta">
              <span>{selectedVideo?.category}</span>
              <span className="tapvideo__provider">
                {selectedVideo?.provider === "external"
                  ? "TapVideo listing"
                  : selectedVideo?.provider}
              </span>
            </div>

            <h2>{selectedVideo?.title}</h2>
            <p className="tapvideo__speaker">{selectedVideo?.speaker}</p>
            <p className="tapvideo__description">{selectedVideo?.description}</p>

            <div className="tapvideo__actions">
              {selectedVideo?.sourceUrl ? (
                <a
                  className="tapvideo__action tapvideo__action--primary"
                  href={selectedVideo.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Watch Video
                </a>
              ) : null}
            </div>
          </div>
        </article>

        <aside className="tapvideo__list" aria-label="TapVideo entries">
          {normalizedVideos.map((video) => {
            const isActive = video.id === selectedVideo?.id;

            return (
              <button
                className={`tapvideo__listItem${isActive ? " tapvideo__listItem--active" : ""}`}
                key={video.id}
                onClick={() => setSelectedVideoId(video.id)}
                onMouseEnter={() => {
                  if (video.previewUrl) {
                    startPreview(video.id);
                  }
                }}
                onMouseLeave={() => stopPreview(video.id)}
                type="button"
              >
                <div className="tapvideo__listMedia">
                  {previewVideoId === video.id && video.previewUrl ? (
                    <iframe
                      src={video.previewUrl}
                      title={`${video.title} preview`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <img src={video.thumbnail} alt={video.title} />
                  )}
                </div>
                <div className="tapvideo__listContent">
                  <p className="tapvideo__listSpeaker">{video.speaker}</p>
                  <h3>{video.title}</h3>
                  <p className="tapvideo__listProvider">
                    {video.provider === "external"
                      ? "TapVideo link listing"
                      : `${video.provider} embed ready`}
                  </p>
                </div>
              </button>
            );
          })}
        </aside>
      </div>
    </section>
  );
};

export default TapVideoGallery;
