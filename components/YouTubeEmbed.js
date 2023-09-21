import { useState } from "react";

function YouTubeEmbed({ embedLink, thumbnail }) {
  const [showVideo, setShowVideo] = useState(!thumbnail);

  return (
    <div
      className="container"
      style={{
        // padding: "56.25% 0 0 0",
        aspectRatio: "16/9",
        position: "relative",
        borderRadius: "10px",
      }}
    >
      {!showVideo && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            cursor: "pointer",
            background: `url(${thumbnail}) no-repeat center center / cover`,
            borderRadius: 10,
          }}
          onClick={() => setShowVideo(true)}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg"
            alt="Play button"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(0.25)",
            }}
          />
        </div>
      )}
      {showVideo && (
        <iframe
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: 10,
          }}
          src={`${embedLink}${thumbnail ? "?autoplay=1" : ""}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default YouTubeEmbed;
