import React, { useEffect, useState } from "react";
import TapVideoGallery from "../components/TapVideoGallery";
import { fetchTapVideoFeed } from "../lib/tapvideo";
import tapVideoArchive from "../data/tapvideoArchive.json";

const TapVideo = () => {
  const [videos, setVideos] = useState(tapVideoArchive);
  const [feedStatus, setFeedStatus] = useState(
    `Showing ${tapVideoArchive.length} imported TapVideo YouTube-linked archive videos.`
  );

  useEffect(() => {
    let isMounted = true;

    fetchTapVideoFeed()
      .then((entries) => {
        if (!isMounted || !entries.length) {
          return;
        }

        const liveEntries = entries.filter((entry) => entry.videoUrl);

        if (liveEntries.length > tapVideoArchive.length) {
          setVideos(liveEntries);
          setFeedStatus(`Showing ${liveEntries.length} TapVideo videos from the live feed.`);
          return;
        }

        setFeedStatus(
          `Showing ${tapVideoArchive.length} imported TapVideo archive videos with live feed fallback available.`
        );
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }

        setFeedStatus(
          `Showing ${tapVideoArchive.length} imported TapVideo YouTube-linked archive videos.`
        );
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div
        style={{
          width: "100%",
          maxWidth: "1240px",
          margin: "24px auto 0",
          padding: "0 24px",
          color: "rgba(255, 247, 209, 0.78)",
          fontSize: "0.95rem",
        }}
      >
        {feedStatus}
      </div>
      <TapVideoGallery
        title="TapVideo Gallery"
        subtitle="This page now ships with a larger in-project TapVideo archive built from TapVideo's YouTube-linked listings, with the live feed used only as a fallback."
        videos={videos}
      />
    </>
  );
};

export default TapVideo;
